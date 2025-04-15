const zombie = document.getElementById('zombie');
const bulletsText = document.getElementById('bullets');
const zombiesText = document.getElementById('zombies');
const message = document.getElementById('message');
const game = document.getElementById('game');

let bullets = 12;
let zombiesLeft = 12;
let gameActive = true;

// Random position
function moveZombie() {
  const x = Math.random() * (game.clientWidth - 60);
  const y = Math.random() * (game.clientHeight - 80);
  zombie.style.left = `${x}px`;
  zombie.style.top = `${y}px`;
}

// Show zombie
function showZombie() {
  zombie.classList.remove('hidden');
  moveZombie();
}

// Shoot zombie
zombie.addEventListener('click', (e) => {
  if (!gameActive) return;

  zombiesLeft--;
  bullets--;

  updateStats();

  if (zombiesLeft === 0) {
    endGame(true);
  } else {
    showZombie();
  }
});

// Missed shot
game.addEventListener('click', (e) => {
  if (!gameActive || e.target.id === 'zombie') return;

  bullets--;
  updateStats();

  if (bullets < zombiesLeft) {
    endGame(false);
  }
});

// Update text
function updateStats() {
  bulletsText.textContent = bullets;
  zombiesText.textContent = zombiesLeft;
}

// Game over
function endGame(win) {
  gameActive = false;
  zombie.classList.add('hidden');
  message.textContent = win ? "🎉 You Win!" : "💀 You Missed! Restarting...";
  setTimeout(() => {
    resetGame();
  }, 2000);
}

// Reset
function resetGame() {
  bullets = 12;
  zombiesLeft = 12;
  gameActive = true;
  updateStats();
  message.textContent = '';
  showZombie();
}

// Start game
resetGame();