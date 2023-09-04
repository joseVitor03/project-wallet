// Coloque aqui suas actions
import { fetchFunction } from '../../tests/helpers/helpers';
import { Dispatch, ReduxState,
  UserFormType, WalletFormType,
  WalletFormSuccessType } from '../../type';

export const USER_FORM = 'USER_FORM';

export const CURRECIES_SEARCH_SUCCESS = 'CURRECIES_SEARCH_SUCCESS';
export const CURRECIES_SEARCH_ERROR = 'CURRECIES_SEARCH_ERROR';
export const WALLET_FORM_SUCCESS = 'WALLET_FORM_SUCCESS';
export const WALLET_FORM_ERROR = 'WALLET_FORM_ERROR';
export const EXPENSE_DELETE_SUCCESS = 'EXPENSE_DELETE_SUCCESS';
export const EDIT_START = 'EDIT_START';
export const EDIT_SUCCESS = 'EDIT_SUCCESS';
export const TO_EDIT_EXPENSE = 'TO_EDIT_EXPENSE';

type GetState = () => ReduxState;

export const toEditExpense = (form: WalletFormType[]) => ({
  type: TO_EDIT_EXPENSE,
  form,
});

export const toEditAction = (form: WalletFormType) => {
  return async (dispatch: Dispatch, getState: GetState) => {
    const current = getState();
    const newData = {
      id: current.wallet.idToEdit,
      currency: form.currency,
      description: form.description,
      method: form.method,
      tag: form.tag,
      value: form.value,
      exchangeRates: current.wallet.expenses[current.wallet.idToEdit].exchangeRates,
    };
    current.wallet.expenses.splice(current.wallet.idToEdit, 1, newData);
    try {
      dispatch(toEditExpense(current.wallet.expenses));
    } catch (error) {
      console.log('error no edit');
    }
  };
};

export const editStart = (id: number | undefined) => ({
  type: EDIT_START,
  payload: id,
});

export const editAction = (id: number | undefined) => {
  return async (dispatch: Dispatch, getState: GetState) => {
    const curr = getState();
    const data = curr.wallet.expenses.filter((expense) => expense.id === id);
    dispatch(editStart(data[0].id));
  };
};
export const expenseDeleteSuccess = (expense: WalletFormSuccessType[]) => ({
  type: EXPENSE_DELETE_SUCCESS,
  payload: expense,
});

export const walletFormError = () => ({ type: WALLET_FORM_ERROR });

export const walletFormSuccess = (
  expense: WalletFormSuccessType,
) => ({
  type: WALLET_FORM_SUCCESS,
  payload: { expense },
});

export const userForm = (form: UserFormType) => ({ type: USER_FORM, payload: form });

export const curreciesError = () => ({ type: CURRECIES_SEARCH_ERROR });

export const curreciesSuccess = (currencies: string[]) => ({
  type: CURRECIES_SEARCH_SUCCESS,
  payload: currencies,
});

export const curreciesAction = () => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await fetchFunction();
      const newData = Object.entries(response).filter((curr) => curr[0] !== 'USDT');
      const newCurrencies = newData.map((curr) => curr[0]);
      dispatch(curreciesSuccess(newCurrencies));
    } catch (error) {
      dispatch(curreciesError());
    }
  };
};

export const walletAction = (form: WalletFormType) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await fetchFunction();
      const newData = {
        ...form,
        exchangeRates: {
          ...response,
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
