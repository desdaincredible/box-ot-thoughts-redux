import { REGISTER } from "../constants/action-types";

const initialState = {
  loggedIn: false,
  currentUser: null,
  };


export const rootReducer = (state = initialState, action) => {
  if (action.type === REGISTER) {
    return {
      loggingIn: true,
      user: action.payload.data
    } 
}
  return state;
};


