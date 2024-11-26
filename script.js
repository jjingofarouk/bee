// Game State and Configuration
let points = 5000; // Starting points
let bestRound = 0; // Best round score
let entranceFee = 20; // Fee to play
let consecutiveWins = 0; // Track consecutive wins
let cardDraws = 3; // Number of card draws available

// Game Elements
const rollButton = document.getElementById("rollButton");
const drawCardButton = document.getElementById("drawCardButton");
const flipCoinButton = document.getElementById("flipCoinButton");
const resetButton = document.getElementById("resetButton");
const storyText = document.getElementById("storyText");
const pointsDisplay = document.getElementById("points");
const bestRoundDisplay = document.getElementById("bestRound");

// Probability and Game Mechanics
const numDice = 7;
const winProbabilities = [];

// Binomial Probability Calculation
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

// Calculate Probabilities
function calculateProbabilities() {
    const p = 1 / 6;  // Probability of rolling a five
    for (let k = 0; k <= numDice; k++) {
        winProbabilities[k] = binomialProbability(numDice, k, p);
    }
}

// Points Calculation
function calculatePoints(numberOfFives) {
    switch (numberOfFives) {
        case 0: return 0;
        case 1: return 50;
        case 2: return 100;
        case 3: return 200;
        case 4: return 400;
        case 5: return 800;
        case 6: return 2000;
        case 7: return 10000;
        default: return 0;
    }
}

// Dice Roll Mechanism
function rollDice() {
    if (points < entranceFee) {
        alert("Not enough points to play!");
        return;
    }

    points -= entranceFee;

    // Probabilistic outcome based on predefined win probabilities
    const randomValue = Math.random();
    let accumulatedProbability = 0;
    let fivesRolled = 0;

    for (let i = 0; i <= numDice; i++) {
        accumulatedProbability += winProbabilities[i];
        if (randomValue <= accumulatedProbability) {
            fivesRolled = i;
            break;
        }
    }

    // Points and Win Logic
    let pointsAwarded = calculatePoints(fivesRolled);
    points += pointsAwarded;

    // Win Tracking
    if (pointsAwarded > 0) {
        consecutiveWins++;
        storyText.textContent = `Incredible roll! ${fivesRolled} fives earned you ${pointsAwarded} points!`;
    } else {
        consecutiveWins = 0;
        storyText.textContent = "No fives this time. Better luck next roll!";
    }

    updateUI();
}

// Card Draw Mechanism
function drawCard() {
    if (cardDraws <= 0) {
        alert("No card draws left!");
        return;
    }

    cardDraws--;
    const cardValues = [50, 100, 200, -100, -50];
    const drawnValue = cardValues[Math.floor(Math.random() * cardValues.length)];

    points += drawnValue;
    storyText.textContent = drawnValue >= 0 
        ? `Lucky draw! You gained ${drawnValue} points!` 
        : `Oh no! You lost ${Math.abs(drawnValue)} points!`;

    updateUI();
}

// Coin Flip Mechanism
function flipCoin() {
    const result = Math.random() < 0.5 ? 'Heads' : 'Tails';
    const betAmount = 100;

    if (result === 'Heads') {
        points += betAmount;
        storyText.textContent = `Heads! You won ${betAmount} points!`;
    } else {
        points -= betAmount;
        storyText.textContent = `Tails! You lost ${betAmount} points!`;
    }

    updateUI();
}

// UI and Game State Update
function updateUI() {
    pointsDisplay.textContent = points;
    bestRoundDisplay.textContent = Math.max(bestRound, points);

    // Achievement Tracking
    if (points >= 20000) document.getElementById('luckMaster').classList.add('achieved');
    if (points >= 5000) document.getElementById('jackpotMilestone').classList.add('achieved');
    if (consecutiveWins >= 3) document.getElementById('winStreak').classList.add('achieved');
}

// Game Reset (Always Available)
function resetGame() {
    points = 5000;
    bestRound = 0;
    consecutiveWins = 0;
    cardDraws = 3;
    resetAchievements();
    updateUI();
    storyText.textContent = "Your legendary journey begins... Roll the dice of fate!";
}

// Reset Achievements
function resetAchievements() {
    document.getElementById('luckMaster').classList.remove('achieved');
    document.getElementById('jackpotMilestone').classList.remove('achieved');
    document.getElementById('winStreak').classList.remove('achieved');
}

// Event Listeners
rollButton.addEventListener("click", rollDice);
drawCardButton.addEventListener("click", drawCard);
flipCoinButton.addEventListener("click", flipCoin);
resetButton.addEventListener("click", resetGame);

// Initialize Game
calculateProbabilities();
updateUI();