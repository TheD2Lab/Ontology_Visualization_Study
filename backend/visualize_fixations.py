import os
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.cluster import DBSCAN

sns.set(style="whitegrid")

# Create output directory for plots if it doesn't exist
plot_dir = "plots"
os.makedirs(plot_dir, exist_ok=True)

# Specify the file to process
file = "p21_GP_all_gaze.csv"
base_name = os.path.basename(file)
print(f"Processing {base_name} ...")

# Load the processed gaze data
data = pd.read_csv(file)

# Identify the time column (should start with "TIME(")
time_cols = [col for col in data.columns if col.startswith("TIME(")]
if not time_cols:
    raise ValueError(f"No TIME column found in {base_name}.")
time_col = time_cols[0]

# Convert time column to numeric if needed
data[time_col] = pd.to_numeric(data[time_col], errors='coerce')

# Normalize the time column (scale between 0 and 1)
data['time_norm'] = (data[time_col] - data[time_col].min()) / (data[time_col].max() - data[time_col].min())

# Build the feature matrix using normalized FPOGX, FPOGY, and time_norm
X = data[['FPOGX', 'FPOGY', 'time_norm']].values

# Define grid search ranges for eps and min_samples.
eps_values = np.linspace(0.03, 0.1, 8)  # Example range; adjust as needed.
min_samples_values = range(3, 10)         # 3,4,...,9

# Create a list to store grid search results.
results = []

# Grid search: for each combination of eps and min_samples, run DBSCAN and count clusters.
for eps in eps_values:
    for min_samples in min_samples_values:
        db = DBSCAN(eps=eps, min_samples=min_samples).fit(X)
        labels = db.labels_
        # Number of clusters (ignoring noise labeled as -1)
        n_clusters = len(set(labels)) - (1 if -1 in labels else 0)
        n_noise = list(labels).count(-1)
        results.append({'eps': eps, 'min_samples': min_samples,
                        'n_clusters': n_clusters, 'n_noise': n_noise})

# Convert grid search results to a DataFrame
results_df = pd.DataFrame(results)
print("\nGrid Search Results for", base_name)
print(results_df)

# Save the grid search results to a CSV file (named based on the input file)
results_csv_name = base_name.replace("_all_gaze.csv", "_grid_search_results.csv")
results_df.to_csv(os.path.join(plot_dir, results_csv_name), index=False)

# Create a pivot table and plot a heatmap of the total number of fixations (clusters)
pivot_clusters = results_df.pivot(index="min_samples", columns="eps", values="n_clusters")
plt.figure(figsize=(10, 8))
sns.heatmap(pivot_clusters, annot=True, fmt="d", cmap="viridis")
plt.title(f"{base_name}: Total Number of Fixations vs. eps and min_samples")
plt.xlabel("eps")
plt.ylabel("min_samples")
heatmap_filename = base_name.replace("_all_gaze.csv", "_fixation_heatmap.png")
plt.tight_layout()
plt.savefig(os.path.join(plot_dir, heatmap_filename))
plt.close()

# Optionally, select one combination of parameters and visualize the clustering
# Here, we use fixed parameters (you can adjust these as needed)
selected_eps = 0.03
selected_min_samples = 4
db_selected = DBSCAN(eps=selected_eps, min_samples=selected_min_samples).fit(X)
data['fixation_id'] = db_selected.labels_

# Remove noise points (labeled as -1) for plotting fixations
fixations = data[data['fixation_id'] != -1]

plt.figure(figsize=(8, 6))
plt.scatter(fixations['FPOGX'], fixations['FPOGY'], c=fixations['fixation_id'], cmap='rainbow', s=20)
plt.colorbar(label='Fixation ID')
plt.title(f"{base_name}: DBSCAN Fixations (eps={selected_eps}, min_samples={selected_min_samples})")
plt.xlabel('FPOGX (normalized)')
plt.ylabel('FPOGY (normalized)')
fixation_plot_filename = base_name.replace("_all_gaze.csv", "_fixation_plot.png")
plt.tight_layout()
plt.savefig(os.path.join(plot_dir, fixation_plot_filename))
plt.close()

print("Processing completed.")
