import React, { useEffect } from 'react';
import Gameboard from '../../components/Gameboard';
import {
  Screen,
  GameboardsPanel,
  CurrentPlayer,
  Button,
  WinnerName,
} from '../../components/common/styles/screen';
import InitialStage from './InitialStage';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  selectStage,
  selectHumanPlayer,
  selectCpuPlayer,
  selectMessage,
  selectActivePlayer,
  selectWinner,
  hit,
  surrender,
  restart,
} from './battleshipSlice';
import { BEGIN_STAGE, GAME_STAGE } from '../../lib/common/constants';

function Battleship() {
  const stage = useAppSelector(selectStage);
  const playerInfo = useAppSelector(selectHumanPlayer);
  const cpuInfo = useAppSelector(selectCpuPlayer);
  const message = useAppSelector(selectMessage);
  const activePlayer = useAppSelector(selectActivePlayer);
  const winner = useAppSelector(selectWinner);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (activePlayer === 'cpu') {
      setTimeout(() => { dispatch(hit({ cellId: 1, player: 'human' })); }, 2000);
    }
  }, [activePlayer]);

  // GAME SCREEN
  if (stage === GAME_STAGE) {
    return (
      <Screen>
        <GameboardsPanel>
          <Gameboard id={playerInfo.name} withName type="human" miniature gameState={playerInfo.gameboardState} />
          <Gameboard id={cpuInfo.name} withName type="cpu" gameState={cpuInfo.gameboardState} />
        </GameboardsPanel>
        <div>
          <Button onClick={() => dispatch(surrender())}>
            SURRENDER
          </Button>
          <CurrentPlayer>
            Playing:
            {' '}
            { (activePlayer === 'human') ? playerInfo.name : 'CPU (waiting...)' }
          </CurrentPlayer>
        </div>
        <div>
          {message}
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
        <WinnerName>
          Winner is:
          {' '}
          {winner}
        </WinnerName>
        <Button onClick={() => dispatch(restart())}>
          Restart game
        </Button>
      </div>
    </Screen>
  );
}

export default Battleship;
