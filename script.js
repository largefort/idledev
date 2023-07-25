// Game variables
let money = 0;
let gameIdeas = 0;
let isCreatingGame = false;
let gameIncome = 0;

// Building data
const buildings = [
  { name: "Small Office", cost: 100, income: 10 },
  { name: "Game Studio", cost: 500, income: 50 },
  { name: "Indie Studio", cost: 1000, income: 100 },
  { name: "AAA Studio", cost: 5000, income: 500 },
  { name: "Game Publisher", cost: 10000, income: 1000 },
  { name: "Gaming Convention", cost: 50000, income: 5000 },
  { name: "Esports Arena", cost: 100000, income: 10000 },
  // Add more buildings here
];

// Create building elements
function createBuildings() {
  const buildingContainer = document.getElementById("building-container");
  buildingContainer.innerHTML = "";

  buildings.forEach((building, index) => {
    const buildingElem = document.createElement("div");
    buildingElem.classList.add("building");
    buildingElem.innerHTML = `
      <p>${building.name}</p>
      <p>Cost: $${building.cost}</p>
      <p>Income: $${building.income}/s</p>
      <button onclick="buyBuilding(${index})">Buy</button>
    `;
    buildingContainer.appendChild(buildingElem);
  });
}

// Buy a building
function buyBuilding(index) {
  const building = buildings[index];
  if (money >= building.cost) {
    money -= building.cost;
    gameIncome += building.income;
    updateMoney();
  }
}

// Create a new game
function createGame() {
  if (gameIdeas >= 10) {
    gameIdeas -= 10;
    isCreatingGame = true;
    document.getElementById("game-creation-container").style.display = "block";
    document.getElementById("create-game-btn").disabled = true;
    updateGameIdeas();
  }
}

// Confirm game creation
function confirmGameCreation() {
  const gameName = document.getElementById("game-name-input").value;
  if (gameName.trim() !== "") {
    // Create a new game with the given name and add income based on the game's success
    // You can implement this part on your own.
    // ...

    // Hide game creation UI
    isCreatingGame = false;
    document.getElementById("game-creation-container").style.display = "none";
    document.getElementById("create-game-btn").disabled = false;
  }
}

// Cancel game creation
function cancelGameCreation() {
  isCreatingGame = false;
  document.getElementById("game-creation-container").style.display = "none";
  document.getElementById("create-game-btn").disabled = false;
}

// Generate money based on game success
function generateMoney() {
  money += gameIncome;
  updateMoney();
}

// Update money display
function updateMoney() {
  document.getElementById("money").textContent = money;
}

// Update game ideas display
function updateGameIdeas() {
  document.getElementById("game-ideas").textContent = gameIdeas;
}

// Save game data to Local Storage
function saveGame() {
  const gameData = {
    money,
    gameIdeas,
    isCreatingGame,
    gameIncome
    // Add other data that you want to save
  };
  localStorage.setItem("gameData", JSON.stringify(gameData));
  alert("Game saved!");
}

// Load game data from Local Storage
function loadGame() {
  const savedData = localStorage.getItem("gameData");
  if (savedData) {
    const gameData = JSON.parse(savedData);
    money = gameData.money;
    gameIdeas = gameData.gameIdeas;
    isCreatingGame = gameData.isCreatingGame;
    gameIncome = gameData.gameIncome;
    // Update other variables and UI as per your game's requirements
    updateMoney();
    updateGameIdeas();
    if (isCreatingGame) {
      document.getElementById("game-creation-container").style.display = "block";
      document.getElementById("create-game-btn").disabled = true;
    }
    alert("Game loaded!");
  } else {
    alert("No saved game found!");
  }
}

// Initialization
document.getElementById("create-game-btn").addEventListener("click", createGame);
document.getElementById("confirm-game-btn").addEventListener("click", confirmGameCreation);
document.getElementById("cancel-game-btn").addEventListener("click", cancelGameCreation);
document.getElementById("save-btn").addEventListener("click", saveGame);
document.getElementById("load-btn").addEventListener("click", loadGame);
createBuildings();
updateMoney();
updateGameIdeas();

// Automatic money generation
setInterval(generateMoney, 1000); // Generate money every second
