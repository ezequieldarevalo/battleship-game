import React from 'react';
import { BoardContainer, BoardGrid, BoardTitle } from './gameboardStyles';
import Cell from './Cell';

const isValueInList = (
  value: number,
  list: number[],
) => (list.find((element) => element === value)) !== undefined;

const getInitialCeilsList = ():number[] => {
  const listArray = [];
  for (let i = 1; i <= 100; i += 1) {
    listArray.push(i);
  }
  return listArray;
};

const cellsList = getInitialCeilsList();

// import { useAppSelector, useAppDispatch } from '../../app/hooks';
// import {
// decrement,
// increment,
// incrementByAmount,
// incrementAsync,
// incrementIfOdd,
// selectCount,
// } from './gameboardSlice';

type IGameboardProps = {
  type: 'player' | 'cpu';
  ownShipsList: number[];
  destroyedShipsList: number[];
  hittedShipsList: number[];
  missedShipsList: number[];
  miniature: boolean;
}

export function Gameboard({
  type,
  ownShipsList,
  destroyedShipsList,
  hittedShipsList,
  missedShipsList,
  miniature,
}: IGameboardProps) {
  // const count = useAppSelector(selectCount);
  // const dispatch = useAppDispatch();
  // const incrementValue = Number(incrementAmount) || 0;

  return (
    <BoardContainer>
      <BoardTitle>{type}</BoardTitle>
      <BoardGrid miniature={miniature}>
        {cellsList.map((cellId) => (
          <Cell
            key={cellId}
            isOwn={isValueInList(cellId, ownShipsList)}
            isDestroyed={isValueInList(cellId, destroyedShipsList)}
            isHitted={isValueInList(cellId, hittedShipsList)}
            isMissed={isValueInList(cellId, missedShipsList)}
          />
        ))}
      </BoardGrid>
    </BoardContainer>
  );
}
