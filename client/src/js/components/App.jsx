import React, { Component } from 'react';
import { connect } from "react-redux";
import '../../App.css';
import BoardContainer from './BoardContainer/BoardContainer';
import UserContainer from './UserContainer/UserContainer';
import { handleRegister } from '../actions/actions'

const mapDispatchToProps = (dispatch) => {
  return {
      handleRegister: user => dispatch(handleRegister(user))
  }
};

class ConnectedApp extends Component {
  // constructor(){
  //   super();
  //   this.state = {
  //     loggedIn: false,
  //     currentUser: null
  //   }
  // }
  // handleRegister = async (formData) => {
  //   try{
  //     console.log(formData, 'register');
  //     const newUser = await fetch("http://localhost:9000/users", {
  //       method: "POST",
  //       body: JSON.stringify(formData),
  //       credentials: 'include',
  //       headers: {
  //         "Content-Type": "application/json",
  //       }
  //     })
  //     const parsedResponse = await newUser.json();
  //     if(parsedResponse.status === 200){
  //       this.setState({
  //         loggedIn: true,
  //         currentUser: parsedResponse.data
  //       })
  //     } 

  //   }catch(err){
  //     console.log(err);
  //   }
  // };

  // handleLogin = async (formData) => {
  //   try{
  //     const loginUser = await fetch('http://localhost:9000/users/login', {
  //       method: "POST",
  //       body: JSON.stringify(formData),
  //       credentials: 'include',
  //       headers: {
  //         "Content-Type": "application/json"
  //       }
  //     })
  //     const parsedLoginResponse = await loginUser.json();
  //     console.log(parsedLoginResponse, 'login')
  //     if(parsedLoginResponse.status === 200){
  //       this.setState({
  //         loggedIn: true,
  //         currentUser: parsedLoginResponse.data,
  //       })
  //     }
  //   }catch(err){
  //     console.log(err);
  //   }
  // };

  // logout = async () => {
  //   this.setState({
  //     loggedIn: false,
  //     currentUser: null
  //   })
  // };
  
  render(){
    return (
      <div className="App">
      <div className="header">
        <h4>a box of thoughts</h4>
      </div>
        <div>
          <button onClick={ this.logout }>Logout</button>
          {
            this.props.loggedIn ?
            <BoardContainer showBoards={ this.state.currentUser.boards } />
            :
            <UserContainer handleRegister={ this.handleRegister } handleLogin={ this.handleLogin } handleEditProfile={ this.handleEditProfile } />
          }
        </div>
      </div>
    );
  }
}

const App = connect(null, mapDispatchToProps)(ConnectedApp);

export default App;
