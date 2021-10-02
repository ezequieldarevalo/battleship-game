import React from 'react';
import styled from 'styled-components';
import Battleship from './features/battleship/Battleship';

const AppContainer = styled.div`
  margin-top: 30px;
  margin-left: 30px;

`;

function App() {
  return (
    <AppContainer>
      BATTLESHIP GAME
      <br />
      <Battleship />

    </AppContainer>
  );
}

export default App;
