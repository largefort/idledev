let points = 0;
let developers = 0;
let games = [];

const updatePoints = () => {
  document.getElementById("points").textContent = points;
};

const incrementPoints = () => {
  points++;
  updatePoints();
};

const updateDevelopers = () => {
  document.getElementById("developers").textContent = developers;
};

const hireDeveloper = () => {
  if (points >= 10) {
    points -= 10;
    developers++;
    updatePoints();
    updateDevelopers();
  } else {
    alert("Insufficient points to hire a developer!");
  }
};

const createGame = () => {
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

  const gameContainer = document.createElement("div");
  gameContainer.className = "game-container";
  gameContainer.innerHTML = `
    <h3>${game.name}</h3>
    <p>Points Generated: <span id="pointsGenerated_${games.length - 1}">0</span></p>
  `;

  document.body.appendChild(gameContainer);
};

const updateGamePoints = () => {
  games.forEach((game, index) => {
    const pointsGeneratedElement = document.getElementById(`pointsGenerated_${index}`);
    pointsGeneratedElement.textContent = game.pointsGenerated;
  });
};

const autosaveInterval = 5000; // Autosave every 5 seconds

const autosave = () => {
  const saveData = {
    points: points,
    developers: developers,
    games: games
  };

  localStorage.setItem("idleGameSave", JSON.stringify(saveData));
};

const loadGame = () => {
  const saveDataString = localStorage.getItem("idleGameSave");

  if (saveDataString) {
    const saveData = JSON.parse(saveDataString);

    points = saveData.points;
    developers = saveData.developers;
    games = saveData.games;

    updatePoints();
    updateDevelopers();
    updateGamePoints();
  }
};

// Load game data on page load
window.addEventListener("load", loadGame);

// Automatic points generation by developers every second
setInterval(() => {
  points += developers;

  games.forEach((game) => {
    game.pointsGenerated += game.pointsPerDeveloper * developers;
  });

  updatePoints();
  updateGamePoints();
}, 1000);

// Autosave timer
setInterval(autosave, autosaveInterval);
