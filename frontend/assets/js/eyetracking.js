async function startTracking() {
    console.log('Start Tracking function triggered');
    if (typeof webgazer === 'undefined') {
        console.error('WebGazer is not loaded.');
        return;
    }
    try {
        let isCapturing = false; // Variable to track if gaze coordinates are being captured

        await webgazer.setGazeListener((data, elapsedTime) => {
            if (data) {
                if (!isCapturing) {
                    console.log('Gaze coordinate collection is active and working.');
                    isCapturing = true; // Update the flag to avoid repetitive logging
                }
                // Optional: You can still use these variables internally if needed
                const xprediction = data.x;
                const yprediction = data.y;
                // Use the coordinates elsewhere without console logging
            }
        }).begin();

        console.log('WebGazer initialized and tracking started.');
        webgazer.showVideoPreview(true);
        webgazer.showPredictionPoints(true);
    } catch (err) {
        console.error('Error initializing WebGazer:', err);
    }
}

function stopTracking() {
    webgazer.end();
    webgazer.showVideoPreview(false);
    webgazer.showPredictionPoints(false);
}

function calibrate() {
    const calibrationDiv = document.getElementById('calibration-div');
    calibrationDiv.innerHTML = ''; // Clear existing points

    const points = [
        { x: 10, y: 10 },
        { x: 90, y: 10 },
        { x: 10, y: 90 },
        { x: 90, y: 90 },
        { x: 50, y: 50 }
    ];

    points.forEach((point) => {
        const pointElement = document.createElement('div');
        pointElement.style.position = 'absolute';
        pointElement.style.left = `${point.x}%`;
        pointElement.style.top = `${point.y}%`;
        pointElement.style.width = '20px';
        pointElement.style.height = '20px';
        pointElement.style.backgroundColor = 'red';
        pointElement.style.borderRadius = '50%';
        pointElement.style.cursor = 'pointer';
        pointElement.onclick = function () {
            webgazer.recordScreenPosition(point.x / 100 * window.innerWidth, point.y / 100 * window.innerHeight);
            pointElement.style.backgroundColor = 'green';
            console.log(`Calibration point clicked at: x=${point.x}, y=${point.y}`);
        };
        calibrationDiv.appendChild(pointElement);
    });
}

window.onload = function () {
    console.log('WebGazer.js loaded.');
    if (typeof webgazer !== 'undefined') {
        startTracking();
        calibrate();
    } else {
        console.error('WebGazer not loaded properly.');
    }

    // Check if gaze is within AOI
    function checkAOI(x, y) {
        if (!window.loadedAOIs) return;
        window.loadedAOIs.forEach((aoi, index) => {
            if (
                x >= aoi.x &&
                x <= aoi.x + aoi.width &&
                y >= aoi.y &&
                y <= aoi.y + aoi.height
            ) {
                console.log(`Gaze is within AOI ${index + 1}`);
            }
        });
    }

    // Start tracking gaze data
    window.startTracking = function () {
        if (isTracking) return;
        isTracking = true;
        console.log("Started tracking gaze data.");
    };

    // Stop tracking gaze data
    window.stopTracking = function () {
        if (!isTracking) return;
        isTracking = false;
        console.log("Stopped tracking gaze data.");
    };

    // Load AOI data
    window.loadAOIs = function (aoiFilePath) {
        fetch(aoiFilePath)
            .then((response) => response.json())
            .then((data) => {
                window.loadedAOIs = data;
                console.log("Loaded AOI data:", window.loadedAOIs);
            })
            .catch((err) => console.error("Error loading AOI data:", err));
    };

    // Save gaze data to JSON file
    window.saveGazeData = function (gazeData) {
        const blob = new Blob([JSON.stringify(gazeData)], { type: "application/json" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "gaze_data.json";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        console.log("Gaze data saved to file.");
    };

    // Attempt to initialize WebGazer
    initializeWebGazer();
};
