import { REGISTER, LOGIN, LOGOUT } from '../constants/action-types';


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
            .then(json => { dispatch({ type: REGISTER, payload: json});
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
        .then(json => { dispatch({ type: LOGIN, payload: json})})
  }
};

export function logout(){
  return function(dispatch){
    dispatch({ type: LOGOUT })
  }
}

  // logout = async () => {
  //   this.setState({
  //     loggedIn: false,
  //     currentUser: null
  //   })
  // };