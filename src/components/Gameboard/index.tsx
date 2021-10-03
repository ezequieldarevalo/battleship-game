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
  type: 'player' | 'cpu';
  ownShipsList: number[];
  destroyedShipsList: number[];
  hittedShipsList: number[];
  missedShipsList: number[];
  miniature?: boolean;
  withName?: boolean
}

const Gameboard: React.FunctionComponent<IGameboardProps> = ({
  type,
  ownShipsList,
  destroyedShipsList,
  hittedShipsList,
  missedShipsList,
  miniature,
  withName,
}) => {
  Gameboard.defaultProps = {
    miniature: false,
    withName: false,
  };

  const getState = (id:number) => {
    const isOwn = isValueInList(id, ownShipsList);
    const isDestroyed = isValueInList(id, destroyedShipsList);
    const isHitted = isValueInList(id, hittedShipsList);
    const isMissed = isValueInList(id, missedShipsList);
    return getStateFromIndicators(isOwn, isDestroyed, isHitted, isMissed);
  };

  return (
    <BoardContainer>
      {withName && <BoardTitle>{type}</BoardTitle>}
      <BoardGrid miniature={miniature}>
        {cellsList.map((cellId) => (
          <CellContainer key={cellId} state={getState(cellId)} />
        ))}
      </BoardGrid>
    </BoardContainer>
  );
};

export default memo(Gameboard);
