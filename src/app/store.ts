import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import battleshipReducer from '../features/battleship/battleshipSlice';

export const store = configureStore({
  reducer: {
    battleship: battleshipReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
