import { REGISTER, LOGIN, LOGOUT, GET_USER, CREATE_BOARD } from '../constants/action-types';


export function handleRegister(formData){
    return function(dispatch){
        return fetch("http://localhost:9000/users", {
            method: "POST",
            body: JSON.stringify(formData),
            credentials: 'include',
            headers: {
              "Content-Type": "application/json",
            }
          })
            .then(response => response.json())
            .then(json => { dispatch({ type: REGISTER, payload: json });
        })
    }
};

export function handleLogin(formData){
  return function(dispatch){
    return fetch('http://localhost:9000/users/login', {
      method: "POST",
      body: JSON.stringify(formData),
      credentials: 'include',
      headers: {
        "Content-Type": "application/json"
      }
      })
        .then(response => response.json())
        .then(json => { dispatch({ type: LOGIN, payload: json })})
  }
};

export function logout(){
  return function(dispatch){
    dispatch({ type: LOGOUT })
  }
};

export function getUser(){
  return function(dispatch){
    return fetch(`${process.env.REACT_APP_BACKEND_ADDRESS}/boards`, {
      credentials: 'include'
    })
      .then(response => response.json())
      .then(json => { dispatch({ type: GET_USER, payload: json })})
  }
};

export function createBoard(formData){
  return function(dispatch){
    return fetch(`${process.env.REACT_APP_BACKEND_ADDRESS}/boards`, {
      credentials: 'include',
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
          "Content-Type": "application/json"
      }
  })
    .then(response => response.json())
    .then(json => { dispatch({ type: CREATE_BOARD, payload: json })})
  }
}
