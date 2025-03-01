# Visualization Ontology Study

This repository provides a complete solution for performing eye tracking with **WebGazer.js** using a web browser and a webcam. The tool collects raw gaze data, allows users to define their own Areas of Interest (AOIs) through an interactive interface, and processes the data to extract fixation and saccade metrics. It also converts the raw data into a format that **BEACHGaze** expects.

**First, clone the repository and navigate to the project folder:**

```bash
git clone https://github.com/IcedTeaGoblin/Thesis-Web-Page.git
cd Thesis-Web-Page
```

## 1. Environment Setup

1. Create a virtual environment: `python3 -m venv venv`

2. Activate it: `venv\Scripts\activate`

3. Install the Dependencies: `pip install -r requirements.txt`

To Run the Webpage, simply drag the file "ontology_study.html" into your browser. The repository uses WebGazer.js to capture gaze data, so make sure your webcam is enabled and the browser has permissions to access it. Check the browser's developer console for initialization messages.

## 2. Defining AOIs

- **Defining Areas:**
  - Press **Ctrl + Z** to start.
  - Drag and drop to create boxes.
  - Press **Ctrl + X** to save as **aoi_config.json**.

- **Sample AOI Configuration Output:**
  ```json
  [
    {
      "x": 100,
      "y": 200,
      "width": 300,
      "height": 150,
      "label": "AOI_1"
    },
    {
      "x": 500,
      "y": 100,
      "width": 250,
      "height": 200,
      "label": "AOI_2"
    }
  ]

## 3. Start/Ending Recordings and Post Gaze Data Capturing

WebGazer begins to record user gaze data from the first/start page of the questions + answers section of the study. It automatically stops recording and downloads the raw_gaze_data.csv file for you through the "downloadGazeDataCSV()" function (from eyetracking.js).

For recording start, the "startMainTracking() function in eyetracking.js is responsible for beginning the collection of data.

For recording stop, the "stopMainTracking() function in eyetracking.js is responsible for ending it.

An example raw data file will have the following headers and values:

```
x,y,TIME(YYYY/MM/DD HH:MM:SS.sss),TIMETICK(f=10000000)
808.1283,453.9446,0.00000,48860001560
773.8807,537.9750,0.26120,48860065596
775.2518,542.1353,0.53100,48860134931
```

* "x" and "y" - Screen coordinates of the gaze
* TIME(...) - Normalized time in seconds (the first value is set to zero)
* TIMETICK(f=10000000) - A tick value computed using a base offset and the elapsed time it took the user to complete the study

This raw file is used as input for the gaze conversion process

## 4. Gaze Conversion

The "gaze_conversion.py" script processes the raw gaze data into a format which BEACHGaze takes in as input. This script performs several steps:

* Normalization: Converts raw x, y, and time values into normalized coordinates
* Fixation Detection: Uses DBSCAN clustering to detect fixations and computes metrics like fixation duration
* AOI Assignment: Uses the AOI configuration to label each gaze point
* Saccade Metrics: Computes saccade magnitude and direction between fixations
* Placeholder Fields: Adds additional fields to maintain compatibility with BEACHGaze

Input files required to run gaze_converter.py:

1. raw_gaze_data.csv
2. aoi_config.json

How to run: `python3 gaze_conversion.py`

This will produce fixations.csv containing fixation metrics and all_gaze_data.csv which contains the following headers:

```
MEDIA_ID
MEDIA_NAME
CNT
TIME(2023/11/27 13:46:43.814)
TIMETICK(f=10000000)
FPOGX
FPOGY
FPOGS
FPOGD
FPOGID
FPOGV
BPOGX
BPOGY
BPOGV
CX
CY
CS
KB
KBS
USER
LPCX
LPCY
LPD
LPS
LPV
RPCX
RPCY
RPD
RPS
RPV
BKID
BKDUR
BKPMIN
LPMM
LPMMV
RPMM
RPMMV
DIAL
DIALV
GSR
GSRV
HR
HRV
HRP
IBI
TTL0
TTL1
TTL2
TTL3
TTL4
TTL5
TTL6
TTLV
PIXS
PIXV
AOI
SACCADE_MAG
SACCADE_DIR
VID_FRAME
```

Once the contents of the output are confirmed, raw_gaze_data.csv can be passed into BEACHGaze for further data processing. Please note that fixations.csv is not required to be passed into BEACHGaze.
