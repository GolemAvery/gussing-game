/* 

Write your guess-game code here! Don't forget to look at the test specs as a guide. You can run the specs
by running "npm test".

In this file, you will also include the event listeners that are needed to interact with your HTML file when
a user clicks a button or adds a guess to the input field.

*/

// Selecting HTML elements
const form = document.querySelector('form');
const input = document.querySelector('input[type="number"]');
const hintButton = document.querySelector('.hint-button');
const playAgainButton = document.querySelector('.play-again-button');
const guessesList = document.querySelector('.guesses-list');
const hint = document.querySelector('.hint');

// Generating random number between 1-100
let winningNumber = Math.floor(Math.random() * 100) + 1;

// Initializing variables
let numGuesses = 0;
let guesses = [];
let gameOver = false;

// Function to update the hint
function updateHint(message) {
  hint.textContent = message;
}

// Function to check the guess
function checkGuess(guess) {
  numGuesses++;
  guesses.push(guess);

  if (guess === winningNumber) {
    updateHint(`Congratulations! ${guess} is the winning number!`);
    gameOver = true;
  } else if (numGuesses === 5) {
    updateHint(`Sorry, you lost. The winning number was ${winningNumber}.`);
    gameOver = true;
  } else {
    let difference = Math.abs(guess - winningNumber);
    let message = '';

    if (difference <= 5) {
      message = 'You are very close!';
    } else if (difference <= 10) {
      message = 'You are getting closer!';
    } else {
      message = 'You are far away!';
    }

    if (guess < winningNumber) {
      message += ' Try guessing higher.';
    } else {
      message += ' Try guessing lower.';
    }

    updateHint(message);
  }
}

// Function to display guesses in the list
function displayGuesses() {
  guessesList.innerHTML = '';

  guesses.forEach((guess) => {
    let li = document.createElement('li');
    li.textContent = guess;
    li.classList.add('guess');

    if (guess === winningNumber) {
      li.classList.add('win');
    }

    guessesList.appendChild(li);
  });
}

// Event listener for form submit
form.addEventListener('submit', (e) => {
  e.preventDefault();

  if (!gameOver) {
    let guess = parseInt(input.value);

    if (guess) {
      checkGuess(guess);
      input.value = '';
      displayGuesses();
    } else {
      updateHint('Please enter a valid number.');
    }
  }
});

// Event listener for hint button click
hintButton.addEventListener('click', () => {
  let hint1 = Math.floor(Math.random() * 100) + 1;
  let hint2 = Math.floor(Math.random() * 100) + 1;

  while (hint1 === winningNumber || hint2 === winningNumber) {
    hint1 = Math.floor(Math.random() * 100) + 1;
    hint2 = Math.floor(Math.random() * 100) + 1;
  }

  updateHint(`The winning number is either ${hint1} or ${hint2}.`);
});

// Event listener for play again button click
playAgainButton.addEventListener('click', () => {
  winningNumber = Math.floor(Math.random() * 100) + 1;
  numGuesses = 0;
  guesses = [];
  gameOver = false;
  hint.textContent = '';
  displayGuesses();
});
