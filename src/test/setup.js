import '@testing-library/jest-dom'

// Mock para imagens
global.Image = class {
  constructor() {
    setTimeout(() => {
      this.onload && this.onload()
    }, 0)
  }
}

// Mock para window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
}) 