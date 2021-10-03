import React, { useState } from 'react';
import { Gameboard } from '../gameboard/Gameboard';
import {
  InitialScreen,
  GameScreen,
  EndGameScreen,
  GameboardsPanel,
  CurrentPlayer,
  SurrenderButton,
  EnterName,
} from './battleshipStyles';

function Battleship() {
  const [stage] = useState<string>('initial');

  // game screen
  if (stage === 'game') {
    return (
      <GameScreen>
        <GameboardsPanel>
          <Gameboard withName type="player" miniature ownShipsList={[1, 2, 4, 6, 7]} destroyedShipsList={[32, 42, 52, 62]} hittedShipsList={[]} missedShipsList={[]} />
          <Gameboard withName type="cpu" ownShipsList={[]} destroyedShipsList={[]} hittedShipsList={[50]} missedShipsList={[51]} />
        </GameboardsPanel>
        <div>
          <SurrenderButton>SURRENDER</SurrenderButton>
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
          <SurrenderButton>START GAME</SurrenderButton>
          <CurrentPlayer>
            <EnterName id="name" name="name" placeholder="Player name" />
          </CurrentPlayer>
        </div>
      </InitialScreen>
    );
  }
  return (<EndGameScreen><div /></EndGameScreen>);
}

export default Battleship;
