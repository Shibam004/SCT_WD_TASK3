const board = document.getElementById("board");
const status = document.getElementById("status");
const winLine = document.getElementById("winLine");

let currentPlayer = "X";
let gameActive = true;
let gameState = Array(9).fill("");

const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
  [0, 4, 8], [2, 4, 6]             // diagonals
];

function createBoard() {
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.setAttribute("data-index", i);
    cell.addEventListener("click", handleClick);
    board.appendChild(cell);
  }
}

function handleClick(e) {
  const index = e.target.getAttribute("data-index");
  if (gameState[index] !== "" || !gameActive) return;

  gameState[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  const winIndex = checkWinner();
  if (winIndex !== -1) {
    const combo = winningCombinations[winIndex];
    status.textContent = `Player ${currentPlayer} Wins!`;
    drawWinningLine(combo);
    gameActive = false;
    return;
  }

  if (!gameState.includes("")) {
    status.textContent = "It's a Draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  status.textContent = `Player ${currentPlayer}'s Turn`;
}

function checkWinner() {
  for (let i = 0; i < winningCombinations.length; i++) {
    const [a, b, c] = winningCombinations[i];
    if (
      gameState[a] &&
      gameState[a] === gameState[b] &&
      gameState[a] === gameState[c]
    ) {
      return i;
    }
  }
  return -1;
}

function drawWinningLine(combo) {
  const cellSize = 100 + 10; // 100px cell + 10px gap
  const offset = 50; // middle of cell

  const [startIdx, , endIdx] = combo;
  const startX = (startIdx % 3) * cellSize + offset;
  const startY = Math.floor(startIdx / 3) * cellSize + offset;
  const endX = (endIdx % 3) * cellSize + offset;
  const endY = Math.floor(endIdx / 3) * cellSize + offset;

  const deltaX = endX - startX;
  const deltaY = endY - startY;
  const length = Math.sqrt(deltaX ** 2 + deltaY ** 2);
  const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);

  winLine.style.width = `${length}px`;
  winLine.style.top = `${startY}px`;
  winLine.style.left = `${startX}px`;
  winLine.style.transform = `rotate(${angle}deg) scaleX(1)`;
}

function resetGame() {
  gameState.fill("");
  board.innerHTML = "";
  currentPlayer = "X";
  gameActive = true;
  status.textContent = `Player ${currentPlayer}'s Turn`;
  winLine.style.transform = "scaleX(0)";
  createBoard();
}

createBoard();
