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
            <div>
                <h1>Login</h1>
                <form onSubmit={ this.handleSubmit }>
                    <div>*username: <input onChange={ this.handleChange } type="text" name="username" /></div>
                    <div>*password: <input onChange={ this.handleChange } type="password" name="password" /></div> 
                    <Button type="submit">Login</Button>
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
