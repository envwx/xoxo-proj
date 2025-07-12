// Global variables
let board = ['', '', '', '', '', '', '', '', ''];
let turn = 'X';
let winner = false;
let tie = false;

let messageElm = document.getElementById('message');
let squareElm = document.querySelectorAll('.square');

function init() {
  render();
  updateBoard();
  updateMessage();
  // Attach click handlers directly
  for (let i = 0; i < squareElm.length; i++) {
    squareElm[i].addEventListener('click', function() {
      handleClick(i);
    });
  }
}

function render() {
  if (!winner && !tie) {
    messageElm.textContent = 'Player ' + turn + "'s turn";
  }
}

function updateBoard() {
  for (let i = 0; i < board.length; i++) {
    squareElm[i].textContent = board[i];
    squareElm[i].classList.remove('X');
    squareElm[i].classList.remove('O');
    squareElm[i].classList.remove('winner');
    if (board[i] === 'X') {
      squareElm[i].classList.add('X');
    } else if (board[i] === 'O') {
      squareElm[i].classList.add('O');
    }
  }
}

function updateMessage() {
  if (winner) {
    messageElm.textContent = 'Player ' + turn + ' wins!';
  } else if (tie) {
    messageElm.textContent = "It's a tie!";
  } else {
    messageElm.textContent = 'Player ' + turn + "'s turn";
  }
}

function handleClick(squareIndex) {
  if (board[squareIndex] !== '' || winner) return;
  board[squareIndex] = turn;
  updateBoard();
  checkForWinner();
  if (!winner) {
    checkForTie();
  }
  if (!winner && !tie) {
    turn = (turn === "X") ? "O" : "X";
  }
  updateMessage();
}

function checkForWinner() {
  for (let combo of winningCombos) {
    const [a, b, c] = combo;
    if (board[a] !== '' && board[a] === board[b] && board[b] === board[c]) {
      winner = true;
      squareElm[a].classList.add('winner');
      squareElm[b].classList.add('winner');
      squareElm[c].classList.add('winner');
    }
  }
}

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function checkForTie() {
  if (winner) {
    tie = false;
    return;
  }
  if (board.every(cell => cell !== '')) {
    tie = true;
  } else {
    tie = false;
  }
}

function resetGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  turn = 'X';
  winner = false;
  tie = false;
  updateBoard();
  updateMessage();
  // Remove winner highlight
  for (let i = 0; i < squareElm.length; i++) {
    squareElm[i].classList.remove('winner');
  }
}

// Attach the reset button event listener once after DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  const resetBtn = document.getElementById('reset');
  if (resetBtn) {
    resetBtn.addEventListener('click', resetGame);
  }
  init();
});
