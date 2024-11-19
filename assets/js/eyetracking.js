document.addEventListener("DOMContentLoaded", function () {
    let isTracking = false;

    // Start WebGazer
    function initializeWebGazer() {
        console.log("Initializing WebGazer...");
        WebGazer.setRegression("ridge")
            .setTracker("clmtrackr")
            .begin()
            .showVideo(false)
            .showFaceOverlay(false)
            .showFaceFeedbackBox(false)
            .onPrediction(handlePrediction);

        console.log("WebGazer initialized.");
    }

    // Handle gaze data
    function handlePrediction(data, timestamp) {
        if (!data || !isTracking) return;

        const gazeX = data.x;
        const gazeY = data.y;

        console.log(`Gaze Point: X=${gazeX}, Y=${gazeY}`);

        // Optionally check AOI here
        if (window.loadedAOIs) {
            checkAOI(gazeX, gazeY);
        }
    }

    // Check if gaze is within AOI
    function checkAOI(x, y) {
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

    // Start tracking
    window.startTracking = function () {
        if (isTracking) return;
        isTracking = true;
        console.log("Started tracking gaze data.");
    };

    // Stop tracking
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

    // Save gaze data to a JSON file
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

    // Initialize WebGazer
    initializeWebGazer();
});
