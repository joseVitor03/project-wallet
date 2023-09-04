// Coloque aqui suas actions
import { Dispatch, ReduxState,
  UserFormType, WalletFormType,
  WalletFormSuccessType } from '../../type';

export const USER_FORM = 'USER_FORM';

export const CURRECIES_SEARCH_START = 'CURRECIES_SEARCH_START';
export const CURRECIES_SEARCH_SUCCESS = 'CURRECIES_SEARCH_SUCCESS';
export const CURRECIES_SEARCH_ERROR = 'CURRECIES_SEARCH_ERROR';
export const WALLET_FORM_START = 'WALLET_FORM_START';
export const WALLET_FORM_SUCCESS = 'WALLET_FORM_SUCCESS';
export const WALLET_FORM_ERROR = 'WALLET_FORM_ERROR';
export const EXPENSE_DELETE_SUCCESS = 'EXPENSE_DELETE_SUCCESS';

export const expenseDeleteSuccess = (expense: WalletFormSuccessType[]) => ({
  type: EXPENSE_DELETE_SUCCESS,
  payload: expense,
});

export const walletFormStart = () => ({ type: WALLET_FORM_START });

export const walletFormError = () => ({ type: WALLET_FORM_ERROR });

type GetState = () => ReduxState;

export const walletFormSuccess = (
  expense: WalletFormSuccessType,
) => ({
  type: WALLET_FORM_SUCCESS,
  payload: { expense },
});

export const userForm = (form: UserFormType) => ({ type: USER_FORM, payload: form });

export const curreciesStart = () => ({ type: CURRECIES_SEARCH_START });

export const curreciesError = () => ({ type: CURRECIES_SEARCH_ERROR });

export const curreciesSuccess = (currencies: string[]) => ({
  type: CURRECIES_SEARCH_SUCCESS,
  payload: currencies,
});

export const curreciesAction = () => {
  return async (dispatch: Dispatch) => {
    dispatch(curreciesStart());
    try {
      const response = await fetch('https://economia.awesomeapi.com.br/json/all');
      const data = await response.json();
      const newData = Object.entries(data).filter((curr) => curr[0] !== 'USDT');
      const newCurrencies = newData.map((curr) => curr[0]);
      dispatch(curreciesSuccess(newCurrencies));
    } catch (error) {
      dispatch(curreciesError());
    }
  };
};

export const walletAction = (form: WalletFormType) => {
  return async (dispatch: Dispatch, getState: GetState) => {
    dispatch(walletFormStart());
    const current = getState();
    console.log(current);
    try {
      const response = await fetch('https://economia.awesomeapi.com.br/json/all');
      const data = await response.json();
      const newData = {
        ...form,
        exchangeRates: {
          ...data,
        },
      };
      dispatch(walletFormSuccess(newData));
    } catch (error) {
      dispatch(walletFormError());
    }
  };
};

export const deleteAction = (id: number | undefined) => {
  return async (dispatch: Dispatch, getState: GetState) => {
    const { wallet } = getState();
    const { expenses } = wallet;
    const newExpenses = expenses.filter((expense) => expense.id !== id);
    try {
      dispatch(expenseDeleteSuccess(newExpenses));
    } catch (error) {
      console.log('Erro no delete');
    }
  };
};
