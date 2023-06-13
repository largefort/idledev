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

function updateGamePoints() {
  games.forEach((game, index) => {
    const pointsGeneratedElement = document.getElementById(`pointsGenerated_${index}`);
    pointsGeneratedElement.textContent = game.pointsGenerated;
  });
}

function exportSave() {
  const saveData = {
    points: points,
    developers: developers,
    games: games
  };

  const saveString = JSON.stringify(saveData);
  document.getElementById("saveData").value = saveString;
}

function importSave() {
  const saveString = document.getElementById("saveData").value;
  
  try {
    const saveData = JSON.parse(saveString);
    
    points = saveData.points;
    developers = saveData.developers;
    games = saveData.games;
    
    updatePoints();
    updateDevelopers();
    updateGamePoints();
    
    alert("Save imported successfully!");
  } catch (error) {
    alert("Invalid save data!");
  }
}
