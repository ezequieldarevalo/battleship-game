import { GAME_ERROR } from './types';

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
