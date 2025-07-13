import { Square } from './Square';
import { Modal } from './Modal';
import { useState, useEffect } from 'react';
import '../App.css';

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
};

export function Board({ xIsNext, squares, onPlay }) {
    const [showModal, setShowModal] = useState(false);
    const [currentWinner, setCurrentWinner] = useState(null);

    function handleClick(i) {
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        const nextSquares = squares.slice();
        if (xIsNext) {
            nextSquares[i] = 'X';
        } else {
            nextSquares[i] = 'O';
        }
        onPlay(nextSquares);
    }

    const winner = calculateWinner(squares);
    let status;
    
    // Verificar se há um novo vencedor
    useEffect(() => {
        if (winner && winner !== currentWinner) {
            setCurrentWinner(winner);
            setShowModal(true);
        }
    }, [winner, currentWinner]);

    if (winner) {
        status = 'Next player: ' + (xIsNext ? 'X' : 'O');
    } else {
        status = 'Next player: ' + (xIsNext ? 'X' : 'O');
    }

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="next-player-status" role="status" aria-live="polite">
                {status}
            </div>
            <div 
                role="grid" 
                aria-label="Tabuleiro do jogo da velha"
                className="board-container"
            >
                <div className="board-row" role="row">
                    <Square value={squares[0]} onSquareClick={() => handleClick(0)} position={0} />
                    <Square value={squares[1]} onSquareClick={() => handleClick(1)} position={1} />
                    <Square value={squares[2]} onSquareClick={() => handleClick(2)} position={2} />
                </div>
                <div className="board-row" role="row">
                    <Square value={squares[3]} onSquareClick={() => handleClick(3)} position={3} />
                    <Square value={squares[4]} onSquareClick={() => handleClick(4)} position={4} />
                    <Square value={squares[5]} onSquareClick={() => handleClick(5)} position={5} />
                </div>
                <div className="board-row" role="row">
                    <Square value={squares[6]} onSquareClick={() => handleClick(6)} position={6} />
                    <Square value={squares[7]} onSquareClick={() => handleClick(7)} position={7} />
                    <Square value={squares[8]} onSquareClick={() => handleClick(8)} position={8} />
                </div>
            </div>
            
            <Modal 
                isOpen={showModal} 
                onClose={() => setShowModal(false)}
                title="Fim de Jogo"
                description={`O jogador ${currentWinner} venceu o jogo da velha!`}
            >
                <div className="text-center">
                    <img src="/winner.png" alt="Troféu do vencedor" className="mx-auto mb-6 w-40 h-40" />
                    <h2 className="text-4xl font-bold mb-4" style={{ color: 'var(--color-success)' }}>
                        Parabéns!
                    </h2>
                    <p className="text-2xl mb-4" style={{ color: 'var(--color-text-primary)' }}>
                        O jogador <span className="font-bold" style={{ color: 'var(--color-accent)' }}>{currentWinner}</span> venceu!
                    </p>
                    <p className="text-lg" style={{ color: 'var(--color-text-secondary)' }}>
                        Fim de jogo
                    </p>
                </div>
            </Modal>
        </div>
    );
}