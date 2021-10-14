import React, { useEffect } from 'react';
import Gameboard from './Gameboard';
import {
  Screen,
  GameboardsPanel,
  CurrentPlayer,
  Button,
  WinnerName,
  GameboardSeparator,
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
import I18n from '../../components/common/i18n';

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
          <GameboardSeparator />
          <Gameboard active={activePlayer === 'human'} id={cpuInfo.name} withName type="cpu" gameState={cpuInfo.gameboardState} />
        </GameboardsPanel>
        <div>
          <Button onClick={() => dispatch(surrender())}>
            <I18n id="app.gameStage.button.surrender" />
          </Button>
          <CurrentPlayer>
            <I18n id="app.gameStage.playerIndicator.playing" />
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
          <I18n id="app.endgameStage.winnerIndicator" />
          {' '}
          {winner}
        </WinnerName>
        <Button onClick={() => dispatch(restart())}>
          <I18n id="app.endgameStage.button.restart" />
        </Button>
      </div>
    </Screen>
  );
}

export default Battleship;
