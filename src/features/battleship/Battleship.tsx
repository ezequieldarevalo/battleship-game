import React, { useState } from 'react';
import { Gameboard } from '../gameboard/Gameboard';
import {
  InitialScreen,
  GameScreen,
  EndGameScreen,
  GameboardsPanel,
  CurrentPlayer,
  Button,
  EnterName,
  WinnerName,
  WinnerDescription,
} from './battleshipStyles';

function Battleship() {
  const [stage] = useState<string>('end');

  // game screen
  if (stage === 'game') {
    return (
      <GameScreen>
        <GameboardsPanel>
          <Gameboard withName type="player" miniature ownShipsList={[1, 2, 4, 6, 7]} destroyedShipsList={[32, 42, 52, 62]} hittedShipsList={[]} missedShipsList={[]} />
          <Gameboard withName type="cpu" ownShipsList={[]} destroyedShipsList={[]} hittedShipsList={[50]} missedShipsList={[51]} />
        </GameboardsPanel>
        <div>
          <Button>
            SURRENDER
          </Button>
          <CurrentPlayer>Playing: Player</CurrentPlayer>
        </div>
      </GameScreen>
    );
  }
  if (stage === 'initial') {
    return (
      <InitialScreen>
        <Gameboard type="player" ownShipsList={[]} destroyedShipsList={[]} hittedShipsList={[]} missedShipsList={[]} />
        <div>
          <Button>
            START GAME
          </Button>
          <CurrentPlayer>
            <EnterName id="name" name="name" placeholder="Player name" />
          </CurrentPlayer>
        </div>
      </InitialScreen>
    );
  }
  return (
    <EndGameScreen>
      <div>
        <WinnerName>Winner is: CPU</WinnerName>
        <WinnerDescription>Player surrendered</WinnerDescription>
        <Button>
          Restart game
        </Button>
      </div>
    </EndGameScreen>
  );
}

export default Battleship;
