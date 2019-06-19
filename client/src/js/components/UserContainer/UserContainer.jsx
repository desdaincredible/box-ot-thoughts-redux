import React, { Component } from 'react';
import Login from './Login/Login';
import Register from './Register/Register';

class UserContainer extends Component {
    constructor(){
        super();
        this.state = {
          registerToggle: false,
        }
    }
    
    render(){
        return(
            <div>
                    <div>
                        <Login />
                        <hr />
                        Create new account
                        <Register />
                    </div>
            </div>
        )
    }
}

export default UserContainer;