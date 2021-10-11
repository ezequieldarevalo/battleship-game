import { GAME_ERROR, ICellState } from './types';

export const DESTROYED = 'destroyed';
export const OWN = 'own';
export const NONE = 'none';
export const HITTED = 'hitted';
export const MISSED = 'missed';
export const BEGIN_STAGE = 'beginStage';
export const GAME_STAGE = 'gameStage';
export const END_STAGE = 'endStage';
export const CPU = 'cpu';
export const HUMAN = 'human';
export const PLAYER = 'player';
export const GAMEBOARD_BORDER = 1;
export const GAMEBOARD_WIDTH_DESKTOP = 400;
export const GAMEBOARD_WIDTH_MOBILE = 300;
export const BOARD_SIZE = 10;
export const MOVEMENT_SIZE = 10;
export const CELL_SIZE_DESKTOP = GAMEBOARD_WIDTH_DESKTOP / BOARD_SIZE;
export const CELL_SIZE_MOBILE = GAMEBOARD_WIDTH_MOBILE / BOARD_SIZE;
export const CARRIER_ID = '1';
export const CRUISER1_ID = '2';
export const CRUISER2_ID = '3';
export const CRUISER3_ID = '4';
export const SUBMARINE_ID = '5';
export const noError: GAME_ERROR = {
  has: false,
  description: '',
};
export const ORIENTATION_OPTIONS_ARRAY = ['vertical', 'horizontal'];
export const initialGameboardState: ICellState[] = [
  { id: 1, state: 'none', shipId: -1 },
  { id: 2, state: 'none', shipId: -1 },
  { id: 3, state: 'none', shipId: -1 },
  { id: 4, state: 'none', shipId: -1 },
  { id: 5, state: 'none', shipId: -1 },
  { id: 6, state: 'none', shipId: -1 },
  { id: 7, state: 'none', shipId: -1 },
  { id: 8, state: 'none', shipId: -1 },
  { id: 9, state: 'none', shipId: -1 },
  { id: 10, state: 'none', shipId: -1 },
  { id: 11, state: 'none', shipId: -1 },
  { id: 12, state: 'none', shipId: -1 },
  { id: 13, state: 'none', shipId: -1 },
  { id: 14, state: 'none', shipId: -1 },
  { id: 15, state: 'none', shipId: -1 },
  { id: 16, state: 'none', shipId: -1 },
  { id: 17, state: 'none', shipId: -1 },
  { id: 18, state: 'none', shipId: -1 },
  { id: 19, state: 'none', shipId: -1 },
  { id: 20, state: 'none', shipId: -1 },
  { id: 21, state: 'none', shipId: -1 },
  { id: 22, state: 'none', shipId: -1 },
  { id: 23, state: 'none', shipId: -1 },
  { id: 24, state: 'none', shipId: -1 },
  { id: 25, state: 'none', shipId: -1 },
  { id: 26, state: 'none', shipId: -1 },
  { id: 27, state: 'none', shipId: -1 },
  { id: 28, state: 'none', shipId: -1 },
  { id: 29, state: 'none', shipId: -1 },
  { id: 30, state: 'none', shipId: -1 },
  { id: 31, state: 'none', shipId: -1 },
  { id: 32, state: 'none', shipId: -1 },
  { id: 33, state: 'none', shipId: -1 },
  { id: 34, state: 'none', shipId: -1 },
  { id: 35, state: 'none', shipId: -1 },
  { id: 36, state: 'none', shipId: -1 },
  { id: 37, state: 'none', shipId: -1 },
  { id: 38, state: 'none', shipId: -1 },
  { id: 39, state: 'none', shipId: -1 },
  { id: 40, state: 'none', shipId: -1 },
  { id: 41, state: 'none', shipId: -1 },
  { id: 42, state: 'none', shipId: -1 },
  { id: 43, state: 'none', shipId: -1 },
  { id: 44, state: 'none', shipId: -1 },
  { id: 45, state: 'none', shipId: -1 },
  { id: 46, state: 'none', shipId: -1 },
  { id: 47, state: 'none', shipId: -1 },
  { id: 48, state: 'none', shipId: -1 },
  { id: 49, state: 'none', shipId: -1 },
  { id: 50, state: 'none', shipId: -1 },
  { id: 51, state: 'none', shipId: -1 },
  { id: 52, state: 'none', shipId: -1 },
  { id: 53, state: 'none', shipId: -1 },
  { id: 54, state: 'none', shipId: -1 },
  { id: 55, state: 'none', shipId: -1 },
  { id: 56, state: 'none', shipId: -1 },
  { id: 57, state: 'none', shipId: -1 },
  { id: 58, state: 'none', shipId: -1 },
  { id: 59, state: 'none', shipId: -1 },
  { id: 60, state: 'none', shipId: -1 },
  { id: 61, state: 'none', shipId: -1 },
  { id: 62, state: 'none', shipId: -1 },
  { id: 63, state: 'none', shipId: -1 },
  { id: 64, state: 'none', shipId: -1 },
  { id: 65, state: 'none', shipId: -1 },
  { id: 66, state: 'none', shipId: -1 },
  { id: 67, state: 'none', shipId: -1 },
  { id: 68, state: 'none', shipId: -1 },
  { id: 69, state: 'none', shipId: -1 },
  { id: 70, state: 'none', shipId: -1 },
  { id: 71, state: 'none', shipId: -1 },
  { id: 72, state: 'none', shipId: -1 },
  { id: 73, state: 'none', shipId: -1 },
  { id: 74, state: 'none', shipId: -1 },
  { id: 75, state: 'none', shipId: -1 },
  { id: 76, state: 'none', shipId: -1 },
  { id: 77, state: 'none', shipId: -1 },
  { id: 78, state: 'none', shipId: -1 },
  { id: 79, state: 'none', shipId: -1 },
  { id: 80, state: 'none', shipId: -1 },
  { id: 81, state: 'none', shipId: -1 },
  { id: 82, state: 'none', shipId: -1 },
  { id: 83, state: 'none', shipId: -1 },
  { id: 84, state: 'none', shipId: -1 },
  { id: 85, state: 'none', shipId: -1 },
  { id: 86, state: 'none', shipId: -1 },
  { id: 87, state: 'none', shipId: -1 },
  { id: 88, state: 'none', shipId: -1 },
  { id: 89, state: 'none', shipId: -1 },
  { id: 90, state: 'none', shipId: -1 },
  { id: 91, state: 'none', shipId: -1 },
  { id: 92, state: 'none', shipId: -1 },
  { id: 93, state: 'none', shipId: -1 },
  { id: 94, state: 'none', shipId: -1 },
  { id: 95, state: 'none', shipId: -1 },
  { id: 96, state: 'none', shipId: -1 },
  { id: 97, state: 'none', shipId: -1 },
  { id: 98, state: 'none', shipId: -1 },
  { id: 99, state: 'none', shipId: -1 },
  { id: 100, state: 'none', shipId: -1 },
];
