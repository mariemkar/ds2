const gameBoard = (() => {
    let board = ['', '', '', '', '', '', '', '', ''];
  
    const getBoard = () => board;
  
    const makeMove = (index, player) => {
      if (board[index] === '') {
        board[index] = player;
        return true;
      }
      return false;
    };
  
    const resetBoard = () => {
      board = ['', '', '', '', '', '', '', '', ''];
    };
  
    return { getBoard, makeMove, resetBoard };
  })();
  
  const displayController = (() => {
    const squares = Array.from(document.querySelectorAll('.square'));
  
    const renderBoard = () => {
      gameBoard.getBoard().forEach((player, index) => {
        squares[index].textContent = player;
      });
    };
  
    const displayStatus = (message) => {
      document.querySelector('#status').textContent = message;
    };
  
    const clearBoard = () => {
      squares.forEach(square => {
        square.textContent = '';
      });
    };
  
    const disableBoard = () => {
      squares.forEach(square => {
        square.removeEventListener('click', handleTurn);
      });
    };
  
    const enableBoard = () => {
      squares.forEach(square => {
        square.addEventListener('click', handleTurn);
      });
    };
  
    const handleTurn = (event) => {
     
        const index = event.target.dataset.cell;
        if (gameBoard.makeMove(index, 'X')) {
          renderBoard();
          const winner = checkForWinner();
          if (winner) {
            endGame(winner);
          } else {
            computerTurn();
          }
        }
      };
    
      const computerTurn = () => {
        disableBoard();
        setTimeout(() => {
          const availableSquares = squares.filter(square => square.textContent === '');
          const randomIndex = Math.floor(Math.random() * availableSquares.length);
          const index = availableSquares[randomIndex].dataset.cell;
          if (gameBoard.makeMove(index, 'O')) {
            renderBoard();
            const winner = checkForWinner();
            if (winner) {
              endGame(winner);
            } else {
              enableBoard();
              
            }
          }
        }, 1000);
      };
    
      const checkForWinner = () => {
        const winningCombos = [      [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8],
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 8],
          [2, 4, 6]
        ];
    
        for (let i = 0; i < winningCombos.length; i++) {
          const [a, b, c] = winningCombos[i];
          if (gameBoard.getBoard()[a] && gameBoard.getBoard()[a] === gameBoard.getBoard()[b] && gameBoard.getBoard()[a] === gameBoard.getBoard()[c]) {
            return gameBoard.getBoard()[a];
          }
        }
    
        if (gameBoard.getBoard().every(square => square !== '')) {
          return 'tie';
        }
    
        return null;
      };
    
      const endGame = (winner) => {
        disableBoard();
        if (winner === 'tie') {
          displayStatus('Match nul !');
        } else {
          displayStatus(`Joueur ${winner} a gagne!`);
        }
      };
    
      const restartGame = () => {
        gameBoard.resetBoard();
        clearBoard();
        enableBoard();
        displayStatus("It's your turn!");
      };
    
      squares.forEach(square => {
        square.addEventListener('click', handleTurn);
      });
    
      document.querySelector('#restart').addEventListener('click', restartGame);
    
      return { renderBoard };
    })();
    
    displayController.renderBoard();
      