import { SHIP_AREA, ICellState } from '../../lib/common/types';

const orientationOptionsArray = ['vertical', 'horizontal'];

function getRandomInt(min:number, max:number) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const fillNullCells = (gameboardState: ICellState[]): ICellState[] => {
  const newGameboardState = gameboardState;
  for (let i = 0; i < 100; i += 1) {
    if (!newGameboardState[i]) {
      const noneCellState: ICellState = {
        id: i + 1,
        state: 'none',
        shipId: -1,
      };
      newGameboardState[i] = noneCellState;
    }
  }
  return newGameboardState;
};

export const initializeGameboardState = (shipsList: SHIP_AREA[]): ICellState[] => {
  const gameboardState: ICellState[] = new Array<ICellState>(100);
  shipsList.map((shipArea, index) => {
    shipArea.map((cellId) => {
      const newState: ICellState = {
        id: cellId,
        state: 'own',
        shipId: index + 1,
      };
      gameboardState[cellId] = newState;
      return 0;
    });
    return 0;
  });
  const startGameboardState = fillNullCells(gameboardState);
  return startGameboardState;
};

const getNewOwnShip = (size: number, cellsChosen: number[]): SHIP_AREA => {
  let newShipArea: SHIP_AREA = [];
  const orientation = orientationOptionsArray[
    Math.floor(Math.random() * orientationOptionsArray.length)
  ];
  let nextCellJumpSize: number;
  if (orientation === 'vertical') nextCellJumpSize = 10;
  else nextCellJumpSize = 1;
  let invalid = true;
  while (invalid) {
    invalid = false;
    newShipArea = [];
    const firstCell = getRandomInt(1, 101);
    if (cellsChosen.includes(firstCell) || firstCell > 100) {
      invalid = true;
    } else {
      newShipArea.push(firstCell);
      let cellAccum = firstCell;
      for (let i = 1; i < size; i += 1) {
        cellAccum += nextCellJumpSize;
        if (cellsChosen.includes(cellAccum) || cellAccum > 100) {
          invalid = true;
          break;
        }
        newShipArea.push(cellAccum);
      }
    }
  }
  return newShipArea;
};

const concatShips = (shipsList: SHIP_AREA[]): number[] => {
  let concatenatedShipsList: SHIP_AREA = [];
  shipsList.map((value: SHIP_AREA) => {
    concatenatedShipsList = [...concatenatedShipsList, ...value];
    return 0;
  });
  return concatenatedShipsList;
};

export const generateRandomOwnShips = (newShipSizeList: number[]): SHIP_AREA[] => {
  const newShipsList: SHIP_AREA[] = new Array<SHIP_AREA>(5);
  for (let i = 0; i < newShipSizeList.length; i += 1) {
    newShipsList[i] = getNewOwnShip(newShipSizeList[i], concatShips(newShipsList));
  }
  return newShipsList;
};
