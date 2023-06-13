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
}

function generatePoints() {
  games.forEach((game, index) => {
    const pointsGenerated = game.pointsPerDeveloper * developers;
    game.pointsGenerated += pointsGenerated;

    const pointsGeneratedElement = document.getElementById(`pointsGenerated_${index}`);
    pointsGeneratedElement.textContent = game.pointsGenerated;
  });
}

function saveGame() {
  const saveData = {
    points: points,
    developers: developers,
    games: games
  };

  const saveString = JSON.stringify(saveData);
  localStorage.setItem("gameSave", saveString);

  alert("Game saved successfully!");
}

function loadGame() {
  const saveString = localStorage.getItem("gameSave");

  if (saveString) {
    try {
      const saveData = JSON.parse(saveString);

      points = saveData.points;
      developers = saveData.developers;
      games = saveData.games;

      updatePoints();
      updateDevelopers();
      updateGamePoints();

      alert("Game loaded successfully!");
    } catch (error) {
      alert("Invalid save data!");
    }
  } else {
    alert("No saved game found!");
  }
}

// Initialize the game
function initGame() {
  updatePoints();
  updateDevelopers();
  setInterval(generatePoints, 1000); // Call generatePoints() every second to earn points
}

initGame();
