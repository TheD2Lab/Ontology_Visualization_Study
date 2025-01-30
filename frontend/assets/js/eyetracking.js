// eyetracking.js

let gazeData = []; // Array to store main gaze data
let mainGazeTrackingEnabled = false; // Flag to control main gaze tracking

/**
 * Initializes WebGazer without starting the main gaze data collection.
 * Sets up the gaze listener but doesn't record data until enabled.
 */
function initializeWebGazer() {
    console.log('Initializing WebGazer...');
    if (typeof webgazer === 'undefined') {
        console.error('WebGazer is not loaded.');
        return;
    }

    webgazer.setGazeListener((data, timestamp) => {
        if (data && mainGazeTrackingEnabled) {
            // Only record gaze data if main tracking is enabled
            gazeData.push({
                x: data.x, // X-coordinate
                y: data.y, // Y-coordinate
                timestamp: timestamp // Timestamp
            });
        }
    }).begin()
    .then(() => {
        console.log('WebGazer has started.');
        // Optionally, hide prediction points initially
        webgazer.showPredictionPoints(false);
    })
    .catch((err) => {
        console.error('WebGazer initialization failed:', err);
    });

    // Optional: Hide or show webcam preview
    webgazer.showVideoPreview(false);
    webgazer.showPredictionPoints(false);

    console.log('WebGazer initialized.');
}

/**
 * Enables main gaze data collection.
 * This should be called after calibration is complete.
 */
function startMainTracking() {
    if (!mainGazeTrackingEnabled) {
        mainGazeTrackingEnabled = true;
        webgazer.showPredictionPoints(false); // Disable prediction points for main tracking if desired
        console.log('Main gaze tracking enabled.');
    }
}

/**
 * Disables main gaze data collection.
 * Can be used if you need to stop recording gaze data at any point.
 */
function stopMainTracking() {
    if (mainGazeTrackingEnabled) {
        mainGazeTrackingEnabled = false;
        console.log('Main gaze tracking disabled.');
    }
}

/**
 * Downloads the main gaze data as a CSV file.
 */
function downloadGazeDataCSV() {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "x,y,timestamp\n"; // CSV header

    if (gazeData.length > 0) {
        gazeData.forEach(row => {
            csvContent += `${row.x},${row.y},${row.timestamp}\n`;
        });
    } else {
        console.warn("No gaze data to download. Creating an empty file.");
    }

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "main_gaze_data.csv");
    document.body.appendChild(link); // Append link to body
    link.click(); // Trigger download
    document.body.removeChild(link); // Remove link after download
    console.log("Main gaze data downloaded.");
}

// Keyboard shortcut for downloading main gaze data (Ctrl+D)
document.addEventListener('keydown', function (event) {
    if (event.ctrlKey && event.key === 'd') {
        event.preventDefault(); // Prevent default browser action
        downloadGazeDataCSV(); // Trigger CSV download
        console.log("Main gaze data CSV downloaded!");
    }
});

// Automatically initialize WebGazer on page load without starting main tracking
window.onload = function () {
    console.log('Page loaded. Initializing WebGazer...');
    initializeWebGazer();
};

// Stop WebGazer when the page is closed
window.onbeforeunload = function () {
    if (typeof webgazer !== 'undefined') {
        webgazer.end();
    }
};

// Expose functions globally for access from HTML
window.startMainTracking = startMainTracking;
window.stopMainTracking = stopMainTracking;
window.downloadGazeDataCSV = downloadGazeDataCSV;
