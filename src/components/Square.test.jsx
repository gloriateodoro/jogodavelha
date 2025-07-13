import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Square } from './Square'

describe('Square Component', () => {
  it('should render with empty value', () => {
    const mockClick = vi.fn()
    render(<Square value={null} onSquareClick={mockClick} />)
    
    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
    expect(button).toHaveTextContent('')
  })

  it('should render with X value', () => {
    const mockClick = vi.fn()
    render(<Square value="X" onSquareClick={mockClick} />)
    
    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
    expect(button).toHaveTextContent('X')
  })

  it('should render with O value', () => {
    const mockClick = vi.fn()
    render(<Square value="O" onSquareClick={mockClick} />)
    
    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
    expect(button).toHaveTextContent('O')
  })

  it('should call onSquareClick when clicked', () => {
    const mockClick = vi.fn()
    render(<Square value={null} onSquareClick={mockClick} />)
    
    const button = screen.getByRole('button')
    fireEvent.click(button)
    
    expect(mockClick).toHaveBeenCalledTimes(1)
  })

  it('should have correct CSS class', () => {
    const mockClick = vi.fn()
    render(<Square value={null} onSquareClick={mockClick} />)
    
    const button = screen.getByRole('button')
    expect(button).toHaveClass('square')
  })

  it('should be clickable when empty', () => {
    const mockClick = vi.fn()
    render(<Square value={null} onSquareClick={mockClick} />)
    
    const button = screen.getByRole('button')
    expect(button).not.toBeDisabled()
  })
}) 