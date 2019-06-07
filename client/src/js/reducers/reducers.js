import { REGISTER, LOGIN, LOGOUT, GET_USER, CREATE_BOARD, SELECTED_IMAGE, UPDATE_BOARD, DELETE_BOARD, EDIT_BOARD } from "../constants/action-types";

const initialState = {
  loggedIn: false,
  currentUser: null,
  boards: [],
  renderBoardDetail: false,
  selectedImage: {},
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
  if (action.type === SELECTED_IMAGE){
    return Object.assign({}, state, { selectedImage: action.payload.data });
  }
  // if (action.type === UPDATE_BOARD){
  //   return Object.assign({}, state, { boards: state.boards.concat(action.payload.data) });
  // }
  if (action.type === DELETE_BOARD){
    return Object.assign({}, state, { boards: state.boards.filter(board => board._id !== action.payload) });
  }
  if (action.type === EDIT_BOARD){
    console.log(action.payload)
    return Object.assign({}, state, { boards: state.boards.concat(action.payload.data) });
  }
  return state;
};


