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
    players: 0,
    revenue: 0
  };

  games.push(game);
  document.getElementById("gameName").value = "";

  updateGameStats();
  displayGames();
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

function incrementGameRevenue(index) {
  const game = games[index];
  const pointsPerPlayer = 10;
  const players = game.players;

  const revenue = players * pointsPerPlayer;
  game.revenue += revenue;

  updateGameStats();
  displayGames();
}

function addPlayer(index) {
  const game = games[index];
  game.players++;

  updateGameStats();
  displayGames();
}

function displayGames() {
  const gameList = document.getElementById("gameList");
  gameList.innerHTML = "";

  for (let i = 0; i < games.length; i++) {
    const game = games[i];

    const gameItem = document.createElement("div");
    gameItem.className = "game-item";
    gameItem.innerHTML = `
      <h3>${game.name}</h3>
      <p>Players: ${game.players}</p>
      <p>Revenue: $${game.revenue}</p>
      <button onclick="addPlayer(${i})">Add Player</button>
      <button onclick="incrementGameRevenue(${i})">Increment Revenue</button>
    `;

    gameList.appendChild(gameItem);
  }
}

// Initialize the game
function initGame() {
  updatePoints();
  updateDevelopers();
  updateGameStats();
  displayGames();
}

initGame();
