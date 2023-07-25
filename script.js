let currency = 0;
let locPerClick = 1;
let upgradeCost = 10;
let upgradeLevel = 1;
let locPerCode = 5;
let autoCodeWritingUpgradeCost = 100;
let autoCodeWritingInterval = null;
let achievements = [];

const currencyElement = document.getElementById("currency");
const workButton = document.getElementById("workButton");
const upgradeButton = document.getElementById("upgradeButton");
const upgradeLevelElement = document.getElementById("upgradeLevel");
const codeInput = document.getElementById("codeInput");
const runButton = document.getElementById("runButton");
const firstAchievement = document.getElementById("firstAchievement");
const achievementsList = document.getElementById("achievements");

function updateCurrency() {
  currencyElement.textContent = currency;
}

function updateUpgradeLevel() {
  upgradeLevelElement.textContent = upgradeLevel;
}

function generateRandomCodeLines() {
  const linesOfCode = Math.floor(Math.random() * 5) + 1; // Generate between 1 to 5 lines of code
  return "function exampleFunction() {\n" + "  // Your code here...\n".repeat(linesOfCode) + "}";
}

function work() {
  currency += locPerClick;
  updateCurrency();

  if (currency >= autoCodeWritingUpgradeCost && autoCodeWritingInterval === null) {
    autoCodeWritingInterval = setInterval(() => {
      const generatedCode = generateRandomCodeLines();
      codeInput.value = generatedCode;
      runCode(); // Automatically run the generated code
    }, 5000); // Auto code writing interval in milliseconds (5 seconds)
  }
}

function upgrade() {
  if (currency >= upgradeCost) {
    currency -= upgradeCost;
    locPerClick += upgradeLevel;
    upgradeLevel++;
    upgradeCost *= 2;
    updateCurrency();
    updateUpgradeLevel();

    if (achievements.indexOf("firstAchievement") === -1 && upgradeLevel >= 5) {
      achievements.push("firstAchievement");
      achievementsList.innerHTML += "<li>First Achievement Unlocked: Reached Upgrade Level 5!</li>";
    }
  } else {
    alert("Not enough LOC to purchase the upgrade!");
  }
}

function runCode() {
  const code = codeInput.value.trim();
  if (code) {
    const linesOfCodeEarned = code.length * locPerCode;
    currency += linesOfCodeEarned;
    updateCurrency();
    codeInput.value = "";
  }
}

workButton.addEventListener("click", work);
upgradeButton.addEventListener("click", upgrade);
runButton.addEventListener("click", runCode);
