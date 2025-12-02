"use client";

import { useState, useRef } from "react";
import "./TicTacToe.css";

const initialBoard: (string | null)[] = Array(9).fill(null);

  // ...existing code...

  const [board, setBoard] = useState(initialBoard);
  const [isXNext, setIsXNext] = useState(true);
  const winner = calculateWinner(board);

  // Sound refs
  const xAudioRef = useRef<HTMLAudioElement>(null);
  const oAudioRef = useRef<HTMLAudioElement>(null);


  const handleClick = (index: number) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);

    // Play sound effect
    if (isXNext && xAudioRef.current) {
      xAudioRef.current.currentTime = 0;
      xAudioRef.current.play();
    } else if (!isXNext && oAudioRef.current) {
      oAudioRef.current.currentTime = 0;
      oAudioRef.current.play();
    }
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
      {/* Sound effects */}
      <audio ref={xAudioRef} src="/x-sound.mp3" preload="auto" />
      <audio ref={oAudioRef} src="/o-sound.mp3" preload="auto" />
    </div>
  );
}

function calculateWinner(b: (string | null)[]) {
  const lines: number[][] = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const [a, bIdx, c] of lines) {
    if (b[a] && b[a] === b[bIdx] && b[a] === b[c]) return b[a];
  }
  return null;
}
