import { FormActionType } from '../../type';
import { ADD_EXPENSES,
  EDIT_EXPENSE,
  IS_EDITING,
  REMOVE_EXPENSE,
  SEARCH_CURRENCIES_START, SEARCH_CURRENCIES_SUCCESS } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  isEditing: false,
  idEdit: 0,
};

function wallet(state = INITIAL_STATE, action: FormActionType) {
  switch (action.type) {
    case SEARCH_CURRENCIES_START:
      return {
        ...state,
        isLoading: true,
      };
      break;
    case SEARCH_CURRENCIES_SUCCESS:
      return {
        ...state,
        currencies: action.payload,
      };
      break;
    case ADD_EXPENSES:
      return {
        ...state,
        expenses: [
          ...state.expenses,
          action.payload,
        ],
        isEditing: false,
      };
      break;
    case REMOVE_EXPENSE:
      return {
        ...state,
        expenses: [
          ...action.payload,
        ],
      };
      break;
    case IS_EDITING:
      return {
        ...state,
        isEditing: true,
        idEdit: action.payload,
      };
      break;
    case EDIT_EXPENSE:
      return {
        ...state,
        expenses: [
          ...action.payload,
        ],
        isEditing: false,
      };
    default:
      return state;
      break;
  }
}

export default wallet;
