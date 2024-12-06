document.addEventListener("DOMContentLoaded", function () {
    let isTracking = false;

    // Function to initialize WebGazer with a retry mechanism
    function initializeWebGazer() {
        if (typeof WebGazer === "undefined") {
            console.warn("WebGazer is not defined yet. Retrying...");
            setTimeout(initializeWebGazer, 100); // Retry every 100ms
            return;
        }

        console.log("Initializing WebGazer...");
        WebGazer.setRegression("ridge")
            .setTracker("clmtrackr")
            .begin()
            .showVideoPreview(false)
            .showFaceOverlay(false)
            .showFaceFeedbackBox(false);

        WebGazer.setGazeListener((data, timestamp) => {
            if (data) {
                updateGazeIndicator(data.x, data.y);
                checkAOI(data.x, data.y);
            }
        });

        console.log("WebGazer initialized.");
    }

    // Update gaze indicator on screen
    function updateGazeIndicator(x, y) {
        const indicator = document.getElementById("gazeIndicator");
        indicator.style.display = "block";
        indicator.style.left = `${x}px`;
        indicator.style.top = `${y}px`;
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
});
