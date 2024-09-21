const cells = document.querySelectorAll('[data-cell]');
const statusDisplay = document.querySelector('.status');
const startButton = document.querySelector('.start-btn');
const restartButton = document.querySelector('.restart-btn');
let circleTurn;
let gameActive = false; // Track if game is active

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

startButton.addEventListener('click', startGame);
restartButton.addEventListener('click', restartGame);

function startGame() {
    gameActive = true;
    startButton.style.display = 'none';
    restartButton.style.display = 'block';
    circleTurn = false;
    cells.forEach(cell => {
        cell.classList.remove('X', 'O', 'winning-line');
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, {
            once: true
        });
    });
    setStatusMessage();
}

function restartGame() {
    statusDisplay.textContent = 'Press "Start Game" to begin!';
    startButton.style.display = 'block';
    restartButton.style.display = 'none';
    gameActive = false;
    cells.forEach(cell => {
        cell.classList.remove('X', 'O', 'winning-line');
        cell.removeEventListener('click', handleClick);
    });
}

function handleClick(e) {
    if (!gameActive) return;
    const cell = e.target;
    const currentClass = circleTurn ? 'O' : 'X';
    placeMark(cell, currentClass);
    if (checkWin(currentClass)) {
        endGame(false);
        highlightWinningCells(currentClass);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
        setStatusMessage();
    }
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
}

function swapTurns() {
    circleTurn = !circleTurn;
}

function setStatusMessage() {
    statusDisplay.textContent = `${circleTurn ? "Player-2" : "Player-1"}'s Turn`;
}

function checkWin(currentClass) {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return cells[index].classList.contains(currentClass);
        });
    });
}

function isDraw() {
    return [...cells].every(cell => {
        return cell.classList.contains('X') || cell.classList.contains('O');
    });
}

function endGame(draw) {
    if (draw) {
        statusDisplay.textContent = 'Draw!';
    } else {
        statusDisplay.textContent = `Congratulations ${circleTurn ? "Player-2" : "Player-1"} Wins!`;
    }
    cells.forEach(cell => {
        cell.removeEventListener('click', handleClick);
    });
}

function highlightWinningCells(currentClass) {
    const winningCombination = winningCombinations.find(combination => {
        return combination.every(index => {
            return cells[index].classList.contains(currentClass);
        });
    });

    if (winningCombination) {
        winningCombination.forEach(index => {
            cells[index].classList.add('winning-line');
        });
    }
}