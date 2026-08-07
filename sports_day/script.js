// Utility function to log to both Browser Console and UI Display Board
function logOutput(message, isHighlight = false) {
  console.log(message);
  const displayBoard = document.getElementById("display-board");
  const p = document.createElement("p");
  p.className = isHighlight ? "log-entry log-highlight" : "log-entry";
  p.innerText = message;
  displayBoard.appendChild(p);
  displayBoard.scrollTop = displayBoard.scrollHeight;
}

// ==========================================
// 1. OpeningCeremony Function
// ==========================================
function OpeningCeremony(callback) {
  const displayBoard = document.getElementById("display-board");
  displayBoard.innerHTML = ""; // Clear board

  logOutput("🏁 Opening Ceremony Started! Welcome to Sports Day.", true);
  
  let count = 0;
  const interval = setInterval(() => {
    count++;
    logOutput(`Initializing sports event... (${count}s)`);

    if (count === 3) {
      clearInterval(interval);
      // Initialize score object
      const score = { red: 0, blue: 0, green: 0, yellow: 0 };
      logOutput("--- Opening Ceremony Finished ---", true);
      logOutput(`Initial Scores: ${JSON.stringify(score)}`);
      
      // Start callback chain -> Pass score and next function (Race100M)
      callback(score, LongJump);
    }
  }, 1000);
}

// ==========================================
// 2. Race100M Function (3-Second Delay)
// ==========================================
function Race100M(score, callback) {
  logOutput("\n🏃 Event 1: 100m Race starting (3s delay)...", true);

  setTimeout(() => {
    // Generate random times between 10.0 and 15.0 seconds
    const times = {
      red: +(Math.random() * 5 + 10).toFixed(2),
      blue: +(Math.random() * 5 + 10).toFixed(2),
      green: +(Math.random() * 5 + 10).toFixed(2),
      yellow: +(Math.random() * 5 + 10).toFixed(2)
    };

    logOutput(`Race Times (sec): ${JSON.stringify(times)}`);

    // Sort colors by fastest time (lowest number)
    const sortedColors = Object.keys(times).sort((a, b) => times[a] - times[b]);

    // Allocate scores: 1st place = 50, 2nd place = 25
    score[sortedColors[0]] += 50;
    score[sortedColors[1]] += 25;

    logOutput(`1st Place: ${sortedColors[0]} (+50 pts)`);
    logOutput(`2nd Place: ${sortedColors[1]} (+25 pts)`);
    logOutput(`Updated Scores after 100m Race: ${JSON.stringify(score)}`);

    // Trigger next callback -> LongJump
    callback(score, HighJump);
  }, 3000);
}

// ==========================================
// 3. LongJump Function (2-Second Delay)
// ==========================================
function LongJump(score, callback) {
  logOutput("\n🦘 Event 2: Long Jump starting (2s delay)...", true);

  setTimeout(() => {
    const colors = ["red", "blue", "green", "yellow"];
    // Randomly select one color
    const selectedColor = colors[Math.floor(Math.random() * colors.length)];

    // Award 15 points
    score[selectedColor] += 15;

    logOutput(`Long Jump Winner: ${selectedColor} (+15 pts)`);
    logOutput(`Updated Scores after Long Jump: ${JSON.stringify(score)}`);

    // Trigger next callback -> HighJump
    callback(score, AwardCeremony);
  }, 2000);
}

// ==========================================
// 4. HighJump Function (User Input Prompt)
// ==========================================
function HighJump(score, callback) {
  logOutput("\n🚀 Event 3: High Jump starting...", true);

  // Small delay to allow previous UI logs to update before prompt
  setTimeout(() => {
    const userInput = prompt("Which color achieved the highest jump? (red, blue, green, yellow)");

    if (userInput && userInput.trim() !== "") {
      const color = userInput.trim().toLowerCase();

      if (score.hasOwnProperty(color)) {
        score[color] += 100;
        logOutput(`User chose '${color}'! (+100 pts awarded)`);
      } else {
        logOutput(`Invalid color '${userInput}'. No points awarded.`);
      }
    } else {
      logOutput("No input provided or cancelled. No points awarded.");
    }

    logOutput(`Updated Scores after High Jump: ${JSON.stringify(score)}`);

    // Trigger next callback -> AwardCeremony
    callback(score);
  }, 500);
}

// ==========================================
// 5. AwardCeremony Function
// ==========================================
function AwardCeremony(score) {
  logOutput("\n==========================================", true);
  logOutput("🏆 FINAL AWARD CEREMONY 🏆", true);
  logOutput("==========================================", true);

  // Sort colors by points descending
  const sorted = Object.keys(score).sort((a, b) => score[b] - score[a]);

  logOutput(`🥇 1st Place: ${sorted[0].toUpperCase()} (${score[sorted[0]]} pts)`, true);
  logOutput(`🥈 2nd Place: ${sorted[1].toUpperCase()} (${score[sorted[1]]} pts)`);
  logOutput(`🥉 3rd Place: ${sorted[2].toUpperCase()} (${score[sorted[2]]} pts)`);
  logOutput(`4th Place: ${sorted[3].toUpperCase()} (${score[sorted[3]]} pts)`);
  
  logOutput(`Final Scoreboard: ${JSON.stringify(score)}`, true);
}

// Event listener to trigger opening ceremony
document.getElementById("start-btn").addEventListener("click", () => {
  OpeningCeremony(Race100M);
});