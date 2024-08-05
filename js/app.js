const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const restartBtn = document.getElementById('restartBtn');
const exitBtn = document.getElementById('exitBtn');
const modeSwitch = document.getElementById('modeSwitch');
const startBtn = document.getElementById('startBtn');
const player1Input = document.getElementById('player1');
const player2Input = document.getElementById('player2');
const scoreBoard = document.getElementById('scoreBoard');
const boardElement = document.querySelector('.board');
let currentPlayer = 'X';
let player1 = '';
let player2 = '';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = false;
let player1Wins = 0;
let player2Wins = 0;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

modeSwitch.addEventListener('change', () => {
    document.body.classList.toggle('dark-mode');
});

document.addEventListener('DOMContentLoaded', () => {
    fetchPlayersData();
});

startBtn.addEventListener('click', startGame);
restartBtn.addEventListener('click', restartGame);
exitBtn.addEventListener('click', exitGame);

function startGame() {
    player1 = player1Input.value.trim();
    player2 = player2Input.value.trim();

    if (player1 === '' || player2 === '' || player1 === player2) {
        Swal.fire({
            icon: 'warning',
            title: 'Nombres inválidos',
            text: 'Los nombres de los jugadores deben ser diferentes y no pueden estar vacíos.',
            confirmButtonText: 'Entendido'
        });
        return;
    }

    gameActive = true;
    statusText.textContent = `Es el turno de ${player1} (X)`;
    createBoard();
}
function createBoard() {
    boardElement.innerHTML = '';
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell', 'animate__animated', 'animate__fadeIn');
        cell.setAttribute('data-index', i);
        cell.addEventListener('click', cellClicked);
        boardElement.appendChild(cell);
    }
}

function cellClicked() {
    const index = this.getAttribute('data-index');
    if (board[index] !== '' || !gameActive) return;

    board[index] = currentPlayer;
    this.textContent = currentPlayer;
    this.classList.add('animate__zoomIn');

    checkWinner();
    switchPlayer();
}

function checkWinner() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        const a = board[winCondition[0]];
        const b = board[winCondition[1]];
        const c = board[winCondition[2]];
        if (a === '' || b === '' || c === '') continue;

        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        const winner = currentPlayer === 'X' ? player1 : player2;
        statusText.textContent = `¡${winner} ha ganado!`;
        updateWinCount(winner);
        gameActive = false;
        return;
    }

    if (!board.includes('')) {
        statusText.textContent = "¡Empate!";
        gameActive = false;
        return;
    }
}

function switchPlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    const currentPlayerName = currentPlayer === 'X' ? player1 : player2;
    statusText.textContent = `Es el turno de ${currentPlayerName} (${currentPlayer})`;
}

function restartGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    statusText.textContent = `Es el turno de ${player1} (X)`;
    createBoard();
}

restartBtn.addEventListener('click', () => {
    Swal.fire({
        title: '¿Reiniciar el juego?',
        text: "Se perderán los progresos actuales.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, reiniciar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            restartGame();
        }
    });
});

exitBtn.addEventListener('click', () => {
    Swal.fire({
        title: '¿Salir del juego?',
        text: "Se perderán los progresos actuales.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, salir',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            exitGame();
        }
    });
});

function exitGame() {
    player1Input.value = '';
    player2Input.value = '';
    boardElement.innerHTML = '';
    statusText.textContent = '';
    gameActive = false;
}

function updateWinCount(winner) {
    if (winner === player1) {
        player1Wins++;
    } else {
        player2Wins++;
    }
    updateScoreBoard([{ name: player1, wins: player1Wins }, { name: player2, wins: player2Wins }]);
}

async function fetchPlayersData() {
    try {
        const response = await fetch('playersData.json'); 
        const data = await response.json();
        updateScoreBoard(data);
    } catch (error) {
        console.error('Error al obtener los datos de los jugadores:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error de Conexión',
            text: 'No se pudieron obtener los datos de los jugadores.',
            confirmButtonText: 'Reintentar'
        });
    }
}

function updateScoreBoard(playersData) {
    scoreBoard.innerHTML = '';
    playersData.forEach(player => {
        const row = document.createElement('tr');
        const nameCell = document.createElement('td');
        const winsCell = document.createElement('td');
        nameCell.textContent = player.name;
        winsCell.textContent = player.wins;
        row.appendChild(nameCell);
        row.appendChild(winsCell);
        scoreBoard.appendChild(row);
    });
}
