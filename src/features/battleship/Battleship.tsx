import React, { useState } from 'react';
import Gameboard from '../../components/Gameboard';
import {
  Screen,
  GameboardsPanel,
  CurrentPlayer,
  Button,
  WinnerName,
  WinnerDescription,
} from '../../components/common/styles/screen';
import InitialStage from '../initialStage/InitialStage';

function Battleship() {
  const [stage] = useState<string>('initial');

  // GAME SCREEN
  if (stage === 'game') {
    return (
      <Screen>
        <GameboardsPanel>
          <Gameboard id="player" withName type="player" miniature ownShipsList={[1, 2, 4, 6, 7]} destroyedShipsList={[32, 42, 52, 62]} hittedShipsList={[]} missedShipsList={[]} />
          <Gameboard id="cpu" withName type="cpu" ownShipsList={[]} destroyedShipsList={[]} hittedShipsList={[50]} missedShipsList={[51]} />
        </GameboardsPanel>
        <div>
          <Button>
            SURRENDER
          </Button>
          <CurrentPlayer>Playing: Player</CurrentPlayer>
        </div>
      </Screen>
    );
  }

  // INITIAL SCREEN
  if (stage === 'initial') {
    return (
      <InitialStage />
    );
  }
  // ENDGAME SCREEN
  return (
    <Screen>
      <div>
        <WinnerName>Winner is: CPU</WinnerName>
        <WinnerDescription>Player surrendered</WinnerDescription>
        <Button>
          Restart game
        </Button>
      </div>
    </Screen>
  );
}

export default Battleship;
