import React from 'react';
import { Gameboard } from '../gameboard/Gameboard';
import {
  ScreenGame, GameboardsPanel, CurrentPlayer, SurrenderButton, InfoAndActionsPanel,
} from './battleshipStyles';

function Battleship() {
  // const stage = 'game';

  // only game screen
  // if (stage === 'game') {
  return (
    <ScreenGame>
      <GameboardsPanel>
        <Gameboard type="player" miniature ownShipsList={[1, 2, 4, 6, 7]} destroyedShipsList={[32, 42, 52, 62]} hittedShipsList={[]} missedShipsList={[]} />
        <Gameboard type="cpu" miniature={false} ownShipsList={[]} destroyedShipsList={[]} hittedShipsList={[50]} missedShipsList={[51]} />
      </GameboardsPanel>
      <InfoAndActionsPanel>
        <SurrenderButton>SURRENDER</SurrenderButton>
        <CurrentPlayer>Playing: Player</CurrentPlayer>
      </InfoAndActionsPanel>
    </ScreenGame>
  );
  // }
}

export default Battleship;
