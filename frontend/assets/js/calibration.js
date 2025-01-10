document.addEventListener("DOMContentLoaded", function () {
  console.log("Calibration JS loaded.");

  // Positions for the 8 initial dots (corners/edges)
  const dotPositions = [
    { x: 10, y: 10 },
    { x: 50, y: 10 },
    { x: 90, y: 10 },
    { x: 10, y: 50 },
    { x: 90, y: 50 },
    { x: 10, y: 90 },
    { x: 50, y: 90 },
    { x: 90, y: 90 },
  ];

  // Position for the center dot (spawned after the first 8 are done)
  const middleDot = { x: 50, y: 50 };

  // Number of initial dots & total
  const NUMBER_OF_INITIAL_DOTS = 8;
  const TOTAL_DOTS = 9; // 8 corners + 1 center

  // Colors for each click count (1..5)
  const colorClasses = ["dot-red1", "dot-red2", "dot-red3", "dot-red4", "dot-yellow"];

  // State variables
  let clickCounts   = [];
  let completedDots = 0;
  let isCalibrating = false;
  let isMiddleSpawned = false; // Whether we've created the center dot yet

  // The container <div> where dots go
  const dotsContainer = document.getElementById("calibration-dots");

  // Expose a global so you can call startCalibration() from your main page
  window.startCalibration = function () {
    if (isCalibrating) {
      console.warn("Already in calibration mode!");
      return;
    }
    isCalibrating = true;
    console.log("Starting calibration...");

    // Clear any old dots
    dotsContainer.innerHTML = "";

    // Reset trackers
    clickCounts   = new Array(TOTAL_DOTS).fill(0);
    completedDots = 0;
    isMiddleSpawned = false;

    // Create the 8 initial dots
    for (let i = 0; i < NUMBER_OF_INITIAL_DOTS; i++) {
      createDot(i, dotPositions[i]);
    }
  };

  /**
   * Creates a dot element at the given position object { x, y }
   * dotIndex -> index for click tracking (0..7 for corners, 8 for center)
   */
  function createDot(dotIndex, position) {
    const dotEl = document.createElement("div");
    dotEl.classList.add("dot", "dot-red1"); // Start with the lightest red

    // Position based on percentages
    dotEl.style.left = position.x + "%";
    dotEl.style.top  = position.y + "%";

    // Handle clicks
    dotEl.addEventListener("click", () => onDotClicked(dotIndex, dotEl));
    dotsContainer.appendChild(dotEl);
  }

  /**
   * Handles clicks on a given dot
   */
  function onDotClicked(dotIndex, dotEl) {
    // Already final color (yellow)? Ignore further clicks
    if (clickCounts[dotIndex] >= 5) return;

    // Increment click count
    clickCounts[dotIndex]++;

    // Pick the new color (based on 1..5)
    const newColorClass = colorClasses[ clickCounts[dotIndex] - 1 ];

    // Remove old color classes, add the new one
    dotEl.classList.remove(...colorClasses);
    dotEl.classList.add(newColorClass);

    // If we just reached 5 clicks => turned yellow
    if (clickCounts[dotIndex] === 5) {
      completedDots++;

      // If the 8 corners are done, spawn center dot (if not already spawned)
      if (completedDots === NUMBER_OF_INITIAL_DOTS && !isMiddleSpawned) {
        spawnMiddleDot();
      }

      // If all 9 are done, show the popup
      if (completedDots === TOTAL_DOTS) {
        isCalibrating = false;
        console.log("All dots complete! (All are yellow)");
        showCalibrationScore();
      }
    }
  }

  /**
   * Spawns the center (9th) dot at (50%, 50%), also requires 5 clicks.
   */
  function spawnMiddleDot() {
    isMiddleSpawned = true;
    // We'll treat it as index 8
    createDot(8, middleDot);

    // (Optional) Show a message: "Now click the center dot 5 times."
    showLookCenterMessage();
  }

  /**
   * Show a message instructing the user to click the center dot.
   * This is optional—remove if you don't want it.
   */
  function showLookCenterMessage() {
    const msg = document.createElement("div");
    msg.id = "centerDotMessage";
    msg.textContent = "Please click the center dot 5 times to finish calibrating.";

    // Style & position
    msg.style.position = "fixed";
    msg.style.top = "40%";
    msg.style.left = "50%";
    msg.style.transform = "translate(-50%, -50%)";
    msg.style.backgroundColor = "#eee";
    msg.style.padding = "20px";
    msg.style.zIndex = "9999";
    
    document.body.appendChild(msg);

    // Remove the message once user finishes the center dot
    // We'll remove it inside onDotClicked() once the dot is completed.
    // Or optionally, remove it after 1 second or 2 seconds, etc.
    // But if you want to remove it automatically after the center dot is done:
    // we can do that check in onDotClicked() for the center dot (index === 8).
  }

  /**
   * Displays the calibration score popup
   */
  function showCalibrationScore() {
    // Remove "centerDotMessage" if it's still around
    const msg = document.getElementById("centerDotMessage");
    if (msg) {
      msg.remove();
    }

    const popup = document.getElementById('calibration-score-popup');
    if (popup) {
      popup.style.display = 'block';
    }
    // If you have a semi-transparent overlay
    const overlay = document.getElementById('calibration-modal-overlay');
    if (overlay) {
      overlay.style.display = 'block';
    }
  }

  // If you have "Retry" & "Proceed" buttons in your popup
  const retryBtn   = document.getElementById("retry-button");
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
      // Possibly navigate away or call another function
    });
  }
});
