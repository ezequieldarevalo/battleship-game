import React, { memo } from 'react';
import { ICellState } from '../../lib/common/types';
import {
  BoardContainer, BoardGrid, BoardTitle, CellContainer,
} from './gameboardStyles';
import { initialGameboardState } from '../../lib/common/constants';
import { useAppDispatch } from '../../app/hooks';
import {
  hit,
} from './battleshipSlice';

interface IGameboardProps {
  id: string;
  type: 'human' | 'cpu';
  initial?: boolean;
  gameState: ICellState[];
  miniature?: boolean;
  withName?: boolean;
  children?: React.ReactElement;
  active?: boolean;
}

const Gameboard: React.FunctionComponent<IGameboardProps> = ({
  id,
  type,
  initial,
  gameState,
  miniature,
  withName,
  children,
  active,
}) => {
  Gameboard.defaultProps = {
    miniature: false,
    withName: false,
    initial: false,
    children: <></>,
    active: false,
  };
  const dispatch = useAppDispatch();

  return (
    <BoardContainer>
      {withName && <BoardTitle>{id}</BoardTitle>}
      <BoardGrid id={id} miniature={miniature}>
        {children}
        {initial
          ? initialGameboardState.map((cellState: ICellState) => (
            <CellContainer
              key={cellState.id}
              state={cellState.state}
              type={type}
            />
          ))
          : gameState.map((cellState: ICellState) => (
            <CellContainer
              onClick={() => active && dispatch(hit({ cellId: cellState.id, player: type }))}
              key={cellState.id}
              state={cellState.state}
              type={type}
            />
          ))}
      </BoardGrid>
    </BoardContainer>
  );
};

export default memo(Gameboard);
