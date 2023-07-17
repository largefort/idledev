let points = 0;
let developers = 0;
let games = [];
let isHDMode = false; // Variable to track HD Mode
let pointsPerSecond = 0;

// Elements
const pointsElement = document.getElementById("points");
const developersElement = document.getElementById("developers");
const gameListElement = document.getElementById("gameList");

// Update Points
function updatePoints() {
  pointsElement.textContent = formatPoints(points);
  pointsPerSecond = calculatePointsPerSecond();
  document.getElementById("pointsPerSecond").textContent = formatPoints(pointsPerSecond);
}

// Format Points
function formatPoints(value) {
  return value >= 1e6 ? (value / 1e6).toFixed(1) + 'M' : value;
}

// Increment Points
function incrementPoints() {
  points++;
  updatePoints();
  pointsPerSecond = calculatePointsPerSecond();
  document.getElementById("pointsPerSecond").textContent = formatPoints(pointsPerSecond);
}

// Update Developers
function updateDevelopers() {
  developersElement.textContent = formatPoints(developers);
  pointsPerSecond = calculatePointsPerSecond();
  document.getElementById("pointsPerSecond").textContent = formatPoints(pointsPerSecond);
}

// Hire Developer
function hireDeveloper() {
  if (points >= 10) {
    points -= 10;
    developers++;
    updatePoints();
    updateDevelopers();
  } else {
    alert("Insufficient points to hire a developer!");
  }
}

// Create Game
function createGame() {
  const gameName = document.getElementById("gameName").value.trim();
  
  if (gameName === "") {
    alert("Please enter a game name!");
    return;
  }
  
  const game = {
    name: gameName,
    pointsPerDeveloper: isHDMode ? 5 : 2, // Adjust pointsPerDeveloper based on HD Mode
    pointsGenerated: 0
  };
  
  games.push(game);
  document.getElementById("gameName").value = "";

  updateGameList();
}

// Update Game List
function updateGameList() {
  gameListElement.innerHTML = "";

  games.forEach((game, index) => {
    const gameItem = document.createElement("li");
    gameItem.textContent = `${game.name} (Points Generated: ${formatPoints(game.pointsGenerated)})`;

    gameListElement.appendChild(gameItem);
  });
}

// Automatic points generation by developers every second
setInterval(function() {
  points += developers;
  
  games.forEach((game) => {
    game.pointsGenerated += game.pointsPerDeveloper * developers;
  });
  
  updatePoints();
  updateGameList();
}, 1000);

// ...

// Calculate Points per Second
function calculatePointsPerSecond() {
  return developers;
}

// ...

// Load saved game data on page load
window.addEventListener("load", function() {
  loadGame();
});
