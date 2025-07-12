import './App.css'
import { useState } from 'react';
import { Board } from './components/Board';

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    let buttonStyle = {
      backgroundColor: 'var(--color-accent)',
      color: 'var(--color-text-light)',
      fontWeight: 'bold',
      padding: '0.5rem 1rem',
      borderRadius: '0.25rem',
      transition: 'all 0.2s',
      border: 'none',
      cursor: 'pointer'
    };
    
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
      buttonStyle = {
        ...buttonStyle,
        backgroundColor: 'var(--color-secondary)',
        padding: '0.75rem 1.5rem',
        fontSize: '1.125rem',
        borderRadius: '0.5rem',
        boxShadow: '0 10px 15px -3px var(--color-shadow)'
      };
    }
    
    return (
      <li key={move} className="mb-2">
        <button 
          onClick={() => jumpTo(move)}
          style={buttonStyle}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = move === 0 ? 'var(--color-secondary-dark)' : 'var(--color-accent-dark)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = move === 0 ? 'var(--color-secondary)' : 'var(--color-accent)';
          }}
        >
          {description}
        </button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}
