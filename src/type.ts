export type UserFormType = {
  email: string,
};

export type UserActionType = {
  type: string,
  payload: UserFormType,
};

export type GlobalState = {
  user: UserFormType,
};
