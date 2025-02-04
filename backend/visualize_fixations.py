import pandas as pd
import matplotlib.pyplot as plt
from sklearn.cluster import DBSCAN
import numpy as np

# Load the processed gaze data (the output of gaze_data_conversion.py)
data = pd.read_csv('all_gaze_data.csv')

# Identify the time column (its header should start with "TIME(")
time_cols = [col for col in data.columns if col.startswith("TIME(")]
if not time_cols:
    raise ValueError("No TIME column found in the expected format.")
time_col = time_cols[0]

# Ensure the time column is numeric; if needed, convert it.
data[time_col] = pd.to_numeric(data[time_col], errors='coerce')

# Since FPOGX and FPOGY are already normalized (0-1), we also need to scale time.
# (Otherwise, the time dimension—typically ranging from 0 to tens of seconds—will dominate the Euclidean distance.)
data['time_norm'] = (data[time_col] - data[time_col].min()) / (data[time_col].max() - data[time_col].min())

# Build the feature matrix using normalized x, y, and normalized time.
X = data[['FPOGX', 'FPOGY', 'time_norm']].values

# Set DBSCAN parameters (adjust these as needed).
eps = 0.08       # maximum distance between two samples for them to be considered as in the same neighborhood
min_samples = 10 # minimum number of samples in a neighborhood for a point to be considered a core point

# Apply DBSCAN clustering.
db = DBSCAN(eps=eps, min_samples=min_samples).fit(X)
data['fixation_id'] = db.labels_

# (Optional) Remove noise points (where DBSCAN labels them as -1).
fixations = data[data['fixation_id'] != -1]

# Plot the fixation points (using FPOGX and FPOGY) colored by the fixation cluster id.
plt.figure(figsize=(8, 6))
plt.scatter(fixations['FPOGX'], fixations['FPOGY'], c=fixations['fixation_id'],
            cmap='rainbow', s=20)
plt.colorbar(label='Fixation ID')
plt.title(f'DBSCAN Fixations (eps={eps}, min_samples={min_samples})')
plt.xlabel('FPOGX (normalized)')
plt.ylabel('FPOGY (normalized)')
plt.show()
