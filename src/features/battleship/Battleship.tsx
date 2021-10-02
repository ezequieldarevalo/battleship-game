import React, { useState } from 'react';
import { Gameboard } from '../gameboard/Gameboard';
import {
  InitialScreen, GameScreen, GameboardsPanel, CurrentPlayer, SurrenderButton, InfoAndActionsPanel,
} from './battleshipStyles';

function Battleship() {
  const [stage] = useState<string>('initial');

  // only game screen
  if (stage === 'game') {
    return (
      <GameScreen>
        <GameboardsPanel>
          <Gameboard withName type="player" miniature ownShipsList={[1, 2, 4, 6, 7]} destroyedShipsList={[32, 42, 52, 62]} hittedShipsList={[]} missedShipsList={[]} />
          <Gameboard withName type="cpu" ownShipsList={[]} destroyedShipsList={[]} hittedShipsList={[50]} missedShipsList={[51]} />
        </GameboardsPanel>
        <InfoAndActionsPanel>
          <SurrenderButton>SURRENDER</SurrenderButton>
          <CurrentPlayer>Playing: Player</CurrentPlayer>
        </InfoAndActionsPanel>
      </GameScreen>
    );
  }
  // Initial stage screen
  return (
    <InitialScreen>
      <Gameboard type="player" ownShipsList={[]} destroyedShipsList={[]} hittedShipsList={[]} missedShipsList={[]} />
    </InitialScreen>
  );
}

export default Battleship;
