import React from 'react';
import styled from 'styled-components';
import { PieceType } from '../types';

interface PieceProps {
    type: PieceType;
    player: number;
}

const Piece: React.FC<PieceProps> = ({ type, player }) => {
    return (
        <PieceContainer player={player}>
            {getPieceSymbol(type)}
        </PieceContainer>
    );
};

const PieceContainer = styled.div<{ player: number }>`
    width: 80%;
    height: 80%;
    border-radius: 50%;
    background-color: ${props => (props.player === 1 ? '#3498db' : '#e74c3c')};
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    color: white;
    font-size: 1.5em;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease;

    &:hover {
        transform: scale(1.1);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    }
`;

function getPieceSymbol(type: PieceType): JSX.Element {
    switch (type) {
        case PieceType.Commander:
            return (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                    <path d="M12 2L1 21h22L12 2zm0 4.6l6.2 10.8H5.8L12 6.6z"/>
                </svg>
            );
        case PieceType.Scout:
            return (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                    <path d="M9.5 3L5 7.5V20h14V7.5L14.5 3H9.5zM11 5h2v2h-2V5zM7 9h10v2H7V9zm0 4h10v2H7v-2zm0 4h10v2H7v-2z"/>
                </svg>
            );
        case PieceType.Soldier:
            return (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                    <path d="M12 2L9 7H3l3 5-3 5h6l3 5 3-5h6l-3-5 3-5h-6l-3-5zm0 4.6l1.8 3.1h3.6l-1.8 3.1 1.8 3.1h-3.6L12 19l-1.8-3.1H6.6l1.8-3.1-1.8-3.1h3.6L12 6.6z"/>
                </svg>
            );
        case PieceType.Engineer:
            return (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                    <path d="M3 17v2h18v-2H3zm0-7v2h18v-2H3zm0-7v2h18V3H3z"/>
                </svg>
            );
        default:
            return <span> - </span>;
    }
}

export default Piece;