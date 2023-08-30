import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

export type UserFormType = {
  email: string,
};

export type UserActionType = {
  type: string,
  payload: UserFormType,
};

export type CurreciesType = {
  ask: string,
  bid: string,
  code: string,
  codein: string,
  create_date: string,
  high: string,
  low: string,
  name: string,
  pctChange: string,
  timestamp: string,
  varBid: string,
};

export type GlobalState = {
  user: UserFormType,
  wallet: {
    currencies: any[]
  }
};

export type WalletActionType = {
  type: string,
  payload: CurreciesType,
};

export type ReduxState = {
  isFetching: boolean,
  currencies: string[]
};

export type Dispatch = ThunkDispatch<ReduxState, null, AnyAction>;
