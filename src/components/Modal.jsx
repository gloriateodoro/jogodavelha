import React, { useEffect, useRef } from 'react';

export function Modal({ isOpen, onClose, children, title, description }) {
  const modalRef = useRef(null);
  const previousFocusRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      // Salvar o elemento que tinha foco antes de abrir o modal
      previousFocusRef.current = document.activeElement;
      
      // Focar no modal quando abrir
      if (modalRef.current) {
        modalRef.current.focus();
      }
    } else {
      // Retornar o foco quando fechar o modal
      if (previousFocusRef.current) {
        previousFocusRef.current.focus();
      }
    }
  }, [isOpen]);

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      onClose();
    }
  };

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center z-50" 
      style={{ backgroundColor: 'var(--color-bg-overlay)' }}
      onClick={handleBackdropClick}
      role="presentation"
    >
      <div 
        ref={modalRef}
        className="rounded-xl p-8 max-w-lg w-full mx-4 shadow-2xl transform transition-all" 
        style={{ backgroundColor: 'var(--color-bg-primary)' }}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "modal-title" : undefined}
        aria-describedby={description ? "modal-description" : undefined}
        onKeyDown={handleKeyDown}
        tabIndex={-1}
      >
        <div className="text-center">
          {title && (
            <h2 id="modal-title" className="text-2xl font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>
              {title}
            </h2>
          )}
          {description && (
            <p id="modal-description" className="text-lg mb-6" style={{ color: 'var(--color-text-secondary)' }}>
              {description}
            </p>
          )}
          {children}
          <button
            onClick={onClose}
            className="mt-8 font-bold py-3 px-8 rounded-lg transition-colors text-lg"
            style={{ 
              backgroundColor: 'var(--color-accent)',
              color: 'var(--color-text-light)'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--color-accent-dark)'}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'var(--color-accent)'}
            aria-label="Fechar modal"
            type="button"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
} 