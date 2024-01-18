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
    saveData();
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
    pointsGenerated: 0
  };

  games.push(game);
  document.getElementById("gameName").value = "";

  // Display the created game
  const gameContainer = document.createElement("div");
  gameContainer.className = "game-container";
  gameContainer.innerHTML = `
    <h3>${game.name}</h3>
    <p>Points Generated: <span id="pointsGenerated_${games.length - 1}">0</span></p>
  `;

  document.body.appendChild(gameContainer);

  saveData();
}

function updateGamePoints() {
  games.forEach((game, index) => {
    const pointsGeneratedElement = document.getElementById(`pointsGenerated_${index}`);
    pointsGeneratedElement.textContent = game.pointsGenerated;
  });
}

function saveData() {
  const saveData = {
    points: points,
    developers: developers,
    games: games
  };

  localStorage.setItem("idleGameSave", JSON.stringify(saveData));
}

function loadData() {
  const saveData = localStorage.getItem("idleGameSave");

  if (saveData) {
    const save = JSON.parse(saveData);

    points = save.points;
    developers = save.developers;
    games = save.games;

    updatePoints();
    updateDevelopers();
    updateGamePoints();
  }
}

// Automatic points generation by developers every second
setInterval(function() {
  points += developers;

  games.forEach((game) => {
    game.pointsGenerated += game.pointsPerDeveloper * developers;
  });

  updatePoints();
  updateGamePoints();
}, 1000);

// Load the saved data on page load
loadData();
