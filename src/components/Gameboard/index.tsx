import React, { memo } from 'react';
import {
  BoardContainer, BoardGrid, BoardTitle, CellContainer,
} from './gameboardStyles';

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

const getStateFromIndicators = (
  flagOwnCell: boolean,
  flagDestroyedCell: boolean,
  flagHittedCell: boolean,
  flagMissedCell: boolean,
) => {
  // define state respecting relevance
  // for example if is own and is destroyed the state must be destroyed (background: red)
  if (flagDestroyedCell) return 'destroyed';
  if (flagHittedCell) return 'hitted';
  if (flagOwnCell) return 'own';
  if (flagMissedCell) return 'missed';
  return 'none';
};

const cellsList = getInitialCeilsList();

interface IGameboardProps {
  id: string;
  type: 'player' | 'cpu';
  ownShipsList: number[];
  destroyedShipsList: number[];
  hittedShipsList: number[];
  missedShipsList: number[];
  miniature?: boolean;
  withName?: boolean
  children?: React.ReactElement
}

const Gameboard: React.FunctionComponent<IGameboardProps> = ({
  id,
  type,
  ownShipsList,
  destroyedShipsList,
  hittedShipsList,
  missedShipsList,
  miniature,
  withName,
  children,
}) => {
  Gameboard.defaultProps = {
    miniature: false,
    withName: false,
    children: <></>,
  };

  const getState = (cellId:number) => {
    const isOwn = isValueInList(cellId, ownShipsList);
    const isDestroyed = isValueInList(cellId, destroyedShipsList);
    const isHitted = isValueInList(cellId, hittedShipsList);
    const isMissed = isValueInList(cellId, missedShipsList);
    return getStateFromIndicators(isOwn, isDestroyed, isHitted, isMissed);
  };

  return (
    <BoardContainer>
      {withName && <BoardTitle>{type}</BoardTitle>}
      <BoardGrid id={id} miniature={miniature}>
        {children}
        {cellsList.map((cellId) => (
          <CellContainer key={cellId} state={getState(cellId)} />
        ))}
      </BoardGrid>
    </BoardContainer>
  );
};

export default memo(Gameboard);
