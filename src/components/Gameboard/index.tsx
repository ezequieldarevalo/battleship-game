import React, { memo } from 'react';
import { ICellState } from '../../lib/common/types';
import {
  BoardContainer, BoardGrid, BoardTitle, CellContainer,
} from './gameboardStyles';
import { initialGameboardState } from '../../lib/common/constants';

interface IGameboardProps {
  id: string;
  type: 'player' | 'cpu';
  initial?: boolean;
  gameState: ICellState[];
  miniature?: boolean;
  withName?: boolean;
  children?: React.ReactElement;
}

const Gameboard: React.FunctionComponent<IGameboardProps> = ({
  id,
  type,
  initial,
  gameState,
  miniature,
  withName,
  children,
}) => {
  Gameboard.defaultProps = {
    miniature: false,
    withName: false,
    initial: false,
    children: <></>,
  };

  return (
    <BoardContainer>
      {withName && <BoardTitle>{id}</BoardTitle>}
      <BoardGrid id={id} miniature={miniature}>
        {children}
        {initial
          ? initialGameboardState.map((cellState: ICellState) => (
            <CellContainer key={cellState.id} state={cellState.state} type={type} />
          ))
          : gameState.map((cellState: ICellState) => (
            <CellContainer key={cellState.id} state={cellState.state} type={type} />
          ))}
      </BoardGrid>
    </BoardContainer>
  );
};

export default memo(Gameboard);
