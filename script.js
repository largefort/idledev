let points = 0;
let developers = 0;
let games = [];
let upgrades = {
  1: { cost: 10, pointsPerSecond: 1 },
  2: { cost: 20, unlockAbility: true }
};

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

function purchaseUpgrade(upgradeId) {
  const upgrade = upgrades[upgradeId];
  if (points >= upgrade.cost) {
    points -= upgrade.cost;
    updatePoints();

    // Apply the upgrade
    if (upgrade.pointsPerSecond) {
      // Increase points generation per second
      games.forEach((game) => {
        game.pointsGenerated += upgrade.pointsPerSecond * developers;
      });
      updateGamePoints();
    }

    if (upgrade.unlockAbility) {
      // Unlock a new ability (you can define the logic for the ability)
      // ...
    }

    // Update upgrade cost (optional)
    upgrade.cost *= 2;
    document.getElementById(`upgrade${upgradeId}Cost`).textContent = upgrade.cost;
  } else {
    alert("Insufficient points to purchase the upgrade!");
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
