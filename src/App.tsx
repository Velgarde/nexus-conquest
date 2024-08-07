import React from 'react';
import Game from './components/Game';
import styled from 'styled-components';

const App: React.FC = () => {
    return (
        <AppContainer>
            <Title>Nexus Conquest</Title>
            <Game />
        </AppContainer>
    );
};

const AppContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
    padding: 20px;
    background-color: #1a1a1a;
`;

const Title = styled.h1`
    font-size: 2.5rem;
    color: #f0f0f0;
    margin-bottom: 20px;
`;
export default App;