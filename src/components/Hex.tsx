import React from 'react';
import styled from 'styled-components';
import { PieceType } from '../types';
import Piece from './Piece';

interface HexProps {
    piece: {
        type: PieceType;
        player: number;
    };
    row: number;
    col: number;
    isSelected: boolean;
    isValidMove: boolean;
    hasBarrier: boolean;
    isCurrentPlayerZone: boolean;
    onClick: () => void;
    onPlaceBarrier: () => void;
    onRemoveBarrier: () => void;
}

const Hex: React.FC<HexProps> = ({
                                     piece,
                                     isSelected,
                                     isValidMove,
                                     hasBarrier,
                                     isCurrentPlayerZone,
                                     onClick,
                                     onPlaceBarrier,
                                     onRemoveBarrier,
                                 }) => {
    const handleContextMenu = (e: React.MouseEvent) => {
        e.preventDefault();
        hasBarrier ? onRemoveBarrier() : onPlaceBarrier();
    };

    return (
        <HexContainer
            onClick={onClick}
            onContextMenu={handleContextMenu}
            isSelected={isSelected}
            isValidMove={isValidMove}
            hasBarrier={hasBarrier}
            isCurrentPlayerZone={isCurrentPlayerZone}
        >
            <HexInner>
                {piece.type !== PieceType.Empty && (
                    <Piece type={piece.type} player={piece.player} />
                )}
                {hasBarrier && <Barrier />}
            </HexInner>
        </HexContainer>
    );
};

const HexContainer = styled.div<{
    isSelected: boolean;
    isValidMove: boolean;
    hasBarrier: boolean;
    isCurrentPlayerZone: boolean;
}>`
    width: 52px;
    height: 60px;
    position: relative;
    cursor: pointer;
    clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
    background: ${props =>
            props.isSelected
                    ? 'radial-gradient(circle, #ffd700 0%, #ffa500 100%)'
                    : props.isValidMove
                            ? 'radial-gradient(circle, #90ee90 0%, #32cd32 100%)'
                            : props.isCurrentPlayerZone
                                    ? 'radial-gradient(circle, #4a69bd 0%, #6a89cc 100%)'
                                    : 'radial-gradient(circle, #2c3e50 0%, #34495e 100%)'};
    transition: all 0.3s ease;

    &:hover {
        transform: scale(1.05);
        z-index: 10;
        box-shadow: 0 0 15px rgba(255, 255, 255, 0.5);
    }
`;

const HexInner = styled.div`
    position: absolute;
    top: 1px;
    left: 1px;
    right: 1px;
    bottom: 1px;
    background: #1a1a1a;
    clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Barrier = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 0, 0, 0.5);
    clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
`;

export default Hex;