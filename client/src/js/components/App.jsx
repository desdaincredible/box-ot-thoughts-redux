import React, { Component } from 'react';
import { connect } from "react-redux";
import '../../App.css';
import BoardContainer from './BoardContainer/BoardContainer';
import UserContainer from './UserContainer/UserContainer';
import { handleRegister, handleLogin, logout } from '../actions/actions'

const mapDispatchToProps = (dispatch) => {
  return {
      handleRegister: user => dispatch(handleRegister(user)),
      handleLogin: user => dispatch(handleLogin(user)),
      logout: user => dispatch(logout(user)),
  }
};

const mapStateToProps = state => {
  return { loggedIn: state.loggedIn, currentUser: state.currentUser };
};

class ConnectedApp extends Component {
  render(){
    return (
      <div className="App">
      <div className="header">
        <h4>a box of thoughts</h4>
      </div>
        <div>
          <button onClick={ this.props.logout }>Logout</button>
          {
            this.props.loggedIn ?
            <BoardContainer />
            :
            <UserContainer />
          }
        </div>
      </div>
    );
  }
}

const App = connect(mapStateToProps, mapDispatchToProps)(ConnectedApp);

export default App;

// showBoards={ this.state.currentUser.boards }