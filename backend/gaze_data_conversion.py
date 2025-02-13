import pandas as pd
import numpy as np
import json
from datetime import datetime
from sklearn.cluster import DBSCAN
from sklearn.preprocessing import StandardScaler

# Function to normalize a value given a min and max.
def normalize(value, min_value, max_value):
    return (value - min_value) / (max_value - min_value)

# Function to check if a point (normalized) falls within an AOI.
def is_point_in_aoi(x, y, aoi):
    # aoi['x'], aoi['y'], aoi['width'], and aoi['height'] are assumed to be in normalized coordinates.
    x_min = aoi['x']
    x_max = aoi['x'] + aoi['width']
    y_min = aoi['y']
    y_max = aoi['y'] + aoi['height']
    return x_min <= x <= x_max and y_min <= y <= y_max

# Function to calculate saccade magnitude.
def calculate_saccade_magnitude(x1, y1, x2, y2):
    return np.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)

# Function to calculate saccade direction.
def calculate_saccade_direction(x1, y1, x2, y2):
    return np.degrees(np.arctan2(y2 - y1, x2 - x1))

# Function to calculate fixation validity.
def calculate_fixation_validity(data):
    # A fixation is valid if its duration (FPOGD) is at least 100 milliseconds.
    data['FIXATION_VALIDITY'] = data.apply(lambda row: 1 if row['FPOGD'] >= 100 else 0, axis=1)
    return data

# (Optional) Function to calculate AOI metrics.
def calculate_aoi_metrics(data, aoi_config):
    results = []
    total_fixations = data[data['FIXATION_VALIDITY'] == 1].shape[0]
    total_duration = data[data['FIXATION_VALIDITY'] == 1]['FPOGD'].sum()

    for index, aoi in enumerate(aoi_config):
        aoi_name = f"AOI_{index + 1}"
        fixations_in_aoi = data[(data[aoi_name] == 1) & (data['FIXATION_VALIDITY'] == 1)]
        fixation_proportion = len(fixations_in_aoi) / total_fixations if total_fixations > 0 else 0
        duration_proportion = fixations_in_aoi['FPOGD'].sum() / total_duration if total_duration > 0 else 0
        results.append({
            'AOI': aoi_name,
            'Proportion_of_Fixations': fixation_proportion,
            'Proportion_of_Duration': duration_proportion
        })

    return results

# (Optional) Function to calculate AOI transitions.
def calculate_aoi_transitions(data):
    transitions = []
    for i in range(len(data) - 1):
        current_aoi = data.iloc[i]['AOI']
        next_aoi = data.iloc[i + 1]['AOI']
        if current_aoi != next_aoi:
            transitions.append((current_aoi, next_aoi))
    return transitions

# Function to add saccade features.
def add_saccade_features(data):
    data['SACCADE_MAG'] = data.apply(
        lambda row: calculate_saccade_magnitude(
            data['FPOGX'].shift(1).loc[row.name],
            data['FPOGY'].shift(1).loc[row.name],
            row['FPOGX'],
            row['FPOGY']
        ) if row.name > 0 else 0,
        axis=1
    )
    data['SACCADE_DIR'] = data.apply(
        lambda row: calculate_saccade_direction(
            data['FPOGX'].shift(1).loc[row.name],
            data['FPOGY'].shift(1).loc[row.name],
            row['FPOGX'],
            row['FPOGY']
        ) if row.name > 0 else 0,
        axis=1
    )
    return data

# Function to add placeholder fields (except TIMETICK, which is preserved).
def add_placeholder_fields(data):
    placeholders = {
        'MEDIA_ID': '',
        'MEDIA_NAME': '',
        'CNT': np.arange(0, len(data)),  # 0-based counter
        # Do not override TIMETICK since it comes from the raw file.
        'FPOGV': 1,
        'BPOGX': 0.0,
        'BPOGY': 0.0,
        'BPOGV': 0,
        'CX': 0,
        'CY': 0,
        'CS': '',
        'KB': 0,
        'KBS': 0,
        'USER': '',
        'LPCX': 0.0,
        'LPCY': 0.0,
        'LPD': 0,
        'LPS': 0,
        'LPV': 0,
        'RPCX': 0.0,
        'RPCY': 0.0,
        'RPD': 0,
        'RPS': 0,
        'RPV': 0,
        'BKID': 0,
        'BKDUR': 0,
        'BKPMIN': 0,
        'LPMM': 4,
        'LPMMV': 1,
        'RPMM': 4,
        'RPMMV': 1,
        'DIAL': 0,
        'DIALV': 0,
        'GSR': 0,
        'GSRV': 0,
        'HR': 0,
        'HRV': 0,
        'HRP': 0,
        'IBI': 0,
        'TTL0': 0,
        'TTL1': 0,
        'TTL2': 0,
        'TTL3': 0,
        'TTL4': 0,
        'TTL5': 0,
        'TTL6': 0,
        'TTLV': 0,
        'PIXS': 0,
        'PIXV': 0,
        'VID_FRAME': 0
    }
    for column, default in placeholders.items():
        if column not in data.columns:
            data[column] = default
    return data

# Process gaze data with AOI detection and DBSCAN-based fixation analysis.
def process_gaze_data(gaze_file, aoi_config_file='aoi_config.json', output_file='processed_gaze_data.csv', fixation_file='fixations.csv'):
    # --- STEP 1: Read header to extract base time ---
    raw_columns = pd.read_csv(gaze_file, nrows=0).columns
    # Look for a column name starting with "TIME("
    time_header_candidates = [col for col in raw_columns if col.startswith("TIME(")]
    if not time_header_candidates:
        raise ValueError("Could not find a TIME column in the expected format.")
    raw_time_header = time_header_candidates[0]
    # Extract the base time string (the part within parentheses)
    base_time_str = raw_time_header[raw_time_header.find("(")+1 : raw_time_header.find(")")]

    # --- STEP 2: Load the raw gaze data ---
    data = pd.read_csv(gaze_file)
    # Rename the raw time column (which contains relative seconds) to an internal name.
    data = data.rename(columns={raw_time_header: "TIME_REL"})

    # Create a temporary numeric column for clustering.
    data['TIME_NUM'] = data['TIME_REL'].astype(float)

    # --- STEP 3: Sort data by relative time using a stable sort (mergesort) ---
    data = data.sort_values(by='TIME_NUM', kind='mergesort')

    # --- STEP 4: Normalize X and Y coordinates ---
    raw_x_min = data['x'].min()
    raw_x_max = data['x'].max()
    raw_y_min = data['y'].min()
    raw_y_max = data['y'].max()
    data['FPOGX'] = normalize(data['x'], raw_x_min, raw_x_max)
    data['FPOGY'] = normalize(data['y'], raw_y_min, raw_y_max)

    # --- STEP 5: Fixation detection using DBSCAN ---
    X = data[['FPOGX', 'FPOGY', 'TIME_NUM']].values
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)
    eps = 0.3    # After scaling, tune as necessary.
    min_samples = 5
    db = DBSCAN(eps=eps, min_samples=min_samples).fit(X_scaled)
    data['db_label'] = db.labels_
    data['FPOGD'] = data.groupby('db_label')['TIME_NUM'].transform(lambda x: (x.max() - x.min()) * 1000)
    data = calculate_fixation_validity(data)
    data['FPOGV'] = np.where(data['db_label'] == -1, 0, data['FIXATION_VALIDITY'])

    # --- STEP 5b: INITIAL FIXATION ID ASSIGNMENT ---
    valid_labels = [label for label in np.unique(data['db_label']) if label != -1]
    fixation_id_mapping = {label: idx for idx, label in enumerate(valid_labels, start=1)}
    data['FPOGID'] = data['db_label'].apply(lambda x: fixation_id_mapping.get(x, np.nan))
    # Fill missing fixation IDs (from noise points) using forward/backward fill and cast to int.
    data['FPOGID'] = data['FPOGID'].ffill().bfill().fillna(0).astype(int)

    print("Unique DBSCAN labels:", np.unique(data['db_label']))

    # --- STEP 5c: Renumber FPOGIDs sequentially based on fixation start time ---
    valid_mask = data['FIXATION_VALIDITY'] == 1
    fixation_start_times = data.loc[valid_mask].groupby('FPOGID')['TIME_NUM'].min()
    # Sort the fixation clusters by their start time using a stable sort.
    sorted_fixation_ids = fixation_start_times.sort_values().index
    new_fixation_ids = {old: new for new, old in enumerate(sorted_fixation_ids, start=1)}
    # Map the old fixation IDs to the new sequential IDs (and cast explicitly to int).
    data.loc[valid_mask, 'FPOGID'] = data.loc[valid_mask, 'FPOGID'].map(new_fixation_ids).astype(int)
    # For any remaining missing values (if any), fill forward/backward.
    data['FPOGID'] = data['FPOGID'].ffill().bfill().fillna(0).astype(int)

    # --- STEP 6: AOI assignment with custom names ---
    with open(aoi_config_file, 'r') as f:
        aoi_config = json.load(f)
    for aoi in aoi_config:
        aoi['x'] = normalize(aoi['x'], raw_x_min, raw_x_max)
        aoi['y'] = normalize(aoi['y'], raw_y_min, raw_y_max)
        aoi['width'] = aoi['width'] / (raw_x_max - raw_x_min)
        aoi['height'] = aoi['height'] / (raw_y_max - raw_y_min)
        if aoi['width'] < 0:
            aoi['x'] += aoi['width']
            aoi['width'] = abs(aoi['width'])

    def assign_aoi(row):
        if len(aoi_config) == 2:
            if is_point_in_aoi(row['FPOGX'], row['FPOGY'], aoi_config[0]):
                return "AOI_Q"
            elif is_point_in_aoi(row['FPOGX'], row['FPOGY'], aoi_config[1]):
                return "AOI_V"
            else:
                return "None"
        else:
            for index, aoi in enumerate(aoi_config):
                if is_point_in_aoi(row['FPOGX'], row['FPOGY'], aoi):
                    return f"AOI_{index + 1}"
            return "None"

    data['AOI'] = data.apply(assign_aoi, axis=1)

    # --- STEP 7: Fixation metrics ---
    fixation_metrics = data[data['FIXATION_VALIDITY'] == 1].groupby('FPOGID').agg({
        'FPOGX': 'mean',
        'FPOGY': 'mean',
        'TIME_NUM': ['min', 'max'],
        'FPOGD': 'sum'
    })
    fixation_metrics.columns = ['x_mean', 'y_mean', 'start_time', 'end_time', 'duration']
    fixation_start_times = fixation_metrics[['start_time']].to_dict()['start_time']
    data['FPOGS'] = data['FPOGID'].map(fixation_start_times)
    data['FPOGS'] = data['FPOGS'].fillna(0)

    # --- STEP 8: Add placeholder fields ---
    data = add_placeholder_fields(data)

    # --- STEP 9: Add saccade features ---
    data = add_saccade_features(data)

    # --- STEP 10: Prepare final output ---
    new_time_header = f"TIME({base_time_str})"
    data = data.rename(columns={"TIME_REL": new_time_header})
    data = data.drop(columns=["TIME_NUM", "db_label"])

    columns_order = [
        'MEDIA_ID', 'MEDIA_NAME', 'CNT', new_time_header, 'TIMETICK(f=10000000)',
        'FPOGX', 'FPOGY', 'FPOGS', 'FPOGD', 'FPOGID', 'FPOGV',
        'BPOGX', 'BPOGY', 'BPOGV', 'CX', 'CY', 'CS',
        'KB', 'KBS', 'USER', 'LPCX', 'LPCY', 'LPD', 'LPS', 'LPV',
        'RPCX', 'RPCY', 'RPD', 'RPS', 'RPV', 'BKID', 'BKDUR', 'BKPMIN',
        'LPMM', 'LPMMV', 'RPMM', 'RPMMV', 'DIAL', 'DIALV',
        'GSR', 'GSRV', 'HR', 'HRV', 'HRP', 'IBI',
        'TTL0', 'TTL1', 'TTL2', 'TTL3', 'TTL4', 'TTL5', 'TTL6', 'TTLV',
        'PIXS', 'PIXV', 'AOI', 'SACCADE_MAG', 'SACCADE_DIR', 'VID_FRAME'
    ]
    data = data[columns_order]
    data.to_csv(output_file, index=False)
    print(f"Processed gaze data with AOIs saved to {output_file}")

if __name__ == "__main__":
    gaze_file = 'raw_gaze_data.csv'
    aoi_config_file = 'aoi_config.json'
    output_file = 'all_gaze_data.csv'
    fixation_file = 'fixations.csv'
    
    process_gaze_data(gaze_file, aoi_config_file, output_file, fixation_file)
