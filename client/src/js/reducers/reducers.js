import { REGISTER, LOGIN, LOGOUT } from "../constants/action-types";

const initialState = {
  loggedIn: false,
  currentUser: null,
  };


export const rootReducer = (state = initialState, action) => {
  if (action.type === REGISTER) {
    return {
      loggedIn: true,
      currentUser: action.payload.data
    } 
  }
  if (action.type === LOGIN) {
    return {
      loggedIn: true,
      currentUser: action.payload.data
    } 
  }
  if (action.type === LOGOUT) {
    return {
      loggedIn: false,
      currentUser: null
    } 
  }
  return state;
};


