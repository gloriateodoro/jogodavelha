import React from 'react';

export function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50" style={{ backgroundColor: 'var(--color-bg-overlay)' }}>
      <div className="rounded-xl p-8 max-w-lg w-full mx-4 shadow-2xl transform transition-all" style={{ backgroundColor: 'var(--color-bg-primary)' }}>
        <div className="text-center">
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
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
} 