// Coloque aqui suas actions
import { CurreciesType, Dispatch, UserFormType } from '../../type';

export const USER_FORM = 'USER_FORM';
export const CURRECIES_SEARCH_START = 'CURRECIES_SEARCH_START';
export const CURRECIES_SEARCH_SUCCESS = 'CURRECIES_SEARCH_SUCCESS';
export const CURRECIES_SEARCH_ERROR = 'CURRECIES_SEARCH_ERROR';

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
