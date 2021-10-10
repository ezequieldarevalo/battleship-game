export type SHIP_SIZE = 2 | 3 | 4;

export type SHIP_INFO = {
  id: string;
  size: SHIP_SIZE;
  vertical: boolean;
  initialX: number;
  initialY: number;
  initialized: boolean;
}

export type GAME_ERROR ={
  has: boolean;
  description: string;
}

export type SHIP_AREA = number[]

export interface ICellState {
  state: 'none' | 'water' | 'own' | 'hitted' | 'destroyed';
  shipId: number;
}
