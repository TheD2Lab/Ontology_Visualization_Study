import os
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.cluster import DBSCAN
import time

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
print("Initial data shape:", data.shape)

# Force using a subset to reduce memory usage (set max_rows as needed)
max_rows = 100000
if data.shape[0] > max_rows:
    data = data.sample(n=max_rows, random_state=42)
    print(f"Using subset of data with shape: {data.shape}")

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
print("Feature matrix shape:", X.shape)

# Monitor dimensions (in pixels)
monitor_width = 1920
monitor_height = 1080

# Define AOI dimensions (AOI_Q at the top, AOI_V below)
aoi_Q = {"x": 0, "y": 0, "width": 1920, "height": 240}
aoi_V = {"x": 0, "y": 240, "width": 1920, "height": 839}

# Set manual DBSCAN parameters (adjust as needed)
eps = 0.03     # example value (adjust manually as needed)
min_samples = 4  # example value (adjust manually as needed)

print(f"Running DBSCAN with eps={eps:.3f} and min_samples={min_samples}")
start_time = time.time()
db = DBSCAN(eps=eps, min_samples=min_samples).fit(X)
elapsed = time.time() - start_time
print(f"DBSCAN took {elapsed:.2f} seconds")

# Add DBSCAN cluster labels to data
data['fixation_id'] = db.labels_

# Remove noise points (labeled as -1)
fixations = data[data['fixation_id'] != -1].copy()

# Convert normalized gaze coordinates to pixel values
fixations['x_px'] = fixations['FPOGX'] * monitor_width
fixations['y_px'] = fixations['FPOGY'] * monitor_height

# Create the plot for the fixation data
plt.figure(figsize=(12, 7))
ax = plt.gca()

# Plot the fixation points (colored by fixation id)
scatter = ax.scatter(fixations['x_px'], fixations['y_px'], c=fixations['fixation_id'], cmap='rainbow', s=20)
plt.colorbar(scatter, label='Fixation ID')

# Draw the AOI boxes
rect_Q = plt.Rectangle((aoi_Q["x"], aoi_Q["y"]), aoi_Q["width"], aoi_Q["height"],
                       fill=False, edgecolor='red', linewidth=2, label='AOI_Q')
rect_V = plt.Rectangle((aoi_V["x"], aoi_V["y"]), aoi_V["width"], aoi_V["height"],
                       fill=False, edgecolor='blue', linewidth=2, label='AOI_V')
ax.add_patch(rect_Q)
ax.add_patch(rect_V)

# Set axis limits to full monitor dimensions and invert y-axis
ax.set_xlim(0, monitor_width)
ax.set_ylim(0, monitor_height)
ax.invert_yaxis()

# Set labels and title
plt.xlabel("X (pixels)")
plt.ylabel("Y (pixels)")
plt.title(f"{base_name}: DBSCAN Fixations (eps={eps:.3f}, min_samples={min_samples})")
plt.legend(loc="upper right")

# Save the plot with a filename reflecting the parameters
plot_filename = base_name.replace("_all_gaze.csv", f"_fixabababooeytions_eps{eps:.3f}_minS{min_samples}.png")
plt.tight_layout()
plt.savefig(os.path.join(plot_dir, plot_filename))
plt.close()

print(f"Saved plot for eps={eps:.3f} and min_samples={min_samples}")
print("Processing completed.")
