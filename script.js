// Set initial game state variables
let points = 5000; // Starting points
let bestRound = 0; // Best round score
let entranceFee = 20; // Fee to roll the dice (fixed fee)
const winPercentage = 0.27; // Player wins 27% of the time
const numDice = 7; // Number of dice rolled at once
const winProbabilities = []; // Store binomial distribution probabilities

// Elements from HTML
const rollButton = document.getElementById("rollButton");
const resetButton = document.getElementById("resetButton");
const storyText = document.getElementById("storyText");
const diceContainer = document.getElementById("diceContainer");
const pointsDisplay = document.getElementById("points");
const bestRoundDisplay = document.getElementById("bestRound");

// Function to calculate the binomial probability for number of fives rolled
function binomialProbability(n, k, p) {
    function binomialCoeff(n, k) {
        let coeff = 1;
        for (let i = 1; i <= k; i++) {
            coeff *= (n - (k - i)) / i;
        }
        return coeff;
    }
    return binomialCoeff(n, k) * Math.pow(p, k) * Math.pow(1 - p, n - k);
}

// Calculate probabilities for rolling 0 to 7 fives (for 7 dice)
function calculateProbabilities() {
    const p = 1 / 6;  // Probability of rolling a five on a single die
    for (let k = 0; k <= numDice; k++) {
        winProbabilities[k] = binomialProbability(numDice, k, p);
    }
}

// Function to calculate points based on the number of fives rolled
function calculatePoints(numberOfFives) {
    switch (numberOfFives) {
        case 0: return 0; // No fives = no points
        case 1: return 50; // 1 five
        case 2: return 100; // 2 fives
        case 3: return 200; // 3 fives
        case 4: return 400; // 4 fives
        case 5: return 800; // 5 fives
        case 6: return 2000; // 6 fives
        case 7: return 10000; // 7 fives
        default: return 0; // Default case (should never happen)
    }
}

// Function to simulate the rolling of 7 dice
function rollDice() {
    if (points < entranceFee) {
        alert("You don't have enough points to play. Try again later!");
        return; // Stop the game if the player can't afford the entrance fee
    }

    // Subtract the entrance fee
    points -= entranceFee;

    // Calculate the number of fives rolled based on probabilities
    const randomValue = Math.random();
    let accumulatedProbability = 0;
    let fivesRolled = 0;

    // Determine the number of fives rolled based on probabilities
    for (let i = 0; i <= numDice; i++) {
        accumulatedProbability += winProbabilities[i];
        if (randomValue <= accumulatedProbability) {
            fivesRolled = i;
            break;
        }
    }

    // Calculate the points based on the number of fives rolled
    let pointsAwarded = calculatePoints(fivesRolled);
    points += pointsAwarded;

    // Update the story text
    storyText.textContent = `You rolled ${fivesRolled} five(s)! You earned ${pointsAwarded} points.`;

    // Track the best round
    if (points > bestRound) {
        bestRound = points;
    }

    // Update UI
    updateUI();
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

// Initialize game by calculating probabilities
calculateProbabilities();