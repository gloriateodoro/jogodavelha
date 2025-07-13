import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Modal } from './Modal'

describe('Modal Component', () => {
  it('should not render when isOpen is false', () => {
    const mockClose = vi.fn()
    render(
      <Modal isOpen={false} onClose={mockClose}>
        <div>Modal Content</div>
      </Modal>
    )
    
    expect(screen.queryByText('Modal Content')).not.toBeInTheDocument()
  })

  it('should render when isOpen is true', () => {
    const mockClose = vi.fn()
    render(
      <Modal isOpen={true} onClose={mockClose}>
        <div>Modal Content</div>
      </Modal>
    )
    
    expect(screen.getByText('Modal Content')).toBeInTheDocument()
  })

  it('should call onClose when close button is clicked', () => {
    const mockClose = vi.fn()
    render(
      <Modal isOpen={true} onClose={mockClose}>
        <div>Modal Content</div>
      </Modal>
    )
    
    const closeButton = screen.getByText('Fechar')
    fireEvent.click(closeButton)
    
    expect(mockClose).toHaveBeenCalledTimes(1)
  })

  it('should render close button', () => {
    const mockClose = vi.fn()
    render(
      <Modal isOpen={true} onClose={mockClose}>
        <div>Modal Content</div>
      </Modal>
    )
    
    const closeButton = screen.getByRole('button', { name: 'Fechar' })
    expect(closeButton).toBeInTheDocument()
  })

  it('should render children content', () => {
    const mockClose = vi.fn()
    render(
      <Modal isOpen={true} onClose={mockClose}>
        <h1>Test Title</h1>
        <p>Test paragraph</p>
      </Modal>
    )
    
    expect(screen.getByText('Test Title')).toBeInTheDocument()
    expect(screen.getByText('Test paragraph')).toBeInTheDocument()
  })

  it('should have proper styling classes', () => {
    const mockClose = vi.fn()
    render(
      <Modal isOpen={true} onClose={mockClose}>
        <div>Modal Content</div>
      </Modal>
    )
    
    const modalContainer = screen.getByText('Modal Content').closest('div')
    expect(modalContainer).toHaveClass('text-center')
  })
}) 