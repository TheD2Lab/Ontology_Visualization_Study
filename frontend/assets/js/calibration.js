document.addEventListener("DOMContentLoaded", function () {
  console.log("Calibration JS loaded.");

  // Define the positions for the calibration dots
  const dotPositions = [
    { x: 10, y: 10 }, // (1, 1)
    { x: 50, y: 10 }, // (1, 2)
    { x: 90, y: 10 }, // (1, 3)
    { x: 90, y: 50 }, // (2, 3)
    { x: 90, y: 90 }, // (3, 3)
    { x: 50, y: 90 }, // (3, 2)
    { x: 10, y: 90 }, // (3, 1)
    { x: 10, y: 50 }, // (2, 1)
    { x: 50, y: 50 }, // (2, 2) - Center
  ];

  // Total number of dots (8 corners/edges + 1 center)
  const TOTAL_DOTS = dotPositions.length;

  // Colors for each click count (1..5)
  const colorClasses = ["dot-red1", "dot-red2", "dot-red3", "dot-red4", "dot-yellow"];

  // State variables
  let clickCounts = [];
  let currentDotIndex = 0;
  let isCalibrating = false;

  // The container <div> where dots appear
  const dotsContainer = document.getElementById("calibration-dots");

  /**
   * Starts the calibration process.
   * Initializes click counts, resets the current dot index, clears existing dots,
   * and creates the first calibration dot.
   */
  window.startCalibration = function () {
    if (isCalibrating) {
      console.warn("Already in calibration mode!");
    }
    isCalibrating = true;
    console.log("Starting calibration...");

    // Initialize click counts for all dots
    clickCounts = new Array(TOTAL_DOTS).fill(0);
    currentDotIndex = 0;

    // Clear any existing dots
    dotsContainer.innerHTML = "";

    // Start with the first dot
    createDot(currentDotIndex);
  };

  /**
   * Creates a calibration dot at the specified index.
   * @param {number} dotIndex - The index of the dot in the dotPositions array.
   */
  function createDot(dotIndex) {
    if (dotIndex >= TOTAL_DOTS) {
      console.warn("All calibration dots have been processed.");
      return;
    }

    const position = dotPositions[dotIndex];
    const dotEl = document.createElement("div");
    dotEl.classList.add("dot", "dot-red1"); // Start with the lightest red

    // Position the dot based on percentage values
    dotEl.style.left = position.x + "%";
    dotEl.style.top = position.y + "%";

    // Attach click event listener
    dotEl.addEventListener("click", () => onDotClicked(dotIndex, dotEl));
    dotsContainer.appendChild(dotEl);
  }

  /**
   * Handles the click event on a calibration dot.
   * @param {number} dotIndex - The index of the clicked dot.
   * @param {HTMLElement} dotEl - The dot element that was clicked.
   */
  function onDotClicked(dotIndex, dotEl) {
    // Increment the click count for this dot
    clickCounts[dotIndex]++;
    const newColorClass = colorClasses[clickCounts[dotIndex] - 1];

    // Update the dot's color based on the number of clicks
    dotEl.classList.remove(...colorClasses);
    dotEl.classList.add(newColorClass);

    // If the dot has been clicked five times, proceed accordingly
    if (clickCounts[dotIndex] === 5) {
      if (dotIndex < TOTAL_DOTS - 1) {
        // For the first 8 dots, remove the dot and create the next one
        dotEl.remove(); // Remove the completed dot
        currentDotIndex++; // Move to the next dot

        if (currentDotIndex < TOTAL_DOTS) {
          createDot(currentDotIndex); // Create the next dot
        }
      } else {
        // For the last dot (center), do not remove it
        console.log("Center dot clicked five times. Starting 5-second stare period.");

        // Start the 5-second stare period silently
        initiateStarePeriod();
      }
    }
  }

  /**
   * Initiates a 5-second stare period for the center dot.
   * During this period, gaze data is collected to assess calibration accuracy.
   */
  function initiateStarePeriod() {
    // Start storing gaze points
    store_points_variable();

    // Start the 5-second timer without displaying any messages or alerts
    setTimeout(() => {
      // Stop storing gaze points and calculate accuracy
      stop_storing_points_variable();
      let pastPoints = webgazer.getStoredPoints();
      let accuracy = calculatePrecision(pastPoints);
      console.log("Calibration accuracy:", accuracy, "%");

      // Display the calibration accuracy in the popup
      const popup = document.getElementById("calibration-score-popup");
      if (popup) {
        popup.style.display = "block";
      }
      document.getElementById("calibration-score-percentage").textContent = accuracy.toString();
    }, 5000); // 5000 milliseconds = 5 seconds
  }

  // Attach event listeners to Retry and Proceed buttons in the calibration popup
  const retryBtn = document.getElementById("retry-button");
  const proceedBtn = document.getElementById("proceed-button");

  if (retryBtn) {
    retryBtn.addEventListener("click", () => {
      document.getElementById("calibration-score-popup").style.display = "none";
      console.log("Retrying calibration...");
      window.startCalibration();
    });
  }

  if (proceedBtn) {
    proceedBtn.addEventListener("click", () => {
      document.getElementById("calibration-score-popup").style.display = "none";
      console.log("Proceeding after calibration...");
      // Add any additional navigation or function calls here
    });
  }

  /**
   * Enables storing of gaze points.
   */
  function store_points_variable(){
    if (webgazer && webgazer.params) {
      webgazer.params.storingPoints = true;
      console.log("Gaze points storage enabled.");
    } else {
      console.warn("WebGazer is not initialized properly.");
    }
  }

  /**
   * Disables storing of gaze points.
   */
  function stop_storing_points_variable(){
    if (webgazer && webgazer.params) {
      webgazer.params.storingPoints = false;
      console.log("Gaze points storage disabled.");
    } else {
      console.warn("WebGazer is not initialized properly.");
    }
  }

  /**
   * Calculates the precision of the calibration based on gaze points.
   * @param {Array} pastPoints - The stored gaze points.
   * @returns {number} - The average precision percentage.
   */
  function calculatePrecision(pastPoints) {
    if (!pastPoints || pastPoints.length === 0) {
      console.warn("No gaze points available for precision calculation.");
      return 0;
    }

    let windowHeight = window.innerHeight;
    let windowWidth  = window.innerWidth;

    let xArr = pastPoints[0];
    let yArr = pastPoints[1];

    let centerX = windowWidth / 2;
    let centerY = windowHeight / 2;

    let precisionValues = [];
    for(let i = 0; i < xArr.length; i++){
      let dx = centerX - xArr[i];
      let dy = centerY - yArr[i];
      let dist = Math.sqrt(dx*dx + dy*dy);

      let halfH = windowHeight / 2;
      let p = 0;
      if(dist <= halfH){
        // Linearly scale to 100%
        p = 100 - (dist / halfH) * 100;
      }
      precisionValues.push(p);
    }

    // Calculate the average precision
    let sum = precisionValues.reduce((a, b) => a + b, 0);
    let avg = sum / precisionValues.length || 0;
    return Math.round(avg);
  }

});
