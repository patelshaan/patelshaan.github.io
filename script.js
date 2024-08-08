// script.js
// Chess game implementation
const chessGame = new Chess();
const chessBoard = Chessboard('chess-game', {
  position: 'start',
  orientation: 'white',
  draggable: true,
  onDragStart: onDragStart,
  onDrop: onDrop,
  onSnapEnd: onSnapEnd
});

function onDragStart(source, piece) {
  // Only allow the user to move their own pieces
  if (piece.search(/^b/) !== -1) return false;
}

function onDrop(source, target) {
  const move = chessGame.move({
    from: source,
    to: target,
    promotion: 'q' // TODO: Implement promotion
  });

  if (move === null) return 'snapback';

  updateStatus();
}

function onSnapEnd() {
  chessBoard.position(chessGame.fen());
}

function updateStatus() {
  const status = computeGameStatus();
  if (status === 'checkmate') {
    alert('Checkmate! You win!');
  } else if (status === 'draw') {
    alert('It\'s a draw!');
  }
}

function computeGameStatus() {
  if (chessGame.game_over()) {
    if (chessGame.in_checkmate()) {
      return 'checkmate';
    } else {
      return 'draw';
    }
  }
  return 'ongoing';
}

// Rock Paper Scissors implementation
const rpsButtons = document.querySelectorAll('.rps-btn');
const rpsResult = document.getElementById('rps-result');

rpsButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const playerChoice = btn.dataset.choice;
    const computerChoice = getComputerRpsChoice();
    const result = determineRpsWinner(playerChoice, computerChoice);
    updateRpsResult(result, playerChoice, computerChoice);
  });
});

function getComputerRpsChoice() {
  const choices = ['rock', 'paper', 'scissors'];
  return choices[Math.floor(Math.random() * choices.length)];
}

function determineRpsWinner(playerChoice, computerChoice) {
  if (playerChoice === computerChoice) {
    return 'tie';
  } else if (
    (playerChoice === 'rock' && computerChoice === 'scissors') ||
    (playerChoice === 'paper' && computerChoice === 'rock') ||
    (playerChoice === 'scissors' && computerChoice === 'paper')
  ) {
    return 'player';
  } else {
    return 'computer';
  }
}

function updateRpsResult(result, playerChoice, computerChoice) {
  let resultMessage;
  switch (result) {
    case 'tie':
      resultMessage = `It's a tie! You both chose ${playerChoice}.`;
      break;
    case 'player':
      resultMessage = `You win! You chose ${playerChoice} and the computer chose ${computerChoice}.`;
      break;
    case 'computer':
      resultMessage = `You lose. The computer chose ${computerChoice} and you chose ${playerChoice}.`;
      break;
  }
  rpsResult.textContent = resultMessage;
}

// Tic Tac Toe implementation
const tictactoeCells = document.querySelectorAll('.tictactoe-cell');
let currentPlayer = 'X';

tictactoeCells.forEach(cell => {
  cell.addEventListener('click', () => {
    if (cell.textContent === '') {
      cell.textContent = currentPlayer;
      checkWin();
      switchPlayer();
      checkTie();
    }
  });
});

function checkWin() {
  const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  for (let combo of winningCombos) {
    if (
      tictactoeCells[combo[0]].textContent === currentPlayer &&
      tictactoeCells[combo[1]].textContent === currentPlayer &&
      tictactoeCells[combo[2]].textContent === currentPlayer
    ) {
      alert(`${currentPlayer} wins!`);
      resetGame();
    }
  }
}

function checkTie() {
  if (Array.from(tictactoeCells).every(cell => cell.textContent !== '')) {
    alert('It\'s a tie!');
    resetGame();
  }
}

function switchPlayer() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function resetGame() {
  tictactoeCells.forEach(cell => {
    cell.textContent = '';
  });
  currentPlayer = 'X';
}
