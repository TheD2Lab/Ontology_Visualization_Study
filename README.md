# Visualization Ontology Study 
 
This repository provides a complete solution for performing eye tracking with **WebGazer.js** using a web browser and a webcam. WebGazer.js’s eye tracking capabilities allows us to collect a user’s gaze location (X, Y coordinates) on the browser screen and a timestamp of when each gaze was recorded. Through these three metrics, the gaze_converter python file in this repository enables us to convert raw gaze data and processes the data to extract fixation and saccade metrics. It also converts the raw data into a format that **BEACHGaze** expects. 
 
**First, clone the repository and navigate to the project folder:** 
 
```bash 
git clone https://github.com/TheD2Lab/Ontology_Visualization_Study.git  

``` 
 
## 1. Environment Setup for Gaze Conversion Script Requirements 
 

To run gaze_converter.py, follow the steps below: 
1. Create a virtual environment: `python3 -m venv venv` 
 
2. Activate it: `venv\Scripts\activate` 
 
3. Install the Dependencies: `pip install -r requirements.txt` 
 

## 2.  Webcam Configuration 

A webcam must be enabled to record gaze and the web browser must have permissions to access the webcam. For example, in Chrome, go to Settings -> Privacy and Security -> Site Settings -> Camera, and under “Default behavior”, check mark the box that says “Sites can ask to use your camera”. 

 
## 3. Example Use Case 

In an example use case, a browser-based eye tracking study is designed to compare three interactive visualizations in their support to users who are new to ontological relations in OWL such as unionOf, complementOf, disjointWith, and intersectionOf. The study presents a website showing a list of tasks that a user completes with the support of three different visualizations. During their interactions with the given visualizations, their eye gaze is automatically recorded. 

To view this example study, open (e.g., by simply dragging) the file "ontology_study.html" in a web browser.  

 
## 4. Defining AOIs 
AOIs can be defined by a researcher either before or after a study.  

 
- **Defining Areas:** 
  - Press **Ctrl + Z** to start. 
  - Drag and drop to create boxes. 
  - Press **Ctrl + X** to save as **aoi_config.json**. 
 
- **An example AOI Configuration Output: aoi_config.json ** 

 
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
 

In the sample example above, two AOIs have been defined. The X and Y values represent the top left corner of that AOI on the screen, using pixel coordinates. The width and height specify the dimensions of the AOI, extending rightward and downward from the top left corner. 

This means that AOI_1 starts at (100 , 200) and extends 300 pixels to the right and 150 pixels down, while AOI_2 starts at (500, 100), extending 250 pixels to the right and 200 pixels down. The y-coordinates follow a top-left origin system, where increasing y values will move downward on the screen. 

 
## 5. Start/Ending Recordings and Post Gaze Data Capturing 
 
WebGazer begins to record user gaze data from the first/start page of the questions + answers section of the study, through the “startMainTracking()” function in eyetracking.js: 

 

```js 

function startMainTracking() { 
    if (!mainGazeTrackingEnabled) { 
        mainGazeTrackingEnabled = true; 
        webgazer.showPredictionPoints(false); // Disable prediction points for main tracking if desired 
        console.log('Main gaze tracking enabled.'); 
    } 
} 
``` 

This function is then placed anywhere on the html file where the user would want to begin tracking.  

For example, in the code below, the startMainTracking function (which disableCalibration() calls), is executed when the user clicks on the “proceed-button”. 

 

```js 

<button id="proceed-button" onclick="disableCalibration()">Proceed</button> 

``` 


It automatically stops recording and downloads the raw_gaze_data.csv file to your “Downloads” folder through the "downloadGazeDataCSV()" function (from eyetracking.js). 
 
For recording start, the "startMainTracking() function in eyetracking.js is responsible for  beginning the collection of data. 
 
For recording stop, the "stopMainTracking() function in eyetracking.js is responsible for ending it. With these two functions, you can effectively attach them to a button element in the HTML at any point in your webpage, so that upon the user clicking the button, recording will start/stop. 
 
An example raw data file: raw_gaze_data.csv will have the following headers and values: 
 
``` 
x,y,TIME(YYYY/MM/DD HH:MM:SS.sss),TIMETICK(f=10000000) 
808.1283,453.9446,0.00000,48860001560 
773.8807,537.9750,0.26120,48860065596 
775.2518,542.1353,0.53100,48860134931 
``` 
 
* "x" and "y" - Screen coordinates of a fixationnthe gaze. Similarly to the AOIs, they follow the same coordinate system, starting from the top left corner of the screen 
* TIME(...) - Normalized time in seconds (the first value is set to zero) 
* TIMETICK(f=10000000) - A high precision time measurement that keeps track of elapsed time during the recording. F=10000000 means that the time is recorded in units of 10 million ticks per second. This allows for a more precise timekeeping. To calculate this, we use the following formula: 

Timetick = Base + (Time x 10,000,000). The Base is 48860001560. So we have... 

48860001560 + (0.26120 x 10,000,000) = 48860065596 

In the example above, 773.8807,537.9750,0.26120,48860065596 means: 

X (773.8807) and Y (537.9750) are the coordinates on the screen for a specific gaze point. 0.26120 refers to how many seconds has passed since the start of the eye tracking (0.00000) and 48860065596 is the timetick. 

This raw file is used as input for the gaze conversion process 
 
## 6. Gaze Conversion 
 
The "gaze_conversion.py" script processes the raw gaze data into a format which BEACHGaze takes in as input. This script performs several steps: 
 
* Normalization: Converts raw x, y, and time values into normalized coordinates 
* Fixation Detection: Uses DBSCAN clustering to detect fixations and computes metrics like fixation duration 
* AOI Assignment: Uses the AOI configuration to label each gaze point 
* Saccade Metrics: Computes saccade magnitude and direction between fixations 
* Placeholder Fields: Adds additional fields to maintain compatibility with BEACHGaze 
 
## 6.1. When AOIs are not defined 
 
Input files required to run gaze_converter.py: 
 
1. raw_gaze_data.csv 
 
## 6.2. When AOIs are defined 
 
Input files required to run gaze_converter.py: 
 
1. raw_gaze_data.csv 
2. aoi_config.json 
 
## 6.3. How to run: `python3 gaze_conversion.py` 
 
This will produce: all_gaze_data.csv 

All_gaze_data.csv contains the following headers, which are used to pass into BEACHGaze: 
 
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

It’s important to note that these values are all required data headers for the csv file to be successfully accepted by BEACHGaze. This is due to BEACHGaze’s support for processing raw gaze generated using Gazepoint eye trackers, where the above-listed data fields are used by Gazepoint. With only location (x and y) and a timestamp for each gaze, the gaze_converter.py script isn’t able to perform calculations for all the headers listed above. As a result, many headers have been given placeholder values. These placeholder headers are: 

BPOGX - 0 
BPOGY - 0 
BPOGV - 0 
CX - 0 
CY - 0 
CS - 0 
KB - 0 
KBS - 0 
USER - 0 
LPCX - 0 
LPCY - 0 
LPD - 0 
LPS - 0 
LPV - 0 
RPCX - 0 
RPCY - 0 
RPD - 0 
RPS - 0 
RPV - 0 
BKID - 0 
BKDUR - 0 
BKPMIN - 0 
LPMM - 4 
LPMMV - 1 
RPMM - 4 
RPMMV - 1 
DIAL - 0 
DIALV - 0 
GSR - 0 
GSRV - 0 
HR – 0 
HRV - 0 
HRP - 0 
IBI - 0 
TTL0 – 0 
TTL1 – 0 
TTL2 – 0 
TTL3 – 0 
TTL4 - 0 
TTL5 - 0 
TTL6 - 0 
TTLV - 0 
PIXS - 0 
PIXV - 0 

Please note: The headers TTL0, TTL1, TTL2, TTL3, TTL4, TTL5, and TTL6 are timestamped trigger markers/event flags that are used for handling external events with gaze tracking data. These events can be, for example, external button presses. However, these features don’t hold an influence on our specific use case, therefore they are given placeholder values of 0. 

For the features LPMMV and RPMMV, the placeholder value 1 refers to the validity of the fixation. A value of 1 means the fixation is classified as a valid fixation, while 0 means the fixation isn’t valid. For the features LPMM and RPMM, which refer to left and right pupil size respectively, by default, a placeholder value of 4 millimeters is assigned to both 

 
Once the contents of the output are confirmed, all_gaze_data.csv can be passed into BEACHGaze for further data processing. Please note that fixations.csv is not required to be passed into BEACHGaze. 

 

A valid file should have outputs satisfying the following : 

Values must be populated in every header, with the headers from TIME -> FPOGD needing to be floating point values. 

LPMM and RPMM must be 4 (millimeters) and both LPMMV and RPMMV must be 1 (meaning the data reported for the left pupil and the right pupil are both valid) 

FPOGID must be sequential values (starting from 1, 2, ...) 

## 7.0 How to Visualize Dataset Fixations:

Using the python file: "visualize_fixations_with_aoi.py",

You can change the DBSCAN parameters which appear as "eps" and "min_samples" to whichever values work best for the dataset presented.

Make sure to change line 16 to reflect the correct name of the dataset you wish to visualize fixations for. The dataset must be placed within the "\Ontology_Visualization_Study\backend" directory.

Lines 55-56 within the "visualize_fixations_with_aoi.py" file contain the DBSCAN parameters "eps" and "min_samples". As it stands, they are 0.03 and 4, however you can change them to any parameters that result in the best fixation clusters for the given dataset.

NOTE: "eps" specifies the maximum distance between points for them to be considered part of the same neighborhood and "min_samples" indicates the minimum number of points that must lie within that eps‑neighborhood for a point to qualify as a core point.


 
 
 