// Game State and Configuration
let points = 5000; // Starting points
let bestRound = 0; // Best round score
const entranceFee = 20; // Fee to play
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

// Game Mechanics
const numDice = 7;

// Points Calculation for Fives Rolled
function calculatePoints(numberOfFives) {
    return numberOfFives * 100; // Gain 100 points for each '5'
}

// Dice Roll Mechanism
function rollDice() {
    if (points < entranceFee) {
        alert("Not enough points to play!");
        return;
    }

    points -= entranceFee;

    let fivesRolled = 0;

    // Roll 7 dice and count number of fives
    for (let i = 0; i < numDice; i++) {
        const roll = Math.floor(Math.random() * 6) + 1; // Roll a die (1-6)
        if (roll === 5) {
            fivesRolled++;
        }
    }

    // Points and Win Logic
    let pointsAwarded = calculatePoints(fivesRolled);
    points += pointsAwarded;

    // Win Tracking
    if (pointsAwarded > 0) {
        consecutiveWins++;
        storyText.textContent = `Incredible roll! You rolled ${fivesRolled} five(s) and earned ${pointsAwarded} points!`;
    } else {
        consecutiveWins = 0;
        storyText.textContent = "No fives this time. Better luck next roll!";
    }

    // Update best round score if applicable
    if (points > bestRound) {
        bestRound = points;
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
    const cardValues = [50, 100, -50, -100]; // Positive and negative values
    const drawnValue = cardValues[Math.floor(Math.random() * cardValues.length)];

    points += drawnValue;
    storyText.textContent = drawnValue >= 0 
        ? `Lucky draw! You gained ${drawnValue} points!` 
        : `Oh no! You lost ${Math.abs(drawnValue)} points!`;

    updateUI();
}

// Coin Flip Mechanism
function flipCoin() {
    if (points < entranceFee) {
        alert("Not enough points to play!");
        return;
    }

    points -= entranceFee;
    
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
    bestRoundDisplay.textContent = bestRound;

    // Achievement Tracking
    if (points >= 20000) document.getElementById('luckMaster').classList.add('achieved');
    if (points >= 5000) document.getElementById('jackpotMilestone').classList.add('achieved');
    if (consecutiveWins >= 3) document.getElementById('winStreak').classList.add('achieved');
}

// Game Reset (Always Available)
function resetGame() {
    points = 5000;
    bestRound = Math.max(bestRound, points); // Keep highest score as best round
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

// Initialize Game UI
updateUI();
