let points = 0;
let developers = 0;
let games = [];

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
    pointsPerDeveloper: 2,
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

// Load saved game data on page load
window.addEventListener("load", function() {
  loadGame();
});
