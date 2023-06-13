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

function exportSave() {
  const saveData = {
    points: points,
    developers: developers,
    games: games
  };

  const saveString = JSON.stringify(saveData);
  const blob = new Blob([saveString], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "gameSave.json";
  a.click();
  URL.revokeObjectURL(url);
}

function importSave() {
  const fileInput = document.getElementById("importSave");
  const file = fileInput.files[0];

  if (file) {
    const reader = new FileReader();
    reader.onload = function (event) {
      try {
        const saveData = JSON.parse(event.target.result);
        points = saveData.points;
        developers = saveData.developers;
        games = saveData.games;

        // Update the UI
        updatePoints();
        updateDevelopers();

        // Recreate game containers
        for (let i = 0; i < games.length; i++) {
          const game = games[i];

          const gameContainer = document.createElement("div");
          gameContainer.className = "game-container";
          gameContainer.innerHTML = `
            <h3>${game.name}</h3>
            <p>Points Generated: <span id="pointsGenerated_${i}">${game.pointsGenerated}</span></p>
          `;

          document.body.appendChild(gameContainer);
        }

        alert("Save imported successfully!");
      } catch (error) {
        console.error("Invalid save file.");
        alert("Invalid save file. Please select a valid game save file.");
      }
    };
    reader.readAsText(file);
  }
}

// Initialize the game
function initGame() {
  updatePoints();
  updateDevelopers();
}

initGame();
