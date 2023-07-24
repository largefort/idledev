// Game variables
let money = 0;
let gameIdeas = 0;

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
    // Increase income and update display
    // You can implement this part on your own.
    updateMoney();
  }
}

// Create a new game
function createGame() {
  if (gameIdeas >= 10) {
    gameIdeas -= 10;
    // Create a new game and add income based on the game's success
    // You can implement this part on your own.
    updateGameIdeas();
  }
}

// Update money display
function updateMoney() {
  document.getElementById("money").textContent = money;
}

// Update game ideas display
function updateGameIdeas() {
  document.getElementById("game-ideas").textContent = gameIdeas;
}

// Autosave feature
function autosave() {
  setInterval(() => {
    // Save game data (money, gameIdeas, building data, etc.) to local storage
    // You can implement this part on your own.
  }, 30000); // Autosave every 30 seconds
}

// Initialization
document.getElementById("create-game-btn").addEventListener("click", createGame);
createBuildings();
updateMoney();
updateGameIdeas();
autosave();
