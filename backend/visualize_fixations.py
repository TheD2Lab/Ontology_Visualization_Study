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

# Normalize the time column so that it is scaled between 0 and 1.
data['time_norm'] = (data[time_col] - data[time_col].min()) / (data[time_col].max() - data[time_col].min())

# Build the feature matrix using normalized FPOGX, FPOGY, and the normalized time.
X = data[['FPOGX', 'FPOGY', 'time_norm']].values

# Define grid search ranges for eps and min_samples.
# (You might adjust these ranges based on your data characteristics.)
eps_values = np.linspace(0.4, 1.0, 7)       # For example: 0.4, 0.5, ..., 1.0
min_samples_values = range(3, 10, 1)          # For example: 3, 4, ..., 9

# Create an empty list to store grid search results.
results = []

# Loop over the grid of eps and min_samples.
for eps in eps_values:
    for min_samples in min_samples_values:
        db = DBSCAN(eps=eps, min_samples=min_samples).fit(X)
        labels = db.labels_
        # The number of clusters (ignoring noise which is labeled as -1)
        n_clusters = len(set(labels)) - (1 if -1 in labels else 0)
        n_noise = list(labels).count(-1)
        results.append({'eps': eps, 'min_samples': min_samples,
                        'n_clusters': n_clusters, 'n_noise': n_noise})
        print(f"eps: {eps:.2f}, min_samples: {min_samples}, clusters: {n_clusters}, noise: {n_noise}")

# Convert results to a DataFrame for further analysis.
results_df = pd.DataFrame(results)
print("\nGrid Search Results:")
print(results_df)

# Optionally, select one combination and visualize the clustering.
selected_eps = 0.3
selected_min_samples = 5
db_selected = DBSCAN(eps=selected_eps, min_samples=selected_min_samples).fit(X)
data['fixation_id'] = db_selected.labels_

# Remove noise points for plotting (noise is labeled as -1)
fixations = data[data['fixation_id'] != -1]

plt.figure(figsize=(8, 6))
plt.scatter(fixations['FPOGX'], fixations['FPOGY'],
            c=fixations['fixation_id'], cmap='rainbow', s=20)
plt.colorbar(label='Fixation ID')
plt.title(f'DBSCAN Fixations (eps={selected_eps}, min_samples={selected_min_samples})')
plt.xlabel('FPOGX (normalized)')
plt.ylabel('FPOGY (normalized)')
plt.show()
