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
};
