let points = 0;
let developers = 0;
let games = [];
let totalPlayers = 0;
let totalRevenue = 0;

function updatePoints() {
  document.getElementById("points").textContent = points;
}

function incrementPoints() {
  points++;
  updatePoints();
}

function updateDevelopers() {
  document.getElementById("developers").textContent = developers;
}

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

function createGame() {
  const gameName = document.getElementById("gameName").value;

  if (gameName.trim() === "") {
    alert("Please enter a game name!");
    return;
  }

  const game = {
    name: gameName,
    pointsPerDeveloper: 2,
    pointsGenerated: 0,
    players: 0,
    revenue: 0
  };

  games.push(game);
  document.getElementById("gameName").value = "";

  // Display the created game
  const gameContainer = document.createElement("div");
  gameContainer.className = "game-container";
  gameContainer.innerHTML = `
    <h3>${game.name}</h3>
    <p>Points Generated: <span id="pointsGenerated_${games.length - 1}">0</span></p>
    <p>Players: <span id="players_${games.length - 1}">0</span></p>
    <p>Revenue: $<span id="revenue_${games.length - 1}">0</span></p>
  `;

  document.body.appendChild(gameContainer);

  updateGameStats();
}

function updateGameStats() {
  const totalGames = games.length;
  let players = 0;
  let revenue = 0;

  for (let i = 0; i < games.length; i++) {
    players += games[i].players;
    revenue += games[i].revenue;
  }

  totalPlayers = players;
  totalRevenue = revenue;

  document.getElementById("totalGames").textContent = totalGames;
  document.getElementById("totalPlayers").textContent = totalPlayers;
  document.getElementById("totalRevenue").textContent = totalRevenue;
}

// Initialize the game
function initGame() {
  updatePoints();
  updateDevelopers();
  updateGameStats();
}

initGame();
