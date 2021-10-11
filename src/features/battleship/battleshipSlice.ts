// import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { SHIP_AREA, ICellState } from '../../lib/common/types';
import {
  initializeGameboardState, generateRandomOwnShips, getGameboardStateAfterHit, emulateIdToHitChoice,
  getMessageByHitResult,
} from './functions';
import {
  BEGIN_STAGE, DESTROYED, END_STAGE, GAME_STAGE, NONE, CPU, PLAYER, HITTED, OWN,
} from '../../lib/common/constants';

type TPlayer = {
  name: string;
  ownShips: SHIP_AREA[];
  gameboardState: ICellState[];
}

type THit = {
  cellId: number;
  player: 'human' | 'cpu'
}

export interface IBegin {
  name: string;
  ownShips: SHIP_AREA[],

}

export interface BattleshipState {
  stage: 'beginStage' | 'gameStage' | 'endStage';
  status: 'idle' | 'loading';
  humanPlayer: TPlayer;
  cpuPlayer: TPlayer;
  winner: 'none' | 'cpu' | 'player'
  message: string;
  activePlayer: 'human' | 'cpu'
}

const initialState: BattleshipState = {
  stage: BEGIN_STAGE,
  status: 'idle',
  humanPlayer: {
    name: '',
    ownShips: [],
    gameboardState: [],
  },
  cpuPlayer: {
    name: CPU,
    ownShips: [],
    gameboardState: [],
  },
  winner: NONE,
  message: '',
  activePlayer: 'human',
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
// export const incrementAsync = createAsyncThunk(
//   'counter/fetchCount',
//   async (amount: number) => {
//     const response = await fetchCount(amount);
//     // The value we return becomes the `fulfilled` action payload
//     return response.data;
//   },
// );

export const battleshipSlice = createSlice({
  name: 'battleship',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    begin: (state, action: PayloadAction<IBegin>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      const cpuShips:SHIP_AREA[] = generateRandomOwnShips([4, 3, 3, 3, 2]);
      state.humanPlayer.ownShips = action.payload.ownShips;
      state.humanPlayer.name = action.payload.name;
      state.humanPlayer.gameboardState = initializeGameboardState(action.payload.ownShips);
      state.cpuPlayer.ownShips = cpuShips;
      state.cpuPlayer.gameboardState = initializeGameboardState(cpuShips);
      state.stage = GAME_STAGE;
    },
    hit: (state, action: PayloadAction<THit>) => {
      // when human choose a target cell (cpu cell)
      if (action.payload.player === CPU) {
        const resultAfterHit = getGameboardStateAfterHit(
          action.payload.cellId,
          state.cpuPlayer.gameboardState,
          state.cpuPlayer.ownShips,
        );
        const gameboardAfterHit = resultAfterHit.gameboard;
        // check if is the end of the game
        const cellsDestroyed = gameboardAfterHit.filter(
          (element: ICellState) => element.state === DESTROYED,
        );
        // the end
        if (cellsDestroyed.length === 15) {
          state.winner = PLAYER;
          state.stage = END_STAGE;
        } else {
          // continue playing
          state.message = getMessageByHitResult('human', resultAfterHit.hitResult);
          state.cpuPlayer.gameboardState = gameboardAfterHit;
          state.activePlayer = 'cpu';
        }
      } else {
        // when is the cpu hit action
        const availableCells: number[] = [];
        state.humanPlayer.gameboardState.map(
          (cell: ICellState) => {
            if (cell.state === NONE || cell.state === OWN) availableCells.push(cell.id);
            return 0;
          },
        );
        const hittedShips: SHIP_AREA[] = [];
        state.humanPlayer.ownShips.map((ship) => {
          const newShip: SHIP_AREA = [];
          ship.map((cellId:number) => {
            if (state.humanPlayer.gameboardState[cellId - 1].state === HITTED) newShip.push(cellId);
            return 0;
          });
          hittedShips.push(newShip);
          return 0;
        });

        const idToHit = emulateIdToHitChoice(hittedShips, availableCells);
        const resultAfterHit = getGameboardStateAfterHit(
          idToHit,
          state.humanPlayer.gameboardState,
          state.humanPlayer.ownShips,
        );
        const gameboardAfterHit = resultAfterHit.gameboard;
        // check if is the end of the game
        const cellsDestroyed = gameboardAfterHit.filter(
          (element: ICellState) => element.state === DESTROYED,
        );
        // the end
        if (cellsDestroyed.length === 15) {
          state.winner = CPU;
          state.stage = END_STAGE;
        } else {
          // continue playing
          state.message = getMessageByHitResult('cpu', resultAfterHit.hitResult);
          state.humanPlayer.gameboardState = gameboardAfterHit;
          state.activePlayer = 'human';
        }
      }
    },
    // decrement: (state) => {
    //   state.value -= 1;
    // },
    // // Use the PayloadAction type to declare the contents of `action.payload`
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload;
    // },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(incrementAsync.pending, (state) => {
  //       state.status = 'loading';
  //     })
  //     .addCase(incrementAsync.fulfilled, (state, action) => {
  //       state.status = 'idle';
  //       state.value += action.payload;
  //     });
  // },
});

export const { begin, hit } = battleshipSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectHumanPlayer = (state: RootState) => state.battleship.humanPlayer;
export const selectCpuPlayer = (state: RootState) => state.battleship.cpuPlayer;
export const selectStage = (state: RootState) => state.battleship.stage;
export const selectMessage = (state: RootState) => state.battleship.message;
export const selectActivePlayer = (state: RootState) => state.battleship.activePlayer;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
// export const incrementIfOdd = (amount: number): AppThunk => (
//   dispatch,
//   getState,
// ) => {
//   const currentValue = selectCount(getState());
//   if (currentValue % 2 === 1) {
//     dispatch(incrementByAmount(amount));
//   }
// };

export default battleshipSlice.reducer;
