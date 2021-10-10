import { SHIP_AREA, ICellState } from '../../lib/common/types';
import { ORIENTATION_OPTIONS_ARRAY } from '../../lib/common/constants';

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

// receives ownShips list and returns a new gameboardState
export const initializeGameboardState = (shipsList: SHIP_AREA[]): ICellState[] => {
  const gameboardState: ICellState[] = new Array<ICellState>(100);
  shipsList.map((shipArea, index) => {
    shipArea.map((cellId) => {
      const newState: ICellState = {
        id: cellId,
        state: 'own',
        shipId: index + 1,
      };
      gameboardState[cellId - 1] = newState;
      return 0;
    });
    return 0;
  });
  const startGameboardState = fillNullCells(gameboardState);
  return startGameboardState;
};

// check if horizontal ship exceeds a line limit
const exceedTens = (orientation: string, size: number, cellId: number) => {
  if (orientation === 'vertical') return false;
  const units = cellId % 10;
  const lastCellOfShip = units + size;
  if (lastCellOfShip > 10) return true;
  return false;
};

// return a random ship respecting some rules
// horizontal ship must be in 1 line (exceedTens validation)
// each cell calculated must not be in cellsChosen list (it avoids collision)
// all cell ids returned must be less than 100 value
const getNewOwnShip = (size: number, cellsChosen: number[]): SHIP_AREA => {
  let newShipArea: SHIP_AREA = [];
  const orientation = ORIENTATION_OPTIONS_ARRAY[
    Math.floor(Math.random() * ORIENTATION_OPTIONS_ARRAY.length)
  ];
  let nextCellJumpSize: number;
  if (orientation === 'vertical') nextCellJumpSize = 10;
  else nextCellJumpSize = 1;
  let invalid = true;
  while (invalid) {
    invalid = false;
    newShipArea = [];
    const firstCell = getRandomInt(1, 101);
    if (
      cellsChosen.includes(firstCell) || firstCell > 100 || exceedTens(orientation, size, firstCell)
    ) {
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

// receives ships accumulator and return an occupied cells list
const concatShips = (shipsList: SHIP_AREA[]): number[] => {
  let concatenatedShipsList: SHIP_AREA = [];
  shipsList.map((value: SHIP_AREA) => {
    concatenatedShipsList = [...concatenatedShipsList, ...value];
    return 0;
  });
  return concatenatedShipsList;
};

// generate random ownShips list
export const generateRandomOwnShips = (newShipSizeList: number[]): SHIP_AREA[] => {
  // ships accumulator
  const newShipsList: SHIP_AREA[] = new Array<SHIP_AREA>(newShipSizeList.length);

  // get new ship giving a occupated cellList (generated from accumulator)
  // as parameter to avoid duplicated cells
  for (let shipId = 0; shipId < newShipSizeList.length; shipId += 1) {
    newShipsList[shipId] = getNewOwnShip(newShipSizeList[shipId], concatShips(newShipsList));
  }
  return newShipsList;
};

const updateShipDestroyed = (
  gameboardState: ICellState[],
  ownShip: SHIP_AREA,
) => {
  const newGameboardState:ICellState[] = gameboardState;
  ownShip.map((id:number) => {
    newGameboardState[id - 1] = { ...gameboardState[id - 1], state: 'destroyed' };
    return 0;
  });
  return newGameboardState;
};

export const getGameboardStateAfterHit = (
  cellId: number,
  gameboardState: ICellState[],
  ownShips: SHIP_AREA[],
): ICellState[] => {
  let newGameboardState = gameboardState;
  let newCellState: ICellState;
  const actualCell:ICellState = gameboardState[cellId - 1];
  if (actualCell.state === 'none') {
    newCellState = {
      ...actualCell,
      state: 'missed',
    };
    newGameboardState[cellId - 1] = newCellState;
  } else {
    // ownShip case
    // destroyed if it is the last healthy cell and hitted if not
    // if destroyed so update other cells of that ship
    const shipArea = ownShips[cellId - 1];
    const healthyCells: number[] = [];
    shipArea.map((id) => {
      if (gameboardState[id - 1].state === 'own') healthyCells.push(id);
      return 0;
    });
    if (healthyCells.length === 1) {
      newGameboardState = updateShipDestroyed(gameboardState, shipArea);
    } else {
      newCellState = {
        ...actualCell,
        state: 'hitted',
      };
      newGameboardState[cellId - 1] = newCellState;
    }
  }
  return newGameboardState;
};
