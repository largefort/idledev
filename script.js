let currency = 0;
let locPerClick = 1;
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

function generateRandomCodeLines(language) {
  const languages = {
    javascript: () => {
      const functionName = "exampleFunction";
      return `
function ${functionName}() {
  // Your JavaScript code here...
}
      `;
    },
    python: () => {
      const functionName = "example_function";
      return `
def ${functionName}():
    # Your Python code here...
      `;
    },
    java: () => {
      const functionName = "exampleFunction";
      return `
public static void ${functionName}() {
    // Your Java code here...
}
      `;
    }
    // Add more languages as needed
  };

  if (languages[language.toLowerCase()]) {
    return languages[language.toLowerCase()]();
  } else {
    throw new Error(`Language '${language}' not supported.`);
  }
}

function work() {
  currency += locPerClick;
  updateCurrency();

  const language = "javascript"; // Change this to the desired language
  const generatedCode = generateRandomCodeLines(language);
  codeInput.value = generatedCode;
}

function upgrade() {
  // ... (same as before) ...
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
