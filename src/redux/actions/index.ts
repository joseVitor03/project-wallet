// Coloque aqui suas actions
import { UserFormType } from '../../type';

export const USER_FORM = 'USER_FORM';

export const userForm = (form: UserFormType) => ({ type: USER_FORM, payload: form });
