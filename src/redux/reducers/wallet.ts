import {
  CURRECIES_SEARCH_START,
  CURRECIES_SEARCH_SUCCESS,
  CURRECIES_SEARCH_ERROR,
} from '../actions';
import { WalletActionType } from '../../type';
// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

const INITIAL_STATE = {};

const wallet = (state = INITIAL_STATE, action: WalletActionType) => {
  switch (action.type) {
    case CURRECIES_SEARCH_START:
      return {
        ...state,
        isFetching: true,
      };
      break;
    case CURRECIES_SEARCH_SUCCESS:
      return {
        ...state,
        currencies: action.payload,
        isFetching: false,
      };
      break;
    case CURRECIES_SEARCH_ERROR:
      return {
        ...state,
        errorMessage: 'Erro na Busca',
      };
    default:
      return state;
      break;
  }
};

export default wallet;
