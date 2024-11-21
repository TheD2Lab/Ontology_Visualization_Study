document.addEventListener("DOMContentLoaded", function () {
    let calibrationPoints = [];
    let currentPointIndex = 0;
    let isCalibrating = false;

    // Calibration settings
    const calibrationSettings = {
        numberOfPoints: 9, // Number of calibration points (e.g., a 3x3 grid)
        pointSize: 20,     // Size of calibration points in pixels
    };

    // Start calibration
    window.startCalibration = function () {
        if (isCalibrating) {
            console.warn("Calibration is already in progress.");
            return;
        }

        isCalibrating = true;
        console.log("Starting calibration...");
        generateGridPoints(calibrationSettings.numberOfPoints);
        displayNextCalibrationPoint();
    };

    // Generate calibration grid points
    function generateGridPoints(numPoints) {
        const gridSize = Math.sqrt(numPoints);
        calibrationPoints = [];
        for (let row = 0; row < gridSize; row++) {
            for (let col = 0; col < gridSize; col++) {
                calibrationPoints.push({
                    x: (col + 0.5) * (100 / gridSize),
                    y: (row + 0.5) * (100 / gridSize),
                });
            }
        }
    }

    // Display the next calibration point
    function displayNextCalibrationPoint() {
        const container = document.getElementById("calibration-container");
        if (!container) {
            console.error("Calibration container not found!");
            return;
        }

        container.innerHTML = ""; // Clear existing points

        if (currentPointIndex >= calibrationPoints.length) {
            console.log("Calibration complete.");
            isCalibrating = false;
            container.innerHTML = "<h3>Calibration Complete!</h3>";
            transitionToAOISelection();
            return;
        }

        const point = calibrationPoints[currentPointIndex];
        const pointElement = document.createElement("div");
        pointElement.className = "calibration-point";
        pointElement.style.left = `${point.x}%`;
        pointElement.style.top = `${point.y}%`;
        pointElement.style.width = `${calibrationSettings.pointSize}px`;
        pointElement.style.height = `${calibrationSettings.pointSize}px`;

        container.appendChild(pointElement);

        pointElement.addEventListener("click", () => {
            console.log(`Point ${currentPointIndex + 1} captured`);
            currentPointIndex++;
            displayNextCalibrationPoint();
        });
    }

    // Transition to AOI selection
    function transitionToAOISelection() {
        document.getElementById("calibration-container").style.display = "none";
        document.getElementById("aoi-selection-container").style.display = "block";
        console.log("Switched to AOI selection.");
    }
});
