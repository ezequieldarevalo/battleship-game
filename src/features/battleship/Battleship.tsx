import React from 'react';
import Gameboard from '../../components/Gameboard';
import {
  Screen,
  GameboardsPanel,
  CurrentPlayer,
  Button,
  WinnerName,
  WinnerDescription,
} from '../../components/common/styles/screen';
import InitialStage from './InitialStage';
import { useAppSelector } from '../../app/hooks';
// import { selectPlayer, selectStage } from './battleshipSlice';
import { selectStage, selectHumanPlayer, selectCpuPlayer } from './battleshipSlice';
import { BEGIN_STAGE, GAME_STAGE } from '../../lib/common/constants';

function Battleship() {
  const stage = useAppSelector(selectStage);
  const playerInfo = useAppSelector(selectHumanPlayer);
  const cpuInfo = useAppSelector(selectCpuPlayer);
  console.log(playerInfo);
  console.log(cpuInfo);

  // const ownShipTotalArea = getOwnCellShipsFromShipsList(playerInfo.ownShips);

  // GAME SCREEN
  if (stage === GAME_STAGE) {
    return (
      <Screen>
        <GameboardsPanel>
          <Gameboard id={playerInfo.name} withName type="human" miniature gameState={playerInfo.gameboardState} />
          <Gameboard id={cpuInfo.name} withName type="cpu" gameState={cpuInfo.gameboardState} />
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
  if (stage === BEGIN_STAGE) {
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
