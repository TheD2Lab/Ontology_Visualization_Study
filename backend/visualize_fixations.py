import pandas as pd
import matplotlib.pyplot as plt
from sklearn.cluster import DBSCAN
import numpy as np

# Load gaze data with potential fixations (e.g., after DBSCAN processing)
data = pd.read_csv('gaze_data.csv')

# Parameters for grid search (you can adjust these ranges)
eps_values = [0.05, 0.08, 0.1, 0.12]  # Varying spatial proximity values for DBSCAN
min_samples_values = [5, 7, 10]  # Varying min_samples values for DBSCAN

def apply_dbscan_and_plot(data, eps, min_samples):
    # Normalize X, Y, and Timestamp (required for DBSCAN clustering on normalized features)   
    data['x_normalized'] = (data['x'] - data['x'].min()) / (data['x'].max() - data['x'].min())
    data['y_normalized'] = (data['y'] - data['y'].min()) / (data['y'].max() - data['y'].min())
    data['timestamp_normalized'] = (data['timestamp'] - data['timestamp'].min()) / (data['timestamp'].max() - data['timestamp'].min())

    # Apply DBSCAN for fixation detection
    X = data[['x_normalized', 'y_normalized', 'timestamp_normalized']].values
    db = DBSCAN(eps=eps, min_samples=min_samples).fit(X)
    data['fixation_id'] = db.labels_

    # Filter out noise points (labeled as -1 by DBSCAN)
    fixations = data[data['fixation_id'] != -1]

    # Plot the fixation points with colors representing different fixation IDs
    plt.figure(figsize=(8, 6))
    plt.scatter(fixations['x'], fixations['y'], c=fixations['fixation_id'], cmap='rainbow', s=20)
    plt.colorbar(label='Fixation ID')
    plt.title(f'DBSCAN Fixations (eps={eps}, min_samples={min_samples})')
    plt.xlabel('X Position')
    plt.ylabel('Y Position')
    plt.show()

# Grid search visualization
for eps in eps_values:
    for min_samples in min_samples_values:
        print(f"Plotting for eps={eps}, min_samples={min_samples}")
        apply_dbscan_and_plot(data.copy(), eps, min_samples)
