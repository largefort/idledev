document.addEventListener("DOMContentLoaded", () => {
  let money = 0;
  let gamesDeveloped = 0;
  let linesOfCode = 0;
  let employees = 0;
  let level = 1;
  let codeLines = "";

  const moneyElement = document.getElementById("money");
  const gamesElement = document.getElementById("games");
  const levelElement = document.getElementById("level");
  const codeLinesElement = document.getElementById("codeLines");
  const employeesElement = document.getElementById("employees");
  const developBtn = document.getElementById("developBtn");
  const hireBtn = document.getElementById("hireBtn");

  // Load player progress from localStorage (if available)
  const savedData = JSON.parse(localStorage.getItem("gameData"));
  if (savedData) {
    money = savedData.money;
    gamesDeveloped = savedData.gamesDeveloped;
    linesOfCode = savedData.linesOfCode;
    employees = savedData.employees;
    level = savedData.level;
    codeLines = savedData.codeLines || "";
  }

  // Update UI with the initial values
  moneyElement.textContent = money.toFixed(2); // Display money with two decimal places
  gamesElement.textContent = gamesDeveloped;
  levelElement.textContent = level;
  employeesElement.textContent = employees;
  codeLinesElement.textContent = codeLines;

  // Handle the click event on the Develop Game button
  developBtn.addEventListener("click", () => {
    const developmentCost = Math.ceil(10 * Math.pow(1.1, gamesDeveloped)); // Cost increases with each game developed
    if (linesOfCode >= developmentCost) {
      linesOfCode -= developmentCost;
      money += developmentCost * 0.1; // Earn $0.1 for each line of code developed
      gamesDeveloped++;
      codeLines += `Game ${gamesDeveloped} developed: ${developmentCost} lines of code\n`;
      updateUI();

      // Save the player's progress in localStorage
      saveGame();
    } else {
      alert("Not enough lines of code to develop a game!");
    }
  });

  // Handle the click event on the Hire Employee button
  hireBtn.addEventListener("click", () => {
    if (money >= 50) {
      money -= 50;
      employees++;
      updateUI();
      saveGame();
    } else {
      alert("Not enough money to hire an employee!");
    }
  });

  // Function to update the UI
  function updateUI() {
    moneyElement.textContent = money.toFixed(2);
    gamesElement.textContent = gamesDeveloped;
    levelElement.textContent = level;
    employeesElement.textContent = employees;
    codeLinesElement.textContent = codeLines;

    // Scroll to the bottom of the terminal
    codeLinesElement.scrollTop = codeLinesElement.scrollHeight;
  }

  // Function to save the game progress in localStorage
  function saveGame() {
    const gameData = {
      money: money,
      gamesDeveloped: gamesDeveloped,
      linesOfCode: linesOfCode,
      employees: employees,
      level: level,
      codeLines: codeLines,
    };
    localStorage.setItem("gameData", JSON.stringify(gameData));
  }
});
