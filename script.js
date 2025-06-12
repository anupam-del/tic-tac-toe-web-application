const board = document.getElementById("board");
const statusText = document.getElementById("status");

let currentPlayer = "X";
let gameActive = true;
let boardState = ["", "", "", "", "", "", "", "", ""];

function createBoard() {
  board.innerHTML = "";
  boardState.forEach((cell, index) => {
    const div = document.createElement("div");
    div.classList.add("cell");
    div.dataset.index = index;
    div.textContent = cell;
    div.addEventListener("click", handleCellClick);
    board.appendChild(div);
  });
}

function handleCellClick(e) {
  const index = e.target.dataset.index;

  if (!gameActive || boardState[index]) return;

  boardState[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWinner()) {
    statusText.textContent = `Player ${currentPlayer} wins!`;
    gameActive = false;
  } else if (!boardState.includes("")) {
    statusText.textContent = "It's a draw!";
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function checkWinner() {
  const wins = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6]             // diagonals
  ];

  return wins.some(([a, b, c]) => 
    boardState[a] &&
    boardState[a] === boardState[b] &&
    boardState[b] === boardState[c]
  );
}

function restartGame() {
  currentPlayer = "X";
  gameActive = true;
  boardState = ["", "", "", "", "", "", "", "", ""];
  statusText.textContent = "Player X's turn";
  createBoard();
}

createBoard();
