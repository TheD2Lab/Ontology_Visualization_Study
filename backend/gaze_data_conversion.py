import pandas as pd
import numpy as np
from sklearn.cluster import DBSCAN

# Load and sort gaze data by timestamp for chronological order
data = pd.read_csv('raw_gaze_data.csv')
data = data.sort_values(by='timestamp')

# Normalize X, Y, and Timestamp
data['x_normalized'] = (data['x'] - data['x'].min()) / (data['x'].max() - data['x'].min())
data['y_normalized'] = (data['y'] - data['y'].min()) / (data['y'].max() - data['y'].min())
data['timestamp_normalized'] = (data['timestamp'] - data['timestamp'].min()) / (data['timestamp'].max() - data['timestamp'].min())

# Apply DBSCAN for fixation detection
eps = 0.08  # Adjust based on data for spatial proximity in DBSCAN
min_samples = 10  # Minimum number of points to form a fixation
X = data[['x_normalized', 'y_normalized', 'timestamp_normalized']].values
db = DBSCAN(eps=eps, min_samples=min_samples).fit(X)
data['fixation_id'] = db.labels_

# Filter out noise points (labeled as -1 by DBSCAN)
fixations = data[data['fixation_id'] != -1]

# Group by fixation clusters (fixation_id) to calculate fixation metrics
fixation_metrics = fixations.groupby('fixation_id').agg({
    'x_normalized': 'mean',  # Mean X position
    'y_normalized': 'mean',  # Mean Y position
    'timestamp_normalized': ['min', 'max']  # Start and end times of fixation
})

# Calculate fixation duration in milliseconds
fixation_metrics['duration'] = (fixation_metrics[('timestamp_normalized', 'max')] - fixation_metrics[('timestamp_normalized', 'min')]) * 1000  # Convert to milliseconds
fixation_metrics.columns = ['x_mean', 'y_mean', 'start_time', 'end_time', 'duration']

# Assign fixation start time (FPOGS) and duration (FPOGD) back to data
for fixation_id in fixation_metrics.index:
    fixation_data = data[data['fixation_id'] == fixation_id]
    start_time = fixation_metrics.loc[fixation_id, 'start_time']
    duration = fixation_metrics.loc[fixation_id, 'duration']
    
    data.loc[data['fixation_id'] == fixation_id, 'FPOGS'] = start_time
    data.loc[data['fixation_id'] == fixation_id, 'FPOGD'] = duration

# Add Gazepoint placeholder columns to gaze data (Commented out for optional inclusion)
# data['TIME'] = data['timestamp'] / 1000.0  # Convert milliseconds to seconds for TIME
# data['CNT'] = range(len(data))  # Unique count ID for each row
# data['FPOGID'] = -1  # Placeholder for fixation ID
# data['FPOGV'] = 1  # Fixation validity (1 = true, 2 = false)
# data['FPOGX'] = data['x']  # X-coordinate of fixation point of gaze
# data['FPOGY'] = data['y']  # Y-coordinate of fixation point of gaze
# data['LPMM'] = 0.0  # Placeholder for left pupil diameter
# data['LPMMV'] = 1  # Left pupil validity
# data['RPMM'] = 0.0  # Placeholder for right pupil diameter
# data['RPMMV'] = 1  # Right pupil validity
# data['CS'] = 0  # Cursor events placeholder
# data['BKID'] = 0  # Blink ID placeholder
# data['BKPMIN'] = 0  # Blink rate per minute placeholder
# data['AOI'] = ''  # Area of Interest placeholder
# data['SACCADE_MAG'] = 0.0  # Placeholder for saccade magnitude
# data['SACCADE_DIR'] = 0  # Placeholder for saccade direction

# Define saccade columns with float64 type
data['fixation_duration'] = 0.0
data['saccade_length'] = 0.0
data['saccade_duration'] = 0.0

# Calculate saccade lengths and durations between fixations
for i in range(1, len(data)):
    if data.iloc[i]['fixation_id'] != data.iloc[i-1]['fixation_id']:
        # Calculate saccade length and duration between two fixations
        saccade_length = np.sqrt((data.iloc[i-1]['x'] - data.iloc[i]['x'])**2 + (data.iloc[i-1]['y'] - data.iloc[i]['y'])**2)
        saccade_duration = data.iloc[i]['timestamp'] - data.iloc[i-1]['timestamp']
        
        # Update saccade details
        data.at[i, 'saccade_length'] = saccade_length
        data.at[i, 'saccade_duration'] = saccade_duration

# Save the enriched data with fixation and saccade information (Gaze Data)
data.to_csv('gaze_data.csv', index=False)
print("gaze_data.csv created successfully with DBSCAN-based fixations!")

# Save only the fixation metrics to a separate file for Beachgaze (Fixation Data)
fixation_metrics[['x_mean', 'y_mean', 'start_time', 'duration']].to_csv('fixations.csv', index_label='fixation_id')
print("fixations.csv created successfully with fixation metrics!")
