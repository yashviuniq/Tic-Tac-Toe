const cells = document.querySelectorAll('.cell');
const statusDiv = document.getElementById('status');
const resetButton = document.getElementById('resetBtn');

let board = Array(9).fill(null); // Empty board
let currentPlayer = 'X'; // Starting player

// Check if there's a winner
const checkWinner = () => {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Horizontal
        [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Vertical
        [0, 4, 8], [2, 4, 6]  // Diagonal
    ];

    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];  // Return the winner ('X' or 'O')
        }
    }

    return board.includes(null) ? null : 'draw';  // If all cells are filled, it's a draw
};

// Update the game status (win/draw/turn)
const updateStatus = () => {
    const winner = checkWinner();
    if (winner === 'draw') {
        statusDiv.textContent = "It's a Draw!";
    } else if (winner) {
        statusDiv.textContent = `${winner} wins!`;
    } else {
        statusDiv.textContent = `${currentPlayer}'s Turn`;
    }
};

// Handle cell clicks
const handleCellClick = (e) => {
    const index = e.target.dataset.cellIndex;
    if (board[index] || checkWinner()) return; // Ignore if cell is taken or game is over

    // Mark the cell with the current player's symbol
    board[index] = currentPlayer;
    e.target.textContent = currentPlayer;

    // Check for winner or draw
    updateStatus();

    // Switch player turns
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
};

// Add event listeners to each cell
cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

// Reset the game
const resetGame = () => {
    board = Array(9).fill(null); // Clear the board state
    currentPlayer = 'X'; // Reset to 'X' starting player
    statusDiv.textContent = `${currentPlayer}'s Turn`;

    cells.forEach(cell => {
        cell.textContent = ''; // Clear cell content
    });
};

// Add reset functionality to the restart button
resetButton.addEventListener('click', resetGame);

// Initialize the game
updateStatus();
