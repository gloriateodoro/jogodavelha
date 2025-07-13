import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Game from './App'

// Mock do componente Board
vi.mock('./components/Board', () => ({
  Board: ({ xIsNext, squares, onPlay }) => (
    <div data-testid="board">
      <div>Next player: {xIsNext ? 'X' : 'O'}</div>
      {squares.map((value, index) => (
        <button
          key={index}
          className="square"
          onClick={() => onPlay(squares.map((s, i) => i === index ? (xIsNext ? 'X' : 'O') : s))}
        >
          {value}
        </button>
      ))}
    </div>
  )
}))

describe('Game Component', () => {
  it('should render the game board', () => {
    render(<Game />)
    
    expect(screen.getByTestId('board')).toBeInTheDocument()
  })

  it('should render game info section', () => {
    render(<Game />)
    
    expect(screen.getByText('Go to game start')).toBeInTheDocument()
  })

  it('should start with X as next player', () => {
    render(<Game />)
    
    expect(screen.getByText('Next player: X')).toBeInTheDocument()
  })

  it('should render move history buttons', () => {
    render(<Game />)
    
    const moveButtons = screen.getAllByRole('button')
    expect(moveButtons.some(button => button.textContent === 'Go to game start')).toBe(true)
  })

  it('should have correct CSS classes for layout', () => {
    render(<Game />)
    
    const gameContainer = screen.getByTestId('board').closest('div')
    expect(gameContainer).toHaveClass('game')
  })

  it('should render game board and game info sections', () => {
    render(<Game />)
    
    expect(screen.getByTestId('board')).toBeInTheDocument()
    expect(screen.getByText('Go to game start')).toBeInTheDocument()
  })

  it('should display initial game state correctly', () => {
    render(<Game />)
    
    // Verifica se o tabuleiro está vazio inicialmente
    const squares = screen.getAllByRole('button').filter(button => 
      button.classList.contains('square')
    )
    
    squares.forEach(square => {
      expect(square).toHaveTextContent('')
    })
  })

  it('should have proper game structure', () => {
    render(<Game />)
    
    const gameElement = screen.getByTestId('board').closest('.game')
    expect(gameElement).toBeInTheDocument()
    
    const gameBoard = gameElement.querySelector('.game-board')
    expect(gameBoard).toBeInTheDocument()
    
    const gameInfo = gameElement.querySelector('.game-info')
    expect(gameInfo).toBeInTheDocument()
  })
}) 