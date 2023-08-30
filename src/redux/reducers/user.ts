import { USER_FORM } from '../actions';
import { UserActionType } from '../../type';
// Esse reducer será responsável por tratar as informações da pessoa usuária
const INITIAL_STATE = {
  email: '',
};

const user = (state = INITIAL_STATE, action: UserActionType) => {
  switch (action.type) {
    case USER_FORM:
      return {
        ...state,
        email: action.payload.email,
      };
      break;
    default:
      return state;
      break;
  }
};

export default user;
