document.addEventListener("DOMContentLoaded", function () {
    let aoiCanvas = document.getElementById("aoiCanvas");
    if (!aoiCanvas) {
        console.error("Canvas element with id 'aoiCanvas' not found");
        return;
    }

    let ctx = aoiCanvas.getContext("2d");
    if (!ctx) {
        console.error("Failed to get '2d' context from canvas");
        return;
    }

    let isDrawing = false;
    let startX = 0, startY = 0;
    let currentRect = {};
    let aois = [];

    // Disable text selection
    function disableTextSelection() {
        document.body.classList.add("disable-selection");
        document.addEventListener("selectstart", preventSelection);
        document.addEventListener("dragstart", preventSelection);
    }

    function enableTextSelection() {
        document.body.classList.remove("disable-selection");
        document.removeEventListener("selectstart", preventSelection);
        document.removeEventListener("dragstart", preventSelection);
    }

    function preventSelection(e) {
        e.preventDefault();
    }

    // Calculate scale factor
    function getScaleFactor() {
        const rect = aoiCanvas.getBoundingClientRect();
        return {
            scaleX: aoiCanvas.width / rect.width,
            scaleY: aoiCanvas.height / rect.height
        };
    }

    // Enable AOI selection mode
    window.enableAOISelection = function () {
        aoiCanvas.style.pointerEvents = 'auto';
        isDrawing = false;
        disableTextSelection();
        console.log("AOI selection enabled.");
    };

    // Start drawing rectangle on mousedown
    aoiCanvas.addEventListener("mousedown", (e) => {
        if (aoiCanvas.style.pointerEvents === 'none') return; // Ignore if canvas is disabled

        isDrawing = true;

        // Calculate starting coordinates with scale factor
        const scaleFactor = getScaleFactor();
        startX = (e.clientX - aoiCanvas.getBoundingClientRect().left) * scaleFactor.scaleX;
        startY = (e.clientY - aoiCanvas.getBoundingClientRect().top) * scaleFactor.scaleY;

        currentRect = {}; // Reset current rectangle
    });

    // Draw rectangle dynamically on mousemove
    aoiCanvas.addEventListener("mousemove", (e) => {
        if (!isDrawing) return;

        // Calculate current mouse position with scale factor
        const scaleFactor = getScaleFactor();
        let mouseX = (e.clientX - aoiCanvas.getBoundingClientRect().left) * scaleFactor.scaleX;
        let mouseY = (e.clientY - aoiCanvas.getBoundingClientRect().top) * scaleFactor.scaleY;

        // Update the rectangle based on the start and current mouse position
        currentRect = {
            x: startX,
            y: startY,
            width: mouseX - startX,
            height: mouseY - startY
        };
        drawCanvas();
        drawRectangle(currentRect);
    });

    // Finalize AOI on mouseup
    aoiCanvas.addEventListener("mouseup", () => {
        if (!isDrawing) return;

        isDrawing = false;
        aois.push(currentRect);
        currentRect = {};

        console.log("AOI recorded:", aois);  // Log recorded AOI data
        aoiCanvas.style.pointerEvents = 'none';  // Disable canvas interactions until re-enabled
        enableTextSelection(); // Re-enable text selection
    });

    // Draw all AOIs and current rectangle
    function drawCanvas() {
        ctx.clearRect(0, 0, aoiCanvas.width, aoiCanvas.height);
        aois.forEach(aoi => drawRectangle(aoi));
    }

    function drawRectangle(rect) {
        ctx.beginPath();
        ctx.rect(rect.x, rect.y, rect.width, rect.height);
        ctx.fillStyle = 'rgba(0, 255, 0, 0.3)';
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = 'green';
        ctx.stroke();
    }

    // Clear AOIs
    window.clearAOIs = function () {
        aois = [];
        drawCanvas();
    };

    // Save AOIs as JSON
    window.saveAOIs = function () {
        if (aois.length === 0) {
            alert("No AOIs defined.");
            return;
        }
        const aoiData = JSON.stringify(aois);
        const blob = new Blob([aoiData], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "aoi_config.json";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        console.log("AOIs saved as JSON.");
    };
});
