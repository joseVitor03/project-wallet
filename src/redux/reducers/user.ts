import { FormActionType } from '../../type';
import { LOGIN_EMAIL } from '../actions';

const INITIAL_STATE = {
  email: '',
};

const user = (state = INITIAL_STATE, action: FormActionType) => {
  switch (action.type) {
    case LOGIN_EMAIL:
      return {
        ...state,
        email: action.payload,
      };
      break;
    default:
      return state;
      break;
  }
};

export default user;
