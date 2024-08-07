import React from 'react';
import styled from 'styled-components';

interface RulesModalProps {
    show: boolean;
    onClose: () => void;
}

const RulesModal: React.FC<RulesModalProps> = ({ show, onClose }) => {
    if (!show) return null;

    return (
        <ModalOverlay onClick={onClose}>
            <ModalContent onClick={e => e.stopPropagation()}>
                <h2>Nexus Conquest Rules</h2>
                <RulesList>
                    <li>The game is played on a hexagonal grid with 61 hexes.</li>
                    <li>Each player starts with 12 pieces: 1 Commander, 3 Scouts, 4 Soldiers, and 4 Engineers.</li>
                    <li>Players take turns moving one piece per turn.</li>
                    <li>Movement ranges: Commander (1 hex), Scout (up to 3 hexes), Soldier (up to 2 hexes), Engineer (1 hex).</li>
                    <li>Capture opponent's pieces by moving onto their hex.</li>
                    <li>The Commander can't be captured; it must be surrounded on all sides to win.</li>
                    <li>Special abilities:
                        <ul>
                            <li>Scout: Can move through occupied hexes.</li>
                            <li>Soldier: Can push an adjacent piece one hex once per turn.</li>
                            <li>Engineer: Can place or remove barriers on adjacent empty hexes.</li>
                        </ul>
                    </li>
                    <li>Maximum of 6 barriers on the board at any time.</li>
                    <li>Control neutral zone hexes to gain points.</li>
                    <li>Every 5 rounds, players can bring back one captured piece to their end zone.</li>
                    <li>Win by surrounding the opponent's Commander or having the most control points after 15 rounds.</li>
                </RulesList>
                <CloseButton onClick={onClose}>Close</CloseButton>
            </ModalContent>
        </ModalOverlay>
    );
};

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    backdrop-filter: blur(5px);
`;

const ModalContent = styled.div`
    background-color: #2c3e50;
    padding: 30px;
    border-radius: 10px;
    max-width: 600px;
    max-height: 80vh;
    overflow-y: auto;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    color: #f0f0f0;

    h2 {
        margin-bottom: 20px;
        text-align: center;
        color: #3498db;
    }
`;

const RulesList = styled.ul`
    margin-top: 10px;
    margin-bottom: 20px;
    padding-left: 20px;

    li {
        margin-bottom: 10px;
    }

    ul {
        margin-top: 5px;
        margin-left: 20px;
    }
`;

const CloseButton = styled.button`
    margin-top: 20px;
    padding: 10px 20px;
    font-size: 1rem;
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

export default RulesModal;