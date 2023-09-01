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
    currencies: any[], // array de string
    expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
    editor: false, // valor booleano que indica se uma despesa está sendo editada
    idToEdit: 0,
  }
};

export type WalletFormSuccessType = {
  id: number,
  value: string,
  description: string,
  currency: string,
  method: string,
  tag: string,
  exchangeRates: any,
};

export type WalletActionType = {
  type: string,
  payload: WalletFormSuccessType
};

export type WalletFormType = {
  // id: number,
  value: string,
  description: string,
  currency: string,
  method: string,
  tag: string,
};

export type ReduxState = {
  isFetching: boolean,
  user: UserFormType,
  wallet: {
    currencies: any[], // array de string
    expenses: WalletFormSuccessType[], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
    editor: false, // valor booleano que indica se uma despesa está sendo editada
    idToEdit: 0,
  }
};

export type Dispatch = ThunkDispatch<ReduxState, null, AnyAction>;
