// Luck Quest: The Ultimate Challenge JavaScript

let points = 5000;
let bestRound = 0;
let luckScore = 0;
let winStreak = 0;
let consecutiveWins = 0;

const playButton = document.getElementById('playButton');
const resetButton = document.getElementById('resetButton');
const pointsDisplay = document.getElementById('points');
const bestRoundDisplay = document.getElementById('bestRound');
const luckScoreDisplay = document.getElementById('luckScore');
const storyText = document.getElementById('storyText');
const diceContainer = document.getElementById('diceContainer');
const jackpotMilestone = document.getElementById('jackpotMilestone');
const winStreakMilestone = document.getElementById('winStreak');
const luckMasterMilestone = document.getElementById('luckMaster');

// Helper function to roll a single die
function rollDie() {
    return Math.floor(Math.random() * 6) + 1;
}

// Roll 7 dice and display them
function rollDice() {
    diceContainer.innerHTML = ''; // Clear previous dice
    const rolls = [];
    for (let i = 0; i < 7; i++) {
        const roll = rollDie();
        rolls.push(roll);
        const die = document.createElement('div');
        die.className = 'die';
        die.textContent = roll;
        diceContainer.appendChild(die);
    }
    return rolls;
}

// Calculate points and luck score based on dice rolls
function calculateResults(rolls) {
    const fives = rolls.filter(num => num === 5).length;
    let roundPoints = 0;

    if (fives === 7) {
        roundPoints = 5000; // Jackpot
        storyText.textContent = "🌈 Legendary win! The dice bow to your luck!";
        winStreak++;
    } else if (fives >= 6) {
        roundPoints = 3000; // Big win
        storyText.textContent = "🔥 Big win! Fortune smiles upon you!";
        winStreak++;
    } else if (fives >= 3) {
        roundPoints = 1000; // Standard win
        storyText.textContent = "✨ A solid win! The stars align.";
        winStreak++;
    } else {
        roundPoints = -500; // Loss
        storyText.textContent = "💀 Fate was not in your favor this time.";
        winStreak = 0;
    }

    points += roundPoints;
    luckScore += fives * 100;

    if (roundPoints > bestRound) {
        bestRound = roundPoints;
    }

    if (winStreak >= 3) {
        winStreakMilestone.classList.add('milestone-achieved');
    }

    if (points >= 20000) {
        luckMasterMilestone.classList.add('milestone-achieved');
    }

    if (roundPoints >= 5000) {
        jackpotMilestone.classList.add('milestone-achieved');
    }

    return roundPoints;
}

// Update UI with new stats
function updateStats() {
    pointsDisplay.textContent = points;
    bestRoundDisplay.textContent = bestRound;
    luckScoreDisplay.textContent = luckScore;
}

// Reset the game
function resetGame() {
    points = 5000;
    bestRound = 0;
    luckScore = 0;
    winStreak = 0;
    updateStats();
    storyText.textContent = "Your legendary journey begins... Roll the dice of fate!";
    diceContainer.innerHTML = '';
    resetButton.style.display = 'none';
    playButton.style.display = 'inline-block';
    document.querySelectorAll('.milestone-achieved').forEach(el => el.classList.remove('milestone-achieved'));
}

// Event listeners
playButton.addEventListener('click', () => {
    if (points < 500) {
        storyText.textContent = "💸 Not enough points to play! Reset to start a new adventure.";
        return;
    }

    points -= 500; // Deduct game cost
    const rolls = rollDice();
    calculateResults(rolls);
    updateStats();

    if (points <= 0) {
        storyText.textContent = "Game Over! Reset to try your luck again.";
        playButton.style.display = 'none';
        resetButton.style.display = 'inline-block';
    }
});

resetButton.addEventListener('click', resetGame);
