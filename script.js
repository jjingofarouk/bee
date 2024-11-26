// Set initial game state variables
let points = 5000; // Starting points
let bestRound = 0; // Best round score
let consecutiveWins = 0; // Track consecutive wins
const entranceFee = 20; // Fee to roll the dice (fixed at 20 points)
const winPercentage = 0.25; // Player wins 25% of the time based on the scoring system

// Elements from HTML
const rollButton = document.getElementById("rollButton");
const resetButton = document.getElementById("resetButton");
const storyText = document.getElementById("storyText");
const diceContainer = document.getElementById("diceContainer");
const pointsDisplay = document.getElementById("points");
const bestRoundDisplay = document.getElementById("bestRound");

// Function to roll the dice
function rollDice() {
    if (points < entranceFee) {
        alert("You don't have enough points to play. Try again later!");
        return; // Stop the game if the player can't afford the entrance fee
    }

    // Subtract the entrance fee
    points -= entranceFee;

    // Roll 7 dice and calculate the number of fives rolled
    const diceRolls = [];
    let numberOfFives = 0;

    for (let i = 0; i < 7; i++) {
        const roll = Math.floor(Math.random() * 6) + 1; // Random number between 1 and 6
        diceRolls.push(roll);
        if (roll === 5) {
            numberOfFives++;
        }
    }

    displayDice(diceRolls); // Display the rolled dice

    // Calculate points based on the number of fives rolled
    let pointsAwarded = calculatePoints(numberOfFives);
    points += pointsAwarded;

    // Update narrative based on the number of fives rolled
    storyText.textContent = `You rolled ${numberOfFives} five(s)! You earned ${pointsAwarded} points.`;

    // Track the best round
    if (points > bestRound) {
        bestRound = points;
    }

    // Update UI
    updateUI();
}

// Function to display the dice
function displayDice(diceRolls) {
    diceContainer.innerHTML = ''; // Clear previous dice
    diceRolls.forEach(roll => {
        const diceDiv = document.createElement('div');
        diceDiv.classList.add('dice');
        diceDiv.textContent = roll;
        diceContainer.appendChild(diceDiv);
    });
}

// Function to calculate points based on the number of fives rolled
function calculatePoints(numberOfFives) {
    switch (numberOfFives) {
        case 0:
            return -20; // Lose points for no fives
        case 1:
            return 50; // 1 five
        case 2:
            return 100; // 2 fives
        case 3:
            return 200; // 3 fives
        case 4:
            return 400; // 4 fives
        case 5:
            return 800; // 5 fives
        case 6:
            return 2000; // 6 fives
        case 7:
            return 10000; // 7 fives
        default:
            return 0; // Default case (should never happen)
    }
}

// Function to update the UI with the latest points and best round
function updateUI() {
    pointsDisplay.textContent = points; // Update the points display
    bestRoundDisplay.textContent = bestRound; // Update the best round score
}

// Function to reset the game
function resetGame() {
    points = 5000; // Reset points to starting amount
    bestRound = 0; // Reset best round
    updateUI(); // Update the UI with the new values
    storyText.textContent = "Your legendary journey begins... Roll the dice of fate!";
}

// Event listeners for buttons
rollButton.addEventListener("click", rollDice);
resetButton.addEventListener("click", resetGame);