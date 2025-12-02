import React, { useState } from "react";

const initialBoard = Array(9).fill(null);

const App = () => {
  const [board, setBoard] = useState(initialBoard);
  const [isXNext, setIsXNext] = useState(true);
  const winner = calculateWinner(board);

  const handleClick = (index) => {
    if (board[index] || winner) return;
    const newBoard = [...board];
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const resetGame = () => {
    setBoard(initialBoard);
    setIsXNext(true);
  };

  return (
    <div className="container">
      <h1>Tic Tac Toe</h1>
      <div className="status">
        {winner ? `Winner: ${winner}` : `Next Player: ${isXNext ? "X" : "O"}`}
      </div>
      <div className="board">
        {board.map((cell, idx) => (
          <button key={idx} className="cell" onClick={() => handleClick(idx)}>
            {cell}
          </button>
        ))}
      </div>
      <button className="reset" onClick={resetGame}>
        Restart
      </button>
    </div>
  );
};

function calculateWinner(b) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let [a, bIdx, c] of lines) {
    if (b[a] && b[a] === b[bIdx] && b[a] === b[c]) return b[a];
  }
  return null;
}

export default App;
