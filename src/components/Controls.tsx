import React from 'react';
import styled from 'styled-components';

interface ControlsProps {
    onEndTurn: () => void;
    onShowRules: () => void;
}

const Controls: React.FC<ControlsProps> = ({ onEndTurn, onShowRules }) => {
    return (
        <ControlsContainer>
            <Button onClick={onEndTurn}>End Turn</Button>
            <Button secondary onClick={onShowRules}>Show Rules</Button>
        </ControlsContainer>
    );
};

const ControlsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
`;

const Button = styled.button<{ secondary?: boolean }>`
    padding: 12px 20px;
    font-size: 1.1rem;
    border: none;
    border-radius: 5px;
    background-color: ${props => props.secondary ? '#2ecc71' : '#3498db'};
    color: white;
    cursor: pointer;
    transition: all 0.3s ease;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: bold;

    &:hover {
        background-color: ${props => props.secondary ? '#27ae60' : '#2980b9'};
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }

    &:active {
        transform: translateY(0);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }
`;

export default Controls;