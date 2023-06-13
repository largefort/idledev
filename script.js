let points = 0;
let developers = 0;
let games = [];

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
    players: 0
  };

  games.push(game);
  document.getElementById("gameName").value = "";

  displayGames();
}

function addPlayer(index) {
  const game = games[index];
  game.players++;

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
      <button onclick="addPlayer(${i})">Add Player</button>
    `;

    gameList.appendChild(gameItem);
  }
}

function startEarning() {
  setInterval(function() {
    const pointsPerDeveloper = 1;
    const pointsPerGame = 10;

    const developerPoints = developers * pointsPerDeveloper;
    const gamePoints = games.length * pointsPerGame;

    points += developerPoints + gamePoints;
    updatePoints();
  }, 1000);
}

// Initialize the game
function initGame() {
  updatePoints();
  updateDevelopers();
  displayGames();
  startEarning();
}

initGame();
