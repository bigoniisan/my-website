const startGameBtn = document.getElementById("button-start-game");
startGameBtn.addEventListener('click', bananas);

const inputSubmit = document.getElementById("input-submit");
inputSubmit.addEventListener('click', testInput);

function testInput() {
    const userInput = document.getElementById("input-field");
    console.log(userInput.value);
}

function bananas() {
    console.log("🍌🍌🍌🍌🍌🍌🍌");
}