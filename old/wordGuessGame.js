/**
 * seawares 8
 * se 0,1
 * awa 2,3,4
 * res 5,6,7
 * 
 * passe 5
 * pa 0,1
 * sse 2,3,4
 * 
 * slenderizing 12
 * sl 0,1
 * end 2,3,4
 * eri 5,6,7
 * zin 8,9,10
 * g 11
 * 
 * greenmail 9
 * gr
 * een
 * mai
 * l
 * 
 * ruinous 7
 * ru
 * ino
 * us
 */

let RANDOM_WORD = "";
let currentGuess = "";
let finalGuess = "";
let playerScore = 0;

async function getRandomWord() {
    const response = await fetch("https://random-word-api.herokuapp.com/word");
    const randomWordJson = await response.json();
    const randomWord = randomWordJson[0];
    console.log("Random word is: " + randomWord + " " + randomWord.length);

    return randomWord;
}

const startGameBtn = document.getElementById("button-start-game");
startGameBtn.addEventListener('click', () => {
    RANDOM_WORD = "";
    currentGuess = "";
    finalGuess = "";
    playerScore = 0;
    getRandomWord().then((word) => {
        RANDOM_WORD = word;
    })
    .then( () => {
        alert(`The word is ${RANDOM_WORD.length} letters!`);
        parseRandomWordForGuess(0, 2); // Because first guess is two letters
    })
    .then( () => {
        stepThroughWordAfterFirstGuess();
    })
    .then( () => {
        guessFinalWord();
    });
});

function stepThroughWordAfterFirstGuess() {
    let currentWordIndex = 2;
    while (currentWordIndex + 3 <= RANDOM_WORD.length) {
        parseRandomWordForGuess(currentWordIndex, currentWordIndex + 3);
        currentWordIndex += 3;

    }
    if (currentWordIndex + 3 > RANDOM_WORD.length &&
        currentWordIndex != RANDOM_WORD.length) {
        parseRandomWordForGuess(currentWordIndex, RANDOM_WORD.length);
    }
}

function parseRandomWordForGuess(from, to) {
    const RANDOM_WORD_SUBSTRING = RANDOM_WORD.substring(from, to);
    let currentGuess = prompt(`Enter a ${to - from} letter sub-word corresponding to letters ${from + 1} to ${to} of the word`).toLowerCase();

    while (currentGuess.length != to - from) {
        currentGuess = prompt(`Enter a ${to - from} letter sub-word corresponding to letters ${from + 1} to ${to} of the word`).toLowerCase();
    }

    for (let i = 0; i < currentGuess.length; i++) {
        if (RANDOM_WORD_SUBSTRING[i] === currentGuess[i]) {
                playerScore += 100;
            }
        else if (RANDOM_WORD_SUBSTRING.includes(currentGuess[i])) {
            playerScore += 20;
        }
        console.log(playerScore);
    }
    console.log(RANDOM_WORD_SUBSTRING);
}

function guessFinalWord() {
    while (finalGuess.length != RANDOM_WORD.length) {
        finalGuess = prompt(`Now guess the final word (${RANDOM_WORD.length} letters)`).toLowerCase();
    }
    if (finalGuess === RANDOM_WORD) {
        alert("🥳🍌🥳🍌🥳🍌🥳");
    }
    else {
        alert("😡😡😡😡😡😡😡");
    }
}

const inputSubmit = document.getElementById("input-submit");
inputSubmit.addEventListener('click', testInput);

function testInput() {
    const userInput = document.getElementById("input-field");
    console.log(userInput.value);
}

function bananas() {
    console.log("🍌🍌🍌🍌🍌🍌🍌");
}