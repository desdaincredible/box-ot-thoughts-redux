import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import { handleLogin } from '../../../actions/actions';


class Login extends Component {
    constructor(){
        super();
        this.state = {
            username: "",
            password: ""
        }
    };
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.handleLogin(this.state);
        this.setState({
            username: "",
            password: ""
        })
    };
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };
    render(){
        return(
            <div className="login-screen">
                <h1>Login</h1>
                <form onSubmit={ this.handleSubmit }>
                    <div>*username:</div>
                    <input onChange={ this.handleChange } type="text" name="username" className="login-screen" />
                    <div>*password:</div>
                    <input onChange={ this.handleChange } type="password" name="password" className="login-screen" />
                    <div>
                    <Button type="submit" className="login-screen">Login</Button>
                    </div>
                    <div><small>*required</small></div>
                </form>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        loggedIn: true,
    }
};

export default connect( mapStateToProps, { handleLogin })(Login);
