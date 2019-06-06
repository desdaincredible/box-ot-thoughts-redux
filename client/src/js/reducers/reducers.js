import { REGISTER, LOGIN, LOGOUT, GET_USER, CREATE_BOARD } from "../constants/action-types";

const initialState = {
  loggedIn: false,
  currentUser: null,
  boards: [],
  renderBoardDetail: false,
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
  if (action.type === GET_USER) {
    return Object.assign({}, state, { boards: action.payload.data.boards, renderBoardDetail: true })
  }
  if (action.type === CREATE_BOARD){
    return Object.assign({}, state, { boards: state.boards.concat(action.payload.data) });
}
  return state;
};

// return Object.assign({}, state, { remoteArticles: state.remoteArticles.concat(action.payload) });
