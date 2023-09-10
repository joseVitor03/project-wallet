import { fetchFunction } from '../../tests/helpers/helpers';
import { Dispatch,
  ExpenseRemoveType, FormExpenseType,
  FormSuccessExpenses, GlobalState } from '../../type';

export const LOGIN_EMAIL = 'LOGIN_EMAIL';
export const SEARCH_CURRENCIES_START = 'SEARCH_CURRENCIES_START';
export const SEARCH_CURRENCIES_SUCCESS = 'SEARCH_CURRENCIES_SUCCESS';
export const ADD_EXPENSES = 'ADD_EXPENSES';
export const REMOVE_EXPENSE = 'REMOVE_EXPENSE';
export const IS_EDITING = 'IS_EDITING';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';

type GetState = () => GlobalState;

export const editExpense = (expenses: FormSuccessExpenses[]) => ({
  type: EDIT_EXPENSE,
  payload: expenses,
});
export const editExpenseAction = (form: FormExpenseType) => {
  return async (dispatch: Dispatch, getState: GetState) => {
    const data = getState();
    try {
      const { expenses, idEdit } = data.wallet;
      const newForm = {
        ...form,
        id: idEdit,
        exchangeRates: {
          ...expenses[idEdit].exchangeRates,
        },
      };
      expenses.splice(idEdit, 1, newForm);
      dispatch(editExpense(expenses));
    } catch (error) {
      console.log('error no edit');
    }
  };
};

export const isEditing = (id: number) => ({
  type: IS_EDITING,
  payload: id,
});

export const removeExpense = (newExpenses: ExpenseRemoveType[]) => ({
  type: REMOVE_EXPENSE,
  payload: newExpenses,
});

export const removeAction = (expense: ExpenseRemoveType) => {
  return async (dispatch: Dispatch, getState: GetState) => {
    const { wallet } = getState();
    try {
      const { expenses } = wallet;
      const newExpenses = expenses.filter((data) => data.id !== expense.id);
      dispatch(removeExpense(newExpenses));
      console.log(newExpenses);
    } catch (error) {
      console.log('erro remove');
    }
  };
};

export const addExpenses = (form: FormSuccessExpenses) => ({
  type: ADD_EXPENSES,
  payload: form,
});

export const searchCurrenciesStart = () => ({ type: SEARCH_CURRENCIES_START });
export const searchCurrenciesSuccess = (currencies: string[]) => ({
  type: SEARCH_CURRENCIES_SUCCESS,
  payload: currencies,
});

export const expensesAction = (form: FormExpenseType) => {
  return async (dispatch: Dispatch) => {
    try {
      const data = await fetchFunction();
      const newForm = {
        ...form,
        exchangeRates: data,
      };
      dispatch(addExpenses(newForm));
    } catch (error) {
      console.log('erro no expense');
    }
  };
};

export const searchCurrenciesAction = () => {
  return async (dispatch: Dispatch) => {
    try {
      const data = await fetchFunction();
      const newData = Object.entries(data)
        .filter((curr) => curr[0] !== 'USDT').map((coin) => coin[0]);
      dispatch(searchCurrenciesSuccess(newData));
    } catch (error) {
      console.log('error');
    }
  };
};

export const loginEmailAction = (email: string) => (
  {
    type: LOGIN_EMAIL,
    payload: email,
  });
