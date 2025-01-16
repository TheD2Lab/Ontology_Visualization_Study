import pandas as pd
import numpy as np
import json
from sklearn.cluster import DBSCAN

# Function to normalize coordinates
def normalize(value, min_value, max_value):
    return (value - min_value) / (max_value - min_value)

# Function to check if a point falls within an AOI
def is_point_in_aoi(x, y, aoi):
    x_min = aoi['x']
    x_max = aoi['x'] + aoi['width']
    y_min = aoi['y']
    y_max = aoi['y'] + aoi['height']
    return x_min <= x <= x_max and y_min <= y <= y_max

# Function to calculate saccade magnitude
def calculate_saccade_magnitude(x1, y1, x2, y2):
    return np.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)

# Function to calculate saccade direction
def calculate_saccade_direction(x1, y1, x2, y2):
    return np.degrees(np.arctan2(y2 - y1, x2 - x1))

# Function to calculate saccade features
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

# Process gaze data with AOI detection and DBSCAN-based fixation analysis
def process_gaze_data(gaze_file, aoi_config_file='aoi_config.json', output_file='processed_gaze_data.csv', fixation_file='fixations.csv'):
    # Load gaze data
    data = pd.read_csv(gaze_file)
    data = data.sort_values(by='timestamp')

    # Normalize X, Y, and timestamp
    data['FPOGX'] = normalize(data['x'], data['x'].min(), data['x'].max())
    data['FPOGY'] = normalize(data['y'], data['y'].min(), data['y'].max())
    data['TIME'] = data['timestamp']

    # Apply DBSCAN for fixation detection
    eps = 0.08  # Adjust based on data
    min_samples = 10  # Minimum points for a fixation
    X = data[['FPOGX', 'FPOGY', 'TIME']].values
    db = DBSCAN(eps=eps, min_samples=min_samples).fit(X)
    data['FPOGID'] = db.labels_

    # Filter out noise points
    fixations = data[data['FPOGID'] != -1]

    # Group by fixation clusters to calculate metrics
    fixation_metrics = fixations.groupby('FPOGID').agg({
        'FPOGX': 'mean',
        'FPOGY': 'mean',
        'TIME': ['min', 'max']
    })

    # Calculate fixation duration in milliseconds
    fixation_metrics['duration'] = (
        (fixation_metrics[('TIME', 'max')] - fixation_metrics[('TIME', 'min')])
        * 1000
    )
    fixation_metrics.columns = ['x_mean', 'y_mean', 'start_time', 'end_time', 'duration']

    # Assign fixation start time and duration to the main data
    data['FPOGS'] = np.nan
    data['FPOGD'] = np.nan

    for fixation_id in fixation_metrics.index:
        start_time = fixation_metrics.loc[fixation_id, 'start_time']
        duration = fixation_metrics.loc[fixation_id, 'duration']
        data.loc[data['FPOGID'] == fixation_id, 'FPOGS'] = start_time
        data.loc[data['FPOGID'] == fixation_id, 'FPOGD'] = duration

    # Fill missing FPOGS and FPOGD with 0
    data['FPOGS'].fillna(0, inplace=True)
    data['FPOGD'].fillna(0, inplace=True)

    # Load AOI configuration from JSON
    with open(aoi_config_file, 'r') as f:
        aoi_config = json.load(f)

    # Add AOI columns to gaze data
    for index, aoi in enumerate(aoi_config):
        aoi_name = f"AOI_{index + 1}"
        data[aoi_name] = data.apply(
            lambda row: int(is_point_in_aoi(row['x'], row['y'], aoi)), axis=1
        )

    # Assign AOI feature to each gaze point
    def assign_aoi(row):
        for index, aoi in enumerate(aoi_config):
            if is_point_in_aoi(row['x'], row['y'], aoi):
                return f"AOI_{index + 1}"
        return 'None'

    data['AOI'] = data.apply(assign_aoi, axis=1)

    # Placeholder columns for BEACH-Gaze requirements
    placeholders = {
        'MEDIA_ID': '',
        'MEDIA_NAME': '',
        'CNT': np.arange(1, len(data) + 1),
        'TIMETICK(f=10000000)': 0,
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
        'LPMM': 0,
        'LPMMV': 0,
        'RPMM': 0,
        'RPMMV': 0,
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
        data[column] = default

    # Add saccade features
    data = add_saccade_features(data)

    # Reorder columns to match BEACH-Gaze requirements
    columns_order = list(placeholders.keys()) + ['FPOGX', 'FPOGY', 'FPOGS', 'FPOGD', 'FPOGID', 'AOI', 'SACCADE_MAG', 'SACCADE_DIR']
    data = data[columns_order]

    # Save enriched gaze data
    data.to_csv(output_file, index=False)
    print(f"Processed gaze data with AOIs saved to {output_file}")

    # Save fixation metrics for BEACH-Gaze compatibility
    fixation_metrics[['x_mean', 'y_mean', 'start_time', 'duration']].to_csv(fixation_file, index_label='fixation_id')
    print(f"Fixation metrics saved to {fixation_file}")

if __name__ == "__main__":
    # Example file paths
    gaze_file = 'raw_gaze_data.csv'
    aoi_config_file = 'aoi_config.json'  # AOI config JSON file
    output_file = 'all_gaze_data.csv'
    fixation_file = 'fixations.csv'

    # Process the gaze data with AOIs and fixation analysis
    process_gaze_data(gaze_file, aoi_config_file, output_file, fixation_file)
