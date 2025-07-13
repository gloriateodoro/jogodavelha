import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { Board } from './Board'

// Mock do componente Modal
vi.mock('./Modal', () => ({
  Modal: ({ isOpen, onClose, children }) => {
    if (!isOpen) return null
    return (
      <div data-testid="modal">
        {children}
        <button onClick={onClose}>Fechar</button>
      </div>
    )
  }
}))

describe('Board Component', () => {
  let mockOnPlay

  beforeEach(() => {
    mockOnPlay = vi.fn()
  })

  it('should render 9 squares', () => {
    const squares = Array(9).fill(null)
    render(<Board xIsNext={true} squares={squares} onPlay={mockOnPlay} />)
    
    const squareButtons = screen.getAllByRole('button').filter(button => 
      button.classList.contains('square')
    )
    expect(squareButtons).toHaveLength(9)
  })

  it('should display "Next player: X" when X is next', () => {
    const squares = Array(9).fill(null)
    render(<Board xIsNext={true} squares={squares} onPlay={mockOnPlay} />)
    
    expect(screen.getByText('Next player: X')).toBeInTheDocument()
  })

  it('should display "Next player: O" when O is next', () => {
    const squares = Array(9).fill(null)
    render(<Board xIsNext={false} squares={squares} onPlay={mockOnPlay} />)
    
    expect(screen.getByText('Next player: O')).toBeInTheDocument()
  })

  it('should call onPlay with X when X is next and square is clicked', () => {
    const squares = Array(9).fill(null)
    render(<Board xIsNext={true} squares={squares} onPlay={mockOnPlay} />)
    
    const firstSquare = screen.getAllByRole('button')[0]
    fireEvent.click(firstSquare)
    
    expect(mockOnPlay).toHaveBeenCalledWith([
      'X', null, null,
      null, null, null,
      null, null, null
    ])
  })

  it('should call onPlay with O when O is next and square is clicked', () => {
    const squares = Array(9).fill(null)
    render(<Board xIsNext={false} squares={squares} onPlay={mockOnPlay} />)
    
    const firstSquare = screen.getAllByRole('button')[0]
    fireEvent.click(firstSquare)
    
    expect(mockOnPlay).toHaveBeenCalledWith([
      'O', null, null,
      null, null, null,
      null, null, null
    ])
  })

  it('should not call onPlay when clicking on an occupied square', () => {
    const squares = ['X', null, null, null, null, null, null, null, null]
    render(<Board xIsNext={false} squares={squares} onPlay={mockOnPlay} />)
    
    const firstSquare = screen.getAllByRole('button')[0]
    fireEvent.click(firstSquare)
    
    expect(mockOnPlay).not.toHaveBeenCalled()
  })

  it('should not call onPlay when there is already a winner', () => {
    const squares = ['X', 'X', 'X', null, null, null, null, null, null]
    render(<Board xIsNext={false} squares={squares} onPlay={mockOnPlay} />)
    
    const fourthSquare = screen.getAllByRole('button')[3]
    fireEvent.click(fourthSquare)
    
    expect(mockOnPlay).not.toHaveBeenCalled()
  })

  it('should show modal when X wins horizontally', async () => {
    const squares = ['X', 'X', 'X', null, null, null, null, null, null]
    render(<Board xIsNext={false} squares={squares} onPlay={mockOnPlay} />)
    
    await waitFor(() => {
      expect(screen.getByTestId('modal')).toBeInTheDocument()
    })
    
    expect(screen.getByText('Parabéns!')).toBeInTheDocument()
    expect(screen.getByText(/O jogador X venceu!/)).toBeInTheDocument()
  })

  it('should show modal when O wins vertically', async () => {
    const squares = ['O', null, null, 'O', null, null, 'O', null, null]
    render(<Board xIsNext={true} squares={squares} onPlay={mockOnPlay} />)
    
    await waitFor(() => {
      expect(screen.getByTestId('modal')).toBeInTheDocument()
    })
    
    expect(screen.getByText('Parabéns!')).toBeInTheDocument()
    expect(screen.getByText(/O jogador O venceu!/)).toBeInTheDocument()
  })

  it('should show modal when X wins diagonally', async () => {
    const squares = ['X', null, null, null, 'X', null, null, null, 'X']
    render(<Board xIsNext={false} squares={squares} onPlay={mockOnPlay} />)
    
    await waitFor(() => {
      expect(screen.getByTestId('modal')).toBeInTheDocument()
    })
    
    expect(screen.getByText('Parabéns!')).toBeInTheDocument()
    expect(screen.getByText(/O jogador X venceu!/)).toBeInTheDocument()
  })

  it('should close modal when close button is clicked', async () => {
    const squares = ['X', 'X', 'X', null, null, null, null, null, null]
    render(<Board xIsNext={false} squares={squares} onPlay={mockOnPlay} />)
    
    await waitFor(() => {
      expect(screen.getByTestId('modal')).toBeInTheDocument()
    })
    
    const closeButton = screen.getByText('Fechar')
    fireEvent.click(closeButton)
    
    await waitFor(() => {
      expect(screen.queryByTestId('modal')).not.toBeInTheDocument()
    })
  })

  it('should display winner image in modal', async () => {
    const squares = ['X', 'X', 'X', null, null, null, null, null, null]
    render(<Board xIsNext={false} squares={squares} onPlay={mockOnPlay} />)
    
    await waitFor(() => {
      expect(screen.getByTestId('modal')).toBeInTheDocument()
    })
    
    const winnerImage = screen.getByAltText('Winner')
    expect(winnerImage).toBeInTheDocument()
    expect(winnerImage).toHaveAttribute('src', '/winner.png')
  })

  it('should render squares with correct values', () => {
    const squares = ['X', 'O', 'X', null, 'O', null, 'X', null, 'O']
    render(<Board xIsNext={true} squares={squares} onPlay={mockOnPlay} />)
    
    const squareButtons = screen.getAllByRole('button').filter(button => 
      button.classList.contains('square')
    )
    
    expect(squareButtons[0]).toHaveTextContent('X')
    expect(squareButtons[1]).toHaveTextContent('O')
    expect(squareButtons[2]).toHaveTextContent('X')
    expect(squareButtons[3]).toHaveTextContent('')
    expect(squareButtons[4]).toHaveTextContent('O')
    expect(squareButtons[5]).toHaveTextContent('')
    expect(squareButtons[6]).toHaveTextContent('X')
    expect(squareButtons[7]).toHaveTextContent('')
    expect(squareButtons[8]).toHaveTextContent('O')
  })

  it('should have correct CSS classes for layout', () => {
    const squares = Array(9).fill(null)
    render(<Board xIsNext={true} squares={squares} onPlay={mockOnPlay} />)
    
    const boardContainer = screen.getByText('Next player: X').closest('div')
    expect(boardContainer).toHaveClass('flex', 'flex-col', 'items-center', 'justify-center')
  })
}) 