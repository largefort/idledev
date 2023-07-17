let points = 0;
let developers = 0;
let games = [];
let isHDMode = false; // Variable to track HD Mode

// Elements
const pointsElement = document.getElementById("points");
const developersElement = document.getElementById("developers");
const gameListElement = document.getElementById("gameList");

// Update Points
function updatePoints() {
  pointsElement.textContent = points;
}

// Increment Points
function incrementPoints() {
  points++;
  updatePoints();
}

// Update Developers
function updateDevelopers() {
  developersElement.textContent = developers;
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
    gameItem.textContent = `${game.name} (Points Generated: ${game.pointsGenerated})`;

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

// Autosave every 5 seconds
setInterval(function() {
  saveGame();
}, 5000);

// Save game data
function saveGame() {
  const saveData = {
    points: points,
    developers: developers,
    games: games
  };

  localStorage.setItem("idleGameSave", JSON.stringify(saveData));
}

// Load saved game data
function loadGame() {
  const saveData = localStorage.getItem("idleGameSave");

  if (saveData) {
    const data = JSON.parse(saveData);
    points = data.points;
    developers = data.developers;
    games = data.games;

    updatePoints();
    updateDevelopers();
    updateGameList();
  }
}
// ...

// Toggle HD Mode
function toggleHDMode() {
  isHDMode = !isHDMode; // Toggle the HD Mode

  // Adjust button text based on the current mode
  const toggleButton = document.getElementById("hdModeToggle");
  toggleButton.textContent = isHDMode ? "Switch to Low Res" : "Switch to HD";

  // Adjust pointsPerDeveloper for existing games based on the current mode
  games.forEach((game) => {
    game.pointsPerDeveloper = isHDMode ? 5 : 2;
  });

  // Update the body class based on the current mode
  const bodyElement = document.body;
  bodyElement.classList.remove("hd-resolution", "low-resolution");
  bodyElement.classList.add(isHDMode ? "hd-resolution" : "low-resolution");
}

// ...


// Load saved game data on page load
window.addEventListener("load", function() {
  loadGame();
});
