// Set initial game state variables
let balance = 2000; // Starting balance in dollars
let bestRound = 0;
let currentRoundEarnings = 0;
const gameCost = 500; // Fee to play each round
const winPercentage = 0.25; // Player wins 25% of the time

// Elements from HTML
const rollButton = document.getElementById("rollButton");
const rerollButton = document.getElementById("rerollButton");
const resetButton = document.getElementById("resetButton");
const storyText = document.getElementById("storyText");
const diceContainer = document.getElementById("diceContainer");
const balanceDisplay = document.getElementById("balance");
const bestRoundDisplay = document.getElementById("bestRound");

// Function to roll the dice
function rollDice() {
    if (balance < gameCost) {
        alert("You don't have enough money to play. Try again later!");
        return; // Stop the game if the player can't afford the entry fee
    }

    // Subtract the cost of the round
    balance -= gameCost;

    // Generate a random roll from 1 to 6
    const roll = Math.floor(Math.random() * 6) + 1;
    displayDice(roll);

    // Calculate the earnings based on the roll
    if (roll === 1) {
        currentRoundEarnings = 0;
        storyText.textContent = "You rolled a 1! You lose your $500 for this round.";
    } else if (roll === 6) {
        currentRoundEarnings = 2000; // Big reward for rolling a 6
        storyText.textContent = "Lucky roll! You earned $2000!";
    } else {
        currentRoundEarnings = roll * 500; // Earnings based on the roll
        storyText.textContent = `You rolled a ${roll}. You earned $${currentRoundEarnings}!`;
    }

    // Add the earnings to the balance
    balance += currentRoundEarnings;

    // Update the best round if needed
    if (balance > bestRound) {
        bestRound = balance;
    }

    updateUI(); // Update the UI with the new balance and best round
}

// Function to display the dice
function displayDice(roll) {
    diceContainer.innerHTML = `<div class="dice">${roll}</div>`;
}

// Function to update the UI elements
function updateUI() {
    balanceDisplay.textContent = `$${balance.toFixed(2)}`; // Display the current balance
    bestRoundDisplay.textContent = `$${bestRound.toFixed(2)}`; // Display the best round
}

// Function to reroll the dice
function rerollDice() {
    currentRoundEarnings = 0; // Reset earnings for reroll
    rollDice(); // Reroll the dice
}

// Function to reset the game
function resetGame() {
    balance = 2000; // Reset balance to starting amount
    currentRoundEarnings = 0;
    rollDice(); // Start a new round
    updateUI(); // Update the UI with the new balance
    storyText.textContent = "Your legendary journey begins... Roll the dice of fate!";
}

// Event listeners for buttons
rollButton.addEventListener("click", rollDice);
rerollButton.addEventListener("click", rerollDice);
resetButton.addEventListener("click", resetGame);