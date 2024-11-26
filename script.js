// Set initial game state variables
let points = 5000;
let bestRound = 0;
let luckScore = 0;
let currentRoundPoints = 0;

// Elements from HTML
const rollButton = document.getElementById("rollButton");
const luckCardButton = document.getElementById("luckCardButton");
const rerollButton = document.getElementById("rerollButton");
const resetButton = document.getElementById("resetButton");
const storyText = document.getElementById("storyText");
const diceContainer = document.getElementById("diceContainer");
const pointsDisplay = document.getElementById("points");
const bestRoundDisplay = document.getElementById("bestRound");
const luckScoreDisplay = document.getElementById("luckScore");

const gameCost = 500;
const winPercentage = 0.25; // Player wins 25% of the time, adjusted for balance

// Function to roll the dice
function rollDice() {
    // Generate a random roll from 1 to 6
    const roll = Math.floor(Math.random() * 6) + 1;
    displayDice(roll);

    // Calculate the reward based on roll
    if (roll === 1) {
        currentRoundPoints = 0;
        storyText.textContent = "You rolled a 1! No points this round.";
    } else if (roll === 6) {
        currentRoundPoints = 2000;
        storyText.textContent = "Lucky roll! You earned 2000 points!";
    } else {
        currentRoundPoints = roll * 500;
        storyText.textContent = `You rolled a ${roll}. You earned ${currentRoundPoints} points!`;
    }

    // Update total points and check for win streaks
    points += currentRoundPoints;
    if (points > bestRound) {
        bestRound = points;
    }

    updateUI();
    checkForAchievements();
}

// Function to display the dice
function displayDice(roll) {
    diceContainer.innerHTML = `<div class="dice">${roll}</div>`;
}

// Function to update the UI elements
function updateUI() {
    pointsDisplay.textContent = points;
    bestRoundDisplay.textContent = bestRound;
    luckScoreDisplay.textContent = luckScore;
}

// Function to check if the player achieved any milestones
function checkForAchievements() {
    if (points >= 5000 && !document.getElementById("jackpotMilestone").classList.contains("earned")) {
        document.getElementById("jackpotMilestone").classList.add("earned");
        alert("🎉 You unlocked the Legendary Win milestone!");
    }
    if (points >= 20000 && !document.getElementById("luckMaster").classList.contains("earned")) {
        document.getElementById("luckMaster").classList.add("earned");
        alert("🌟 You unlocked the Luck Master milestone!");
    }
}

// Function to handle rerolling
function rerollDice() {
    currentRoundPoints = 0; // Reset points for reroll
    rollDice();
}

// Function to reset the game
function resetGame() {
    points = 5000;
    luckScore = 0;
    currentRoundPoints = 0;
    rollDice();
    updateUI();
    storyText.textContent = "Your legendary journey begins... Roll the dice of fate!";
}

// Event listeners for buttons
rollButton.addEventListener("click", function() {
    if (points >= gameCost) {
        points -= gameCost;
        rollDice();
    } else {
        alert("Not enough points to play. Try again later!");
    }
});

luckCardButton.addEventListener("click", function() {
    // Implement Luck Card mechanics here if desired
    luckScore += 1000;
    alert("Lucky you! You've drawn a Luck Card!");
    updateUI();
});

rerollButton.addEventListener("click", rerollDice);
resetButton.addEventListener("click", resetGame);