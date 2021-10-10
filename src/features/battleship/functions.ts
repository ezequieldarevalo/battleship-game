import { SHIP_AREA, ICellState } from '../../lib/common/types';

const fillNullCells = (gameboardState: ICellState[]): ICellState[] => {
  const newGameboardState = gameboardState;
  for (let i = 1; i <= 100; i += 1) {
    if (!newGameboardState[i]) {
      const noneCellState:ICellState = {
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
      const newState:ICellState = {
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
