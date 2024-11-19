document.addEventListener("DOMContentLoaded", function () {
    let calibrationPoints = [];
    let isCalibrating = false;

    // Calibration settings
    const calibrationSettings = {
        numberOfPoints: 9, // Number of calibration points (e.g., a 3x3 grid)
        pointSize: 20,     // Size of calibration points in pixels
        duration: 2000     // Time to show each point in milliseconds
    };

    // Start calibration
    window.startCalibration = function () {
        if (isCalibrating) {
            console.warn("Calibration is already in progress.");
            return;
        }

        isCalibrating = true;
        console.log("Starting calibration...");
        displayCalibrationPoints();
    };

    // Display calibration points
    function displayCalibrationPoints() {
        const container = document.getElementById("calibration-container");
        if (!container) {
            console.error("Calibration container not found!");
            return;
        }

        container.innerHTML = ""; // Clear existing points
        calibrationPoints = generateGridPoints(calibrationSettings.numberOfPoints);

        calibrationPoints.forEach((point, index) => {
            const pointElement = document.createElement("div");
            pointElement.className = "calibration-point";
            pointElement.style.left = `${point.x}%`;
            pointElement.style.top = `${point.y}%`;
            pointElement.style.width = `${calibrationSettings.pointSize}px`;
            pointElement.style.height = `${calibrationSettings.pointSize}px`;

            container.appendChild(pointElement);

            setTimeout(() => {
                pointElement.classList.add("active");
                captureGazeData(index, pointElement);
            }, index * calibrationSettings.duration);
        });
    }

    // Capture gaze data during calibration
    function captureGazeData(index, pointElement) {
        setTimeout(() => {
            console.log(`Capturing data for point ${index + 1}`);
            // Example: Capture gaze data here using WebGazer.js
            // const gazeData = WebGazer.getCurrentPrediction();

            pointElement.classList.remove("active");
            if (index === calibrationPoints.length - 1) {
                console.log("Calibration complete.");
                isCalibrating = false;
            }
        }, calibrationSettings.duration);
    }

    // Generate calibration grid points
    function generateGridPoints(numPoints) {
        const gridSize = Math.sqrt(numPoints);
        const points = [];
        for (let row = 0; row < gridSize; row++) {
            for (let col = 0; col < gridSize; col++) {
                points.push({
                    x: (col + 0.5) * (100 / gridSize),
                    y: (row + 0.5) * (100 / gridSize)
                });
            }
        }
        return points;
    }
});
