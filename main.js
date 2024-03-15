/**
 * The game involves trying to guess an unknown word. The guessing of the word is done in 11 steps.

In Step 1 of the game the player guesses a 2 letter sub-word corresponding to the first two letters of the unknown word. They
score 20 points for any of the guessed letters which are in the word (but not in the correct position) and 100 points for any letter in
the correct position (See, for example, line 1 of Table 1 – the unknown word is "castle").

In Step 2 the player guesses a 3 letter sub-word to correspond to the first three letters of the unknown word (See, for example, line
2 of Table 1).

In Step 3 the player suggests another 3 letter sub-word to correspond to letters 2 to 4 of the unknown word, and the usual scoring
system holds (See line 3 of Table 1). In Step 4 the player suggests another 3 letter sub-word to correspond to letters 3 to 5 of the
unknown word (See line 4 of Table 1). In Step 5 they guess a 3 letter sub-word to correspond to letters 4 to 6 of the unknown word.
(See line 5 of Table 1).

The player continues guessing sub-words according to the zig-zagging pattern shown in Table 1 until they have a final chance to
guess the complete unknown word (which in the example below is "castle").
 */

// 1. Generate random word

const startTime = performance.now();

function getTimeDifference() {
    const endTime = performance.now();
    console.log(endTime - startTime);
}

async function getRandomWord() {
    const response = await fetch("https://random-word-api.herokuapp.com/word?length=12");
    const randomWordJson = await response.json();
    const randomWord = randomWordJson[0];
    console.log("Random word is: " + randomWord + " " + randomWord.length);

    getTimeDifference();

    return randomWord;
}

let RANDOM_WORD = "";
let RANDOM_WORD_ARRAY = [];

getRandomWord().then((word) => {
    RANDOM_WORD = word;
    RANDOM_WORD_ARRAY = RANDOM_WORD.split('');
});

// 2. Player guesses 2 letter sub-word of word corresponding to first two letters of word. 20 points for correct letter wrong position, 100 points for correct letter correct position

let currentGuess = "";
let playerScore = 0;

    // currentGuess = prompt("Enter a 4 letter sub-word corresponding to letters 2 to 6 of the word").toLowerCase();
    // parseRandomWordForGuess(2, 6);
    // console.log(RANDOM_WORD.substring(1, 5));
    // currentGuess = prompt("Enter a 5 letter sub-word corresponding to letters 3 to 8 of the word").toLowerCase();
    // parseRandomWordForGuess(3, 8);
    // console.log(RANDOM_WORD.substring(3, 8));
    // currentGuess = prompt("Enter a 6 letter sub-word corresponding to letters 4 to 10 of the word").toLowerCase();
    // parseRandomWordForGuess(4, 10);
    // console.log(RANDOM_WORD.substring(4, 10));
    // currentGuess = prompt("Enter a 7 letter sub-word corresponding to letters 5 to 12 of the word").toLowerCase();
    // parseRandomWordForGuess(5, 12);
    // console.log(RANDOM_WORD.substring(5, 12));

const startGameBtn = document.getElementById("button-start-game");
startGameBtn.addEventListener('click', () => {
    parseRandomWordForGuess(0, 2);
    parseRandomWordForGuess(0, 3);

    stepThroughWord();
});

function stepThroughWord() {
    const RANDOM_WORD_LENGTH = RANDOM_WORD.length;
    let startLetterIndex = 2;
    let guessSubWordLength = startLetterIndex + 2;
    let endLetterIndex = startLetterIndex + guessSubWordLength;
    while (startLetterIndex + guessSubWordLength <= RANDOM_WORD_LENGTH) {
        parseRandomWordForGuess(startLetterIndex, endLetterIndex);
        startLetterIndex++;
        guessSubWordLength = startLetterIndex + 2;
        endLetterIndex = startLetterIndex + guessSubWordLength;
    }
}

function parseRandomWordForGuess(from, to) {
    const RANDOM_WORD_SUBSTRING = RANDOM_WORD.substring(from, to);
    currentGuess = prompt(`Enter a ${to - from} letter sub-word corresponding to letters ${from} to ${to} of the word`).toLowerCase();
    
    if (RANDOM_WORD_SUBSTRING === currentGuess) {
        playerScore += 100;
    } else {
        for (let i = 0; i < currentGuess.length; i++) {
            if (RANDOM_WORD_SUBSTRING.includes(currentGuess[i])) {
                playerScore += 20;
            }
        }
    }
    console.log(RANDOM_WORD_SUBSTRING);
    console.log(playerScore);
}

// 3. Player guesses 3 letter sub-word of word corresponding to first three letters of word.

// 4. Player guesses 4 letter sub-word of word corresponding to letters 2 to 4 of word. 

// 5. Player guesses 5 letter sub-word of word corresponding to letters 3 to 7 of word.

// 6. And so on // TODO: adjust step sequence based on word length

// 7. Player guesses complete word // TODO



const inputSubmit = document.getElementById("input-submit");
inputSubmit.addEventListener('click', testInput);

function testInput() {
    const userInput = document.getElementById("input-field");
    console.log(userInput.value);
}

function bananas() {
    console.log("🍌🍌🍌🍌🍌🍌🍌");
}