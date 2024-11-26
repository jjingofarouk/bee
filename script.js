// Set initial game state variables
let points = 5000; // Starting points
let bestRound = 0; // Best round score
let consecutiveWins = 0; // Track consecutive wins
const entranceFee = 20; // Fee to roll the dice (fixed at 20 points)
const winPercentage = 0.27; // Player wins 27% of the time
const expectedLoss = 15; // Expected average loss per game for the player (house advantage)

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

    displayDice(diceRolls); // Display the rolled dice with animation

    // Calculate points based on the number of fives rolled and win chance
    let pointsAwarded = calculatePoints(numberOfFives);

    // Add random win chance logic for 27% win rate
    if (Math.random() <= winPercentage) {
        pointsAwarded = Math.max(pointsAwarded, 50); // Ensure that win happens with some points (at least 50 points)
    } else {
        pointsAwarded = -entranceFee; // If the player loses, subtract the entrance fee (this simulates the house edge)
    }

    points += pointsAwarded;

    // Update narrative based on the number of fives rolled and the outcome
    storyText.textContent = `You rolled ${numberOfFives} five(s)! You ${pointsAwarded >= 0 ? 'earned' : 'lost'} ${Math.abs(pointsAwarded)} points.`;

    // Track the best round
    if (points > bestRound) {
        bestRound = points;
    }

    // Update UI
    updateUI();
}

// Function to display the dice with animation
function displayDice(diceRolls) {
    diceContainer.innerHTML = ''; // Clear previous dice
    diceRolls.forEach((roll, index) => {
        const diceDiv = document.createElement('div');
        diceDiv.classList.add('dice');
        diceDiv.textContent = roll;

        // Add roll animation
        diceDiv.style.animation = `diceRoll 0.5s ease-in-out ${index * 0.1}s`;
        diceContainer.appendChild(diceDiv);
    });
}

// Function to calculate points based on the number of fives rolled
function calculatePoints(numberOfFives) {
    switch (numberOfFives) {
        case 0:
            return -10; // Lose points for no fives (house advantage)
        case 1:
            return 20; // 1 five
        case 2:
            return 50; // 2 fives
        case 3:
            return 100; // 3 fives
        case 4:
            return 200; // 4 fives
        case 5:
            return 400; // 5 fives
        case 6:
            return 800; // 6 fives
        case 7:
            return 2000; // 7 fives
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
    consecutiveWins = 0; // Reset consecutive wins
    updateUI(); // Update the UI with the new values
    storyText.textContent = "Your legendary journey begins... Roll the dice of fate!";
}

// Event listeners for buttons
rollButton.addEventListener("click", rollDice);
resetButton.addEventListener("click", resetGame);