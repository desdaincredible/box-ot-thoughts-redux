import React, { Component } from 'react';
import { connect } from "react-redux";
import '../../App.css';
import { Button } from 'reactstrap';
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
          <div className="col-sm-12">
            
            <div className="col-sm-8 no-blur">
              <h4>a box of thoughts</h4>
            </div>
          </div>
        </div>

        {
          this.props.loggedIn ?
          <div>
            <div className="col-sm-4">           
              <Button className="navi" outline color="light">Create Board</Button>
              <Button className="navi" outline color="light" onClick={ this.props.logout }>Logout</Button>
            </div>
            <BoardContainer />
          </div>

            :
            <div>
            <UserContainer />
            </div>
        }
      </div>
    );
  }
}

const App = connect(mapStateToProps, mapDispatchToProps)(ConnectedApp);

export default App;