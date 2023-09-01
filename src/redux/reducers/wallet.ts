import { AnyAction } from 'redux';
import {
  CURRECIES_SEARCH_START,
  CURRECIES_SEARCH_SUCCESS,
  CURRECIES_SEARCH_ERROR,
  WALLET_FORM_START,
  WALLET_FORM_SUCCESS,
  WALLET_FORM_ERROR,
  WalletFormSuccessType,
} from '../actions';

// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const wallet = (state = INITIAL_STATE, action: AnyAction) => {
  switch (action.type) {
    case CURRECIES_SEARCH_START:
      return { ...state };
      // isFetching: true,
      break;
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
    case WALLET_FORM_START:
      return {
        ...state,
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
    default:
      return state;
      break;
  }
};

export default wallet;
