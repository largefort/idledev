document.addEventListener("DOMContentLoaded", () => {
  let money = 0;
  let gamesDeveloped = 0;
  let linesOfCode = 0;
  let employees = 0;

  const moneyElement = document.getElementById("money");
  const gamesElement = document.getElementById("games");
  const linesOfCodeElement = document.getElementById("linesOfCode");
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
  }

  // Update UI with the initial values
  moneyElement.textContent = money;
  gamesElement.textContent = gamesDeveloped;
  linesOfCodeElement.textContent = linesOfCode;
  employeesElement.textContent = employees;

  // Handle the click event on the Develop Game button
  developBtn.addEventListener("click", () => {
    const linesDeveloped = employees * 10; // Each employee develops 10 lines of code
    linesOfCode += linesDeveloped;
    money += linesDeveloped * 0.1; // Earn $0.1 for each line of code developed
    gamesDeveloped++;
    updateUI();

    // Save the player's progress in localStorage
    saveGame();
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
    moneyElement.textContent = money.toFixed(2); // Display money with two decimal places
    gamesElement.textContent = gamesDeveloped;
    linesOfCodeElement.textContent = linesOfCode;
    employeesElement.textContent = employees;
  }

  // Function to save the game progress in localStorage
  function saveGame() {
    const gameData = {
      money: money,
      gamesDeveloped: gamesDeveloped,
      linesOfCode: linesOfCode,
      employees: employees,
    };
    localStorage.setItem("gameData", JSON.stringify(gameData));
  }
});

// Automatic money generation
setInterval(generateMoney, 1000); // Generate money every second
