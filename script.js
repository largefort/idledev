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

  checkAchievements();
  
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

function generateAchievement() {
  const names = [
    "Super Clicker",
    "Developer Extraordinaire",
    "Game Creation Master",
    "Points Accumulator",
    "Productive Programmer",
    "Creative Genius",
    "Mega Developer",
    "Point Hunter",
    "Master of Idle Games",
    "Game Development Guru"
  ];

  const goals = [
    "Click 1000 times",
    "Hire 10 developers",
    "Generate 10000 points",
    "Create 5 games",
    "Reach 500 points",
    "Have 3 games with 1000 points",
    "Earn 100 points in a single click",
    "Accumulate 100 developers",
    "Create a game with 5000 points",
    "Click 500 times in a minute"
  ];

  const randomName = names[Math.floor(Math.random() * names.length)];
  const randomGoal = goals[Math.floor(Math.random() * goals.length)];

  return {
    name: randomName,
    goal: randomGoal,
    unlocked: false
  };
}

function checkAchievements() {
  for (let i = 0; i < achievements.length; i++) {
    if (!achievements[i].unlocked) {
      switch (i) {
        case 0: // Achievement 1 check
          if (points >= 1000) {
            unlockAchievement(i);
          }
          break;
        case 1: // Achievement 2 check
          if (developers >= 10) {
            unlockAchievement(i);
          }
          break;
        // Add more cases for other achievements
      }
    }
  }
}

function unlockAchievement(index) {
  achievements[index].unlocked = true;
  showAchievementNotification(achievements[index]);
}

function showAchievementNotification(achievement) {
  const notificationElement = document.getElementById("achievementNotification");
  notificationElement.textContent = `${achievement.name} Unlocked! Goal: ${achievement.goal}`;
  notificationElement.classList.add("show");
  
  setTimeout(function() {
    notificationElement.classList.remove("show");
  }, 3000);
}

// Automatic points generation by developers every second
setInterval(function() {
  points += developers;
  
  games.forEach((game) => {
    game.pointsGenerated += game.pointsPerDeveloper * developers;
  });
  
  checkAchievements();
  updatePoints();
  updateGamePoints();
}, 1000);

// Initialize achievements
for (let i = 0; i < 3; i++) {
  achievements.push(generateAchievement());
}
