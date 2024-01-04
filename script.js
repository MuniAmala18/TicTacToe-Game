document.addEventListener('DOMContentLoaded', function () {
  // Define audio elements for different sounds
  const clickSound = new Audio('images/click.mp3'); // Replace 'click.mp3' with the actual path to your click sound
  const winSound = new Audio('images/win.mp3'); // Replace 'win.mp3' with the actual path to your win sound
  const tieSound = new Audio('images/tie.mp3'); // Replace 'tie.mp3' with the actual path to your tie sound

  // Function to play click sound
  function playClickSound() {
    clickSound.play();
  }

  // Function to play win sound
  function playWinSound() {
    winSound.play();
  }

  // Function to play tie sound
  function playTieSound() {
    tieSound.play();
  }

  const board = document.getElementById('board');
  const result = document.getElementById('result');
  const restartButton = document.getElementById('restartButton');
  let currentPlayer = 'X';
  let gameBoard = ['', '', '', '', '', '', '', '', ''];
  let gameActive = true;

  function checkWinner() {
    const winPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    for (const pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (gameBoard[a] !== '' && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
        return gameBoard[a];
      }
    }

    if (!gameBoard.includes('')) {
      return 'T'; // Tie
    }

    return null;
  }

  function updateBoard() {
    board.innerHTML = '';
    for (let i = 0; i < 9; i++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.textContent = gameBoard[i];
      cell.addEventListener('click', function () {
        if (gameBoard[i] === '' && gameActive) {
          gameBoard[i] = currentPlayer;
          cell.textContent = currentPlayer;
          const winner = checkWinner();
          if (winner) {
            if (winner === 'T') {
              result.textContent = 'It\'s a tie!';
              playTieSound(); // Play tie sound when the game ends in a tie
            } else {
              result.textContent = `${winner} wins!`;
              cell.classList.add('winner');
              playWinSound(); // Play win sound when a player wins
            }
            gameActive = false;
          } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            playClickSound(); // Play click sound when a cell is clicked
          }
        }
      });
      board.appendChild(cell);
    }
  }

  restartButton.addEventListener('click', function () {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    result.textContent = '';
    updateBoard();
  });

  updateBoard();
});
