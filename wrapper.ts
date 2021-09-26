import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { Store } from "redux";
import { ThunkDispatch } from "redux-thunk";

import rootReducer from './reducers/root';

const makeStore = () =>
  configureStore({
    reducer: rootReducer,
  });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action>;
export type ThunkDispatchType = ThunkDispatch<AppState, any, Action<string>>;
export type StoreType = Store<AppState, Action<string>> & {
  dispatch: ThunkDispatchType;
};

export default createWrapper<StoreType>(makeStore, {
  debug: process.env.NODE_ENV === "development",
});