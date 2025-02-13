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
                timestamp: timestamp // Timestamp (absolute)
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
 * Before writing the CSV, the timestamps are normalized so that the first value is 0.
 */
/**
 * Downloads the main gaze data as a CSV file.
 * The timestamps are normalized so that the first value is 0.00000
 * and converted to seconds with 5 decimal places.
 */
/**
 * Downloads the main gaze data as a CSV file.
 * The CSV will include three columns: x, y, and TIME.
 * TIME is displayed as normalized seconds and TIMETICK is computed as:
 *     TIMETICK = qaStartTicks + ((row.timestamp - baseTime) * 10000)
 * (since (row.timestamp - baseTime) in milliseconds divided by 1000 gives seconds, and then seconds×10,000 yields ticks.)
 */
function downloadGazeDataCSV() {
    let csvContent = "data:text/csv;charset=utf-8,";
    
    // Use the qaStartTimeStr if available for the TIME header; otherwise default to 0.
    const timeHeader = window.qaStartTimeStr ? `TIME(${window.qaStartTimeStr})` : "TIME(0)";
    // Add both our time (in seconds) and TIMETICK (in ticks) to the header.
    csvContent += `x,y,${timeHeader},TIMETICK(f=10000000)\n`;

    if (gazeData.length > 0) {
        // Use the first timestamp as the base reference (in ms)
        const baseTime = gazeData[0].timestamp;
        gazeData.forEach(row => {
            // Normalize time to seconds with 5-decimal precision.
            const normalizedTime = ((row.timestamp - baseTime) / 1000).toFixed(5);
            // Compute the TIMETICK value:
            // Multiply the millisecond difference by 10000 (i.e. (ms diff)/1000 * 10000000 = ms diff * 10000)
            const tickDelta = Math.round((row.timestamp - baseTime) * 10000);
            // Add the base offset captured at Q+A start
            const timeTick = window.qaStartTicks + tickDelta;
            csvContent += `${row.x},${row.y},${normalizedTime},${timeTick}\n`;
        });
    } else {
        console.warn("No gaze data to download. Creating an empty file.");
    }

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "raw_gaze_data.csv");
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
    // Set the QA start time string to the current time:
    window.qaStartTimeStr = getFormattedCurrentTime();
    initializeWebGazer();
    // Optionally, set a starting tick offset if needed (e.g., 0 or another value)
    window.qaStartTicks = 0;
};

// Stop WebGazer when the page is closed
window.onbeforeunload = function () {
    if (typeof webgazer !== 'undefined') {
        webgazer.end();
    }
};

/**
 * Returns the current date/time in the format "YYYY/MM/DD HH:MM:SS.sss"
 */
function getFormattedCurrentTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // getMonth() is 0-based.
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const milliseconds = String(now.getMilliseconds()).padStart(3, '0');
    return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;
}

// Expose functions globally for access from HTML
window.startMainTracking = startMainTracking;
window.stopMainTracking = stopMainTracking;
window.downloadGazeDataCSV = downloadGazeDataCSV;
window.getFormattedCurrentTime = getFormattedCurrentTime;
