import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { S } from 'vitest/dist/types-e3c9754d';

export type FormLoginType = {
  email: string,
  password: string,
};

export type FormActionType = {
  type: string,
  payload: string,
};

export type GlobalState = {
  user: {
    email: string,
  },
  wallet: {
    currencies: [],
    expenses: [{
      id: number,
      value: string,
      description: string,
      currency: string,
      method: string,
      tag: string,
      exchangeRates: {
        [ARS: string]: CurrenciesType,
        AUD: CurrenciesType,
        USD: CurrenciesType,
        BTC: CurrenciesType,
        CAD: CurrenciesType,
        CHF: CurrenciesType,
        CNY: CurrenciesType,
        DOGE: CurrenciesType,
        ETH: CurrenciesType,
        EUR: CurrenciesType,
        GBP: CurrenciesType,
        ILS: CurrenciesType,
        JPY: CurrenciesType,
        LTC: CurrenciesType,
        USDT: CurrenciesType,
        XRP: CurrenciesType,
      },
    }],
    isEditing: boolean,
    idEdit: number,
  },
};

export type CurrenciesType = {
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

export type FormExpenseType = {
  id: number,
  value: string,
  description: string,
  currency: string,
  method: string,
  tag: string,
};

export type FormSuccessExpenses = {
  id: number,
  value: string,
  description: string,
  currency: string,
  method: string,
  tag: string,
  exchangeRates: {
    [ARS: string]: CurrenciesType,
    AUD: CurrenciesType,
    USD: CurrenciesType,
    BTC: CurrenciesType,
    CAD: CurrenciesType,
    CHF: CurrenciesType,
    CNY: CurrenciesType,
    DOGE: CurrenciesType,
    ETH: CurrenciesType,
    EUR: CurrenciesType,
    GBP: CurrenciesType,
    ILS: CurrenciesType,
    JPY: CurrenciesType,
    LTC: CurrenciesType,
    USDT: CurrenciesType,
    XRP: CurrenciesType,
  },
};

export type ExpenseRemoveType = {
  id: number,
  value: string,
  description: string,
  currency: string,
  method: string,
  tag: string,
  exchangeRates: {
    [ARS: string]: CurrenciesType,
    AUD: CurrenciesType,
    USD: CurrenciesType,
    BTC: CurrenciesType,
    CAD: CurrenciesType,
    CHF: CurrenciesType,
    CNY: CurrenciesType,
    DOGE: CurrenciesType,
    ETH: CurrenciesType,
    EUR: CurrenciesType,
    GBP: CurrenciesType,
    ILS: CurrenciesType,
    JPY: CurrenciesType,
    LTC: CurrenciesType,
    USDT: CurrenciesType,
    XRP: CurrenciesType,
  },
};

export type Dispatch = ThunkDispatch<GlobalState, null, AnyAction>;
