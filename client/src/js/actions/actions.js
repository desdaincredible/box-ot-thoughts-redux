import { REGISTER, LOGIN, LOGOUT, GET_USER, CREATE_BOARD, SELECTED_IMAGE, UPDATE_BOARD, 
  DELETE_BOARD, EDIT_BOARD } from '../constants/action-types';

const mapStateToProps = state => {
  return { 
      renderBoardDetail: state.renderBoardDetail, 
      boards: state.boards,
      selectedImage: state.selectedImage,
  }
};

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
};

export function selectedImageStateChange(newState){
  return ({ type: SELECTED_IMAGE, payload: newState })
};

export function deleteBoard(foundBoard){
  return function(dispatch){
    return fetch(`${process.env.REACT_APP_BACKEND_ADDRESS}/boards/${foundBoard}`, {
      method: "DELETE",
  })
  .then( dispatch({ type: DELETE_BOARD, payload: foundBoard }))

  }
};

export function findEditBoard(board){
  editBoard(board)
}

export function editBoard(text, id){
  console.log(text, 'text')
  console.log(id, 'id')
  return ({ type: UPDATE_BOARD, id: id, data: text })

  //   return function(dispatch){
  //   return fetch(`${process.env.REACT_APP_BACKEND_ADDRESS}/boards/${editBoard}`, {
  //     method: "PUT",
  //     body: JSON.stringify(editBoard),
  //     // headers: {
  //     //     "Content-Type": "application/json"
  //     // }
  // })
  // .then(response => response.json())
  // .then(json => { dispatch({ type: EDIT_BOARD, payload: json })})  
  // }
};

// export function updateBoard(foundBoard){
//   return function(dispatch){
//     // foundBoard.images.push(this.state.selectedImage);

//     return fetch(`${process.env.REACT_APP_BACKEND_ADDRESS}/boards/${foundBoard._id}`, {
//       method: "PUT",
//       body: JSON.stringify(foundBoard),
//       headers: {
//           "Content-Type": "application/json"
//       }
//   })
//     .then(res => { dispatch(updateBoard(foundBoard));
//     });  
//   }
// };

// export function updatedBoardToDisplay(foundBoard){
//   return { type: UPDATE_BOARD, payload: foundBoard.json()
//   };
// };

