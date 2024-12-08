import pandas as pd
import numpy as np
from sklearn.cluster import DBSCAN

# Function to check if a point falls within an AOI
def is_point_in_aoi(x, y, aoi):
    return aoi['x_min'] <= x <= aoi['x_max'] and aoi['y_min'] <= y <= aoi['y_max']

# Process gaze data with AOI detection and DBSCAN-based fixation analysis
def process_gaze_data(gaze_file, aoi_config_file, output_file='processed_gaze_data.csv', fixation_file='fixations.csv'):
    # Load gaze data
    data = pd.read_csv(gaze_file)
    data = data.sort_values(by='timestamp')

    # Normalize X, Y, and timestamp
    data['x_normalized'] = (data['x'] - data['x'].min()) / (data['x'].max() - data['x'].min())
    data['y_normalized'] = (data['y'] - data['y'].min()) / (data['y'].max() - data['y'].min())
    data['timestamp_normalized'] = (data['timestamp'] - data['timestamp'].min()) / (data['timestamp'].max() - data['timestamp'].min())

    # Apply DBSCAN for fixation detection
    eps = 0.08  # Adjust based on data
    min_samples = 10  # Minimum points for a fixation
    X = data[['x_normalized', 'y_normalized', 'timestamp_normalized']].values
    db = DBSCAN(eps=eps, min_samples=min_samples).fit(X)
    data['fixation_id'] = db.labels_

    # Filter out noise points
    fixations = data[data['fixation_id'] != -1]

    # Group by fixation clusters to calculate metrics
    fixation_metrics = fixations.groupby('fixation_id').agg({
        'x_normalized': 'mean',
        'y_normalized': 'mean',
        'timestamp_normalized': ['min', 'max']
    })

    # Calculate fixation duration in milliseconds
    fixation_metrics['duration'] = (
        (fixation_metrics[('timestamp_normalized', 'max')] - fixation_metrics[('timestamp_normalized', 'min')])
        * 1000
    )
    fixation_metrics.columns = ['x_mean', 'y_mean', 'start_time', 'end_time', 'duration']

    # Assign fixation start time and duration to the main data
    for fixation_id in fixation_metrics.index:
        fixation_data = data[data['fixation_id'] == fixation_id]
        start_time = fixation_metrics.loc[fixation_id, 'start_time']
        duration = fixation_metrics.loc[fixation_id, 'duration']

        data.loc[data['fixation_id'] == fixation_id, 'FPOGS'] = start_time
        data.loc[data['fixation_id'] == fixation_id, 'FPOGD'] = duration

    # Load AOI configuration
    aoi_config = pd.read_csv(aoi_config_file)

    # Add AOI columns to gaze data
    for index, aoi in aoi_config.iterrows():
        aoi_name = f"AOI_{index + 1}"
        data[aoi_name] = data.apply(
            lambda row: int(is_point_in_aoi(row['x'], row['y'], aoi)), axis=1
        )

    # Assign AOI feature to each gaze point
    def assign_aoi(row):
        for index, aoi in aoi_config.iterrows():
            if is_point_in_aoi(row['x'], row['y'], aoi):
                return f"AOI_{index + 1}"
        return 'None'

    data['AOI'] = data.apply(assign_aoi, axis=1)

    # Save enriched gaze data
    data.to_csv(output_file, index=False)
    print(f"Processed gaze data with AOIs saved to {output_file}")

    # Save fixation metrics for BEACH-Gaze compatibility
    fixation_metrics[['x_mean', 'y_mean', 'start_time', 'duration']].to_csv(fixation_file, index_label='fixation_id')
    print(f"Fixation metrics saved to {fixation_file}")

if __name__ == "__main__":
    # Example file paths
    gaze_file = 'raw_gaze_data.csv'
    aoi_config_file = 'aoi_config.csv'  # Example AOI config with columns: x_min, x_max, y_min, y_max
    output_file = 'gaze_data_with_aois.csv'
    fixation_file = 'fixations.csv'

    # Process the gaze data with AOIs and fixation analysis
    process_gaze_data(gaze_file, aoi_config_file, output_file, fixation_file)
