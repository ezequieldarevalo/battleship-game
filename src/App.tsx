import React from 'react';
import styled from 'styled-components';
import Battleship from './features/battleship/Battleship';

const AppContainer = styled.div`
  display: grid;
  grid-template-columns:20px auto 20px;
  justify-content:center;
  @media (max-width: 996px) {
    grid-template-columns:10px auto 10px;
  }
`;

function App() {
  return (
    <AppContainer>
      <div id="margin-left" />
      <div id="main-container">
        BATTLESHIP GAME
        <br />
        <Battleship />
      </div>
      <div id="margin-right" />
    </AppContainer>
  );
}

export default App;
