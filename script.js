let currency = 0;
let upgradeCost = 10;
let upgradeLevel = 1;
let locPerCode = 5;

const currencyElement = document.getElementById("currency");
const workButton = document.getElementById("workButton");
const upgradeButton = document.getElementById("upgradeButton");
const upgradeLevelElement = document.getElementById("upgradeLevel");
const codeInput = document.getElementById("codeInput");
const runButton = document.getElementById("runButton");

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
  const generatedCode = generateRandomCodeLines();
  codeInput.value = generatedCode;
  runCode(); // Automatically run the generated code
}

function upgrade() {
  if (currency >= upgradeCost) {
    currency -= upgradeCost;
    locPerCode += upgradeLevel;
    upgradeLevel++;
    upgradeCost *= 2;
    updateCurrency();
    updateUpgradeLevel();
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
