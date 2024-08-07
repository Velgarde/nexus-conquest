import React from 'react';
import styled from 'styled-components';
import { GameState } from '../types';

interface InfoPanelProps {
    gameState: GameState;
}

const InfoPanel: React.FC<InfoPanelProps> = ({ gameState }) => {
    return (
        <PanelContainer>
            <TurnIndicator player={gameState.currentPlayer}>
                Player {gameState.currentPlayer}'s Turn
            </TurnIndicator>
            <InfoItem>
                <Label>Round:</Label>
                <Value>{gameState.round}</Value>
            </InfoItem>
            <InfoItem>
                <Label>Control Points:</Label>
                <Value>
                    <PlayerScore player={1}>{gameState.controlPoints[0]}</PlayerScore>
                    {' - '}
                    <PlayerScore player={2}>{gameState.controlPoints[1]}</PlayerScore>
                </Value>
            </InfoItem>
            <InfoItem>
                <Label>Barriers:</Label>
                <Value>{gameState.barriers.length}/6</Value>
            </InfoItem>
        </PanelContainer>
    );
};

const PanelContainer = styled.div`
    background-color: rgba(44, 62, 80, 0.8);
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(5px);
`;

const TurnIndicator = styled.div<{ player: number }>`
    font-size: 1.4em;
    font-weight: bold;
    color: ${props => (props.player === 1 ? '#3498db' : '#e74c3c')};
    margin-bottom: 20px;
    text-align: center;
    padding: 12px;
    background-color: rgba(26, 59, 92, 0.5);
    border-radius: 5px;
    transition: all 0.3s ease;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }
`;

const InfoItem = styled.div`
    margin-bottom: 15px;
    font-size: 1.1em;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #f0f0f0;

    &:last-child {
        margin-bottom: 0;
    }
`;

const Label = styled.span`
    font-weight: bold;
`;

const Value = styled.span`
    font-family: 'Courier New', monospace;
`;

const PlayerScore = styled.span<{ player: number }>`
    color: ${props => (props.player === 1 ? '#3498db' : '#e74c3c')};
    font-weight: bold;
`;

export default InfoPanel;