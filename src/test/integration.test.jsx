import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Game from '../App'

// Mock do componente Modal
vi.mock('../components/Modal', () => ({
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

describe('Game Integration Tests', () => {
  it('should allow a complete game flow', async () => {
    render(<Game />)
    
    // Verifica estado inicial
    expect(screen.getByText('Next player: X')).toBeInTheDocument()
    
    // Primeira jogada - X
    const squares = screen.getAllByRole('button').filter(button => 
      button.classList.contains('square')
    )
    fireEvent.click(squares[0]) // X joga na posição 0
    
    // Verifica se X foi colocado
    expect(squares[0]).toHaveTextContent('X')
    
    // Verifica se agora é a vez do O
    expect(screen.getByText('Next player: O')).toBeInTheDocument()
    
    // Segunda jogada - O
    fireEvent.click(squares[1]) // O joga na posição 1
    
    // Verifica se O foi colocado
    expect(squares[1]).toHaveTextContent('O')
    
    // Verifica se agora é a vez do X novamente
    expect(screen.getByText('Next player: X')).toBeInTheDocument()
  })

  it('should prevent playing on occupied squares', () => {
    render(<Game />)
    
    const squares = screen.getAllByRole('button').filter(button => 
      button.classList.contains('square')
    )
    
    // X joga na posição 0
    fireEvent.click(squares[0])
    expect(squares[0]).toHaveTextContent('X')
    
    // Tenta jogar novamente na mesma posição
    fireEvent.click(squares[0])
    expect(squares[0]).toHaveTextContent('X') // Deve permanecer X
  })

  it('should show winner modal when X wins', async () => {
    render(<Game />)
    
    const squares = screen.getAllByRole('button').filter(button => 
      button.classList.contains('square')
    )
    
    // X vence na primeira linha
    fireEvent.click(squares[0]) // X
    fireEvent.click(squares[3]) // O
    fireEvent.click(squares[1]) // X
    fireEvent.click(squares[4]) // O
    fireEvent.click(squares[2]) // X - VITÓRIA!
    
    await waitFor(() => {
      expect(screen.getByTestId('modal')).toBeInTheDocument()
    })
    
    expect(screen.getByText('Parabéns!')).toBeInTheDocument()
    expect(screen.getByText(/O jogador X venceu!/)).toBeInTheDocument()
  })

  it('should show winner modal when O wins', async () => {
    render(<Game />)
    
    const squares = screen.getAllByRole('button').filter(button => 
      button.classList.contains('square')
    )
    
    // O vence na diagonal
    fireEvent.click(squares[1]) // X
    fireEvent.click(squares[0]) // O
    fireEvent.click(squares[2]) // X
    fireEvent.click(squares[4]) // O
    fireEvent.click(squares[6]) // X
    fireEvent.click(squares[8]) // O - VITÓRIA!
    
    await waitFor(() => {
      expect(screen.getByTestId('modal')).toBeInTheDocument()
    })
    
    expect(screen.getByText('Parabéns!')).toBeInTheDocument()
    expect(screen.getByText(/O jogador O venceu!/)).toBeInTheDocument()
  })

  it('should close modal when close button is clicked', async () => {
    render(<Game />)
    
    const squares = screen.getAllByRole('button').filter(button => 
      button.classList.contains('square')
    )
    
    // X vence
    fireEvent.click(squares[0]) // X
    fireEvent.click(squares[3]) // O
    fireEvent.click(squares[1]) // X
    fireEvent.click(squares[4]) // O
    fireEvent.click(squares[2]) // X - VITÓRIA!
    
    await waitFor(() => {
      expect(screen.getByTestId('modal')).toBeInTheDocument()
    })
    
    // Fecha o modal
    const closeButton = screen.getByText('Fechar')
    fireEvent.click(closeButton)
    
    await waitFor(() => {
      expect(screen.queryByTestId('modal')).not.toBeInTheDocument()
    })
  })

  it('should display winner image in modal', async () => {
    render(<Game />)
    
    const squares = screen.getAllByRole('button').filter(button => 
      button.classList.contains('square')
    )
    
    // X vence
    fireEvent.click(squares[0]) // X
    fireEvent.click(squares[3]) // O
    fireEvent.click(squares[1]) // X
    fireEvent.click(squares[4]) // O
    fireEvent.click(squares[2]) // X - VITÓRIA!
    
    await waitFor(() => {
      expect(screen.getByTestId('modal')).toBeInTheDocument()
    })
    
    const winnerImage = screen.getByAltText('Winner')
    expect(winnerImage).toBeInTheDocument()
    expect(winnerImage).toHaveAttribute('src', '/winner.png')
  })

  it('should maintain game state correctly', () => {
    render(<Game />)
    
    const squares = screen.getAllByRole('button').filter(button => 
      button.classList.contains('square')
    )
    
    // Faz algumas jogadas
    fireEvent.click(squares[0]) // X
    fireEvent.click(squares[1]) // O
    fireEvent.click(squares[2]) // X
    
    // Verifica se o estado está correto
    expect(squares[0]).toHaveTextContent('X')
    expect(squares[1]).toHaveTextContent('O')
    expect(squares[2]).toHaveTextContent('X')
    expect(squares[3]).toHaveTextContent('')
    expect(squares[4]).toHaveTextContent('')
    expect(squares[5]).toHaveTextContent('')
    expect(squares[6]).toHaveTextContent('')
    expect(squares[7]).toHaveTextContent('')
    expect(squares[8]).toHaveTextContent('')
  })

  it('should display correct next player message throughout the game', () => {
    render(<Game />)
    
    const squares = screen.getAllByRole('button').filter(button => 
      button.classList.contains('square')
    )
    
    // Início - X deve jogar
    expect(screen.getByText('Next player: X')).toBeInTheDocument()
    
    // X joga
    fireEvent.click(squares[0])
    expect(screen.getByText('Next player: O')).toBeInTheDocument()
    
    // O joga
    fireEvent.click(squares[1])
    expect(screen.getByText('Next player: X')).toBeInTheDocument()
    
    // X joga novamente
    fireEvent.click(squares[2])
    expect(screen.getByText('Next player: O')).toBeInTheDocument()
  })
}) 