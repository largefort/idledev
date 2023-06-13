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
  const gameName = document.getElementById("gameName").value;

  if (gameName.trim() === "") {
    alert("Please enter a game name!");
    return;
  }

  const game = {
    name: gameName,
    pointsPerDeveloper: 2,
    pointsGenerated: 0,
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

const exportSave = () => {
  const saveData = {
    points,
    developers,
    games,
  };

  const saveString = JSON.stringify(saveData);
  const encodedSave = btoa(saveString);
  const exportData = `IdleGameSaveData:${encodedSave}`;

  const saveElement = document.createElement("a");
  saveElement.href = "data:text/plain;charset=utf-8," + encodeURIComponent(exportData);
  saveElement.download = "idle_game_save.txt";
  saveElement.click();
};

const importSave = () => {
  const fileInput = document.getElementById("importSaveInput");
  const file = fileInput.files[0];

  if (!file) {
    alert("No file selected!");
    return;
  }

  const reader = new FileReader();

  reader.onload = (event) => {
    const importData = event.target.result;

    if (!importData.startsWith("IdleGameSaveData:")) {
      alert("Invalid save data!");
      return;
    }

    const encodedSave = importData.replace("IdleGameSaveData:", "");
    const saveString = atob(encodedSave);
    const saveData = JSON.parse(saveString);

    points = saveData.points;
    developers = saveData.developers;
    games = saveData.games;

    updatePoints();
    updateDevelopers();
    updateGamePoints();

    fileInput.value = ""; // Reset the file input
  };

  reader.readAsText(file, "UTF-8");
};

setInterval(() => {
  points += developers;

  games.forEach((game) => {
    game.pointsGenerated += game.pointsPerDeveloper * developers;
  });

  updatePoints();
  updateGamePoints();
}, 1000);
