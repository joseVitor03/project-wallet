import { AnyAction } from 'redux';
import {
  CURRECIES_SEARCH_SUCCESS,
  CURRECIES_SEARCH_ERROR,
  WALLET_FORM_SUCCESS,
  EXPENSE_DELETE_SUCCESS,
  EDIT_START,
  TO_EDIT_EXPENSE,
} from '../actions';

// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
};

const wallet = (state = INITIAL_STATE, action: AnyAction) => {
  switch (action.type) {
    case CURRECIES_SEARCH_SUCCESS:
      return {
        ...state,
        currencies: action.payload,
      };
      break;
    case CURRECIES_SEARCH_ERROR:
      return {
        ...state,
        errorMessage: 'Erro na Busca',
      };
      break;
    case WALLET_FORM_SUCCESS:
      return {
        ...state,
        expenses: [
          ...state.expenses,
          {
            ...action.payload.expense,
            id: state.expenses.length,
          },
        ],
      };
      break;
    case EXPENSE_DELETE_SUCCESS:
      return {
        ...state,
        expenses: [
          ...action.payload,
        ],
      };
      break;
    case EDIT_START:
      return {
        ...state,
        editor: true,
        idToEdit: action.payload,
      };
    case TO_EDIT_EXPENSE:
      return {
        ...state,
        expenses: [
          ...action.form,
        ],
      };
    default:
      return state;
  }
};

export default wallet;
