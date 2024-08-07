import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Board from './Board';
import Controls from './Controls';
import InfoPanel from './InfoPanel';
import RulesModal from './RulesModel';
import { GameState, Move, Player } from '../types';
import { initializeBoard } from '../utils/boardUtils';
import { isValidMove, performMove, isGameOver, getValidMoves, placeBarrier, removeBarrier } from '../utils/gameLogic';

const Game: React.FC = () => {
    const [gameState, setGameState] = useState<GameState>({
        board: initializeBoard(),
        currentPlayer: 1,
        round: 1,
        selectedPiece: null,
        controlPoints: [0, 0],
        barriers: [],
    });

    const [validMoves, setValidMoves] = useState<[number, number][]>([]);
    const [showRules, setShowRules] = useState(false);
    const [gameOver, setGameOver] = useState<Player | null>(null);

    useEffect(() => {
        const winner = isGameOver(gameState);
        if (winner) setGameOver(winner);
    }, [gameState]);

    const handleHexClick = (row: number, col: number) => {
        const piece = gameState.board[row][col];

        if (gameState.selectedPiece) {
            const move: Move = { from: gameState.selectedPiece, to: [row, col] };
            if (isValidMove(gameState, move)) {
                const newGameState = performMove(gameState, move);
                setGameState(newGameState);
                endTurn();
            } else {
                setGameState({ ...gameState, selectedPiece: null });
            }
            setValidMoves([]);
        } else if (piece.player === gameState.currentPlayer) {
            setGameState({ ...gameState, selectedPiece: [row, col] });
            setValidMoves(getValidMoves(gameState, [row, col]));
        }
    };

    const endTurn = () => {
        setGameState(prevState => ({
            ...prevState,
            currentPlayer: prevState.currentPlayer === 1 ? 2 : 1,
            round: prevState.currentPlayer === 2 ? prevState.round + 1 : prevState.round,
            selectedPiece: null,
        }));
        setValidMoves([]);
    };

    const handlePlaceBarrier = (row: number, col: number) => {
        setGameState(prevState => placeBarrier(prevState, [row, col]));
    };

    const handleRemoveBarrier = (row: number, col: number) => {
        setGameState(prevState => removeBarrier(prevState, [row, col]));
    };

    const resetGame = () => {
        setGameState({
            board: initializeBoard(),
            currentPlayer: 1,
            round: 1,
            selectedPiece: null,
            controlPoints: [0, 0],
            barriers: [],
        });
        setGameOver(null);
    };

    return (
        <GameContainer>
            <BoardWrapper>
                <Board
                    gameState={gameState}
                    selectedPiece={gameState.selectedPiece}
                    validMoves={validMoves}
                    onHexClick={handleHexClick}
                    onPlaceBarrier={handlePlaceBarrier}
                    onRemoveBarrier={handleRemoveBarrier}
                />
            </BoardWrapper>
            <Sidebar>
                <InfoPanel gameState={gameState} />
                <Controls onEndTurn={endTurn} onShowRules={() => setShowRules(true)} />
            </Sidebar>
            <RulesModal show={showRules} onClose={() => setShowRules(false)} />
            {gameOver && (
                <GameOverModal>
                    <h2>Game Over!</h2>
                    <p>Player {gameOver} wins!</p>
                    <Button onClick={resetGame}>Play Again</Button>
                </GameOverModal>
            )}
        </GameContainer>
    );
};

const GameContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: flex-start;
    gap: 20px;
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    background-color: #1a1a1a;
    color: #f0f0f0;
    min-height: 100vh;

    @media (max-width: 1200px) {
        flex-direction: column;
        align-items: center;
    }
`;

const BoardWrapper = styled.div`
    flex: 1;
    max-width: 800px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const Sidebar = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 300px;
`;

const GameOverModal = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(44, 62, 80, 0.9);
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
    text-align: center;
    color: #f0f0f0;
    backdrop-filter: blur(5px);

    h2 {
        margin-bottom: 20px;
        font-size: 2.5em;
        color: #3498db;
    }

    p {
        margin-bottom: 30px;
        font-size: 1.2em;
    }
`;

const Button = styled.button`
    padding: 12px 24px;
    font-size: 1.1rem;
    border: none;
    border-radius: 5px;
    background-color: #3498db;
    color: white;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        background-color: #2980b9;
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }

    &:active {
        transform: translateY(0);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }
`;

export default Game;