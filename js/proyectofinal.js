document.addEventListener("DOMContentLoaded", () => {
    const cells = document.querySelectorAll(".cell");
    const restartButton = document.getElementById("restartButton");
    const playerForm = document.getElementById("playerForm");
    const playerInfo = document.getElementById("playerInfo");
    const currentPlayerInfo = document.getElementById("currentPlayerInfo");
    const gameBoard = document.getElementById("gameBoard");
    const leaderboardBody = document.getElementById("leaderboardBody");
    const themeToggle = document.getElementById("themeToggle");
    let currentPlayer = "X";
    let gameState = Array(9).fill(null);
    let player1 = "";
    let player2 = "";
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

    playerForm.addEventListener("submit", (e) => {
        e.preventDefault();
        player1 = document.getElementById("player1").value;
        player2 = document.getElementById("player2").value;
        playerForm.style.display = "none";
        playerInfo.style.display = "block";
        gameBoard.style.display = "grid";
        restartButton.style.display = "inline-block";
        updatePlayerInfo();
    });

    cells.forEach(cell => {
        cell.addEventListener("click", handleCellClick);
    });

    restartButton.addEventListener("click", resetGame);
    themeToggle.addEventListener("click", toggleTheme);

    function handleCellClick(e) {
        const cell = e.target;
        const index = cell.dataset.index;

        if (gameState[index] || checkWinner()) {
            return;
        }

        gameState[index] = currentPlayer;
        cell.textContent = currentPlayer;

        if (checkWinner()) {
            updateLeaderboard(currentPlayer);
            alert(`¡${currentPlayer} ha ganado!`);
            return;
        }

        if (gameState.every(cell => cell)) {
            alert("¡Es un empate!");
            return;
        }

        currentPlayer = currentPlayer === "X" ? "O" : "X";
        updatePlayerInfo();
    }

    function checkWinner() {
        return winningCombinations.some(combination => {
            return combination.every(index => {
                return gameState[index] === currentPlayer;
            });
        });
    }

    function updatePlayerInfo() {
        currentPlayerInfo.textContent = `Turno de: ${currentPlayer === "X" ? player1 : player2} (${currentPlayer})`;
    }

    function resetGame() {
        gameState.fill(null);
        cells.forEach(cell => (cell.textContent = ""));
        currentPlayer = "X";
        updatePlayerInfo();
    }

    function updateLeaderboard(winner) {
        const playerName = winner === "X" ? player1 : player2;
        let playerRow = Array.from(leaderboardBody.children).find(row => row.children[0].textContent === playerName);

        if (playerRow) {
            const winsCell = playerRow.children[1];
            winsCell.textContent = parseInt(winsCell.textContent) + 1;
        } else {
            const newRow = document.createElement("tr");
            const nameCell = document.createElement("td");
            const winsCell = document.createElement("td");
            nameCell.textContent = playerName;
            winsCell.textContent = "1";
            newRow.appendChild(nameCell);
            newRow.appendChild(winsCell);
            leaderboardBody.appendChild(newRow);
        }
    }

    function toggleTheme() {
        const body = document.body;
        body.classList.toggle("dark-mode");
        body.classList.toggle("light-mode");
        themeToggle.textContent = body.classList.contains("dark-mode") ? "Modo Claro" : "Modo Noche";
    }
});