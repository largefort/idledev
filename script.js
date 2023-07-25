function generateCode() {
  const userInput = document.getElementById('userInput').value;
  const outputElement = document.getElementById('output');

  // Clear previous output
  outputElement.innerHTML = '';

  // Split user input into lines and process each line
  const lines = userInput.split('\n');
  for (const line of lines) {
    // For demonstration purposes, let's just create a paragraph element for each line.
    const paragraph = document.createElement('p');
    paragraph.textContent = line;
    outputElement.appendChild(paragraph);
  }
}
