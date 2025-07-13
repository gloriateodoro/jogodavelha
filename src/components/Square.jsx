import '../App.css';

export function Square({ value, onSquareClick, position }) {
    const handleKeyDown = (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            onSquareClick();
        }
    };

    const getAriaLabel = () => {
        if (value) {
            return `Quadrado ${position + 1} ocupado por ${value}`;
        }
        return `Quadrado ${position + 1} vazio, clique para jogar`;
    };

    return (
        <button 
            className="square" 
            onClick={onSquareClick}
            onKeyDown={handleKeyDown}
            aria-label={getAriaLabel()}
            aria-pressed={!!value}
            role="gridcell"
            tabIndex={0}
        >
            {value}
        </button>
    );
}