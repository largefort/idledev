let points = 0;
let developers = 0;
let games = [];
let achievements = [];

function updatePoints() {
  document.getElementById("points").textContent = points;
}

function incrementPoints() {
  points++;
  checkAchievements();
  updatePoints();
}

function updateDevelopers() {
  document.getElementById("developers").textContent = developers;
}

function hireDeveloper() {
  if (points >= 10) {
    points -= 10;
    developers++;
    checkAchievements();
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

  updateGameList();
  checkAchievements();
}

function updateGameList() {
  const gameListElement = document.getElementById("gameList");
  gameListElement.innerHTML = "";

  games.forEach((game, index) => {
    const gameItem = document.createElement("div");
    gameItem.className = "game-item";
    gameItem.innerHTML = `
      <h3>${game.name}</h3>
      <p>Points Generated: <span>${game.pointsGenerated}</span></p>
    `;

    gameListElement.appendChild(gameItem);
  });
}

function checkAchievements() {
  achievements.forEach((achievement) => {
    if (!achievement.unlocked && achievement.goal()) {
      achievement.unlocked = true;
      showAchievementNotification(achievement.name);
    }
  });
}

function showAchievementNotification(achievementName) {
  const notificationElement = document.getElementById("achievementNotification");
  notificationElement.textContent = `Achievement Unlocked: ${achievementName}`;
  notificationElement.style.display = "block";

  setTimeout(() => {
    notificationElement.style.display = "none";
  }, 2000);
}

// Achievement Definitions
const achievement1 = {
  name: "Click Master",
  goal: () => points >= 100,
  unlocked: false
};

const achievement2 = {
  name: "Developer Power",
  goal: () => developers >= 5,
  unlocked: false
};

achievements.push(achievement1, achievement2);

// Automatic points generation by developers every second
setInterval(function() {
  points += developers;
  
  games.forEach((game) => {
    game.pointsGenerated += game.pointsPerDeveloper * developers;
  });
  
  checkAchievements();
  updatePoints();
  updateGameList();
}, 1000);

// Autosave every 5 seconds
setInterval(function() {
  exportSave();
}, 5000);

// Load saved data on page load
window.addEventListener("load", function() {
  importSave();
});
