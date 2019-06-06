import { REGISTER } from '../constants/action-types';


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