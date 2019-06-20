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
        console.log(this.state, 'hit login')
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
                <h3>Login</h3>
                <form onSubmit={ this.handleSubmit }>
                    <p className="input-title">*username:</p>
                    <input onChange={ this.handleChange } type="text" name="username" className="login-screen" />
                    <p className="input-title">*password:</p>
                    <input onChange={ this.handleChange } type="password" name="password" className="login-screen" />
                    <div>
                    <Button type="submit" className="login-screen">Login</Button>
                    </div>
                    <p className="input-title"><small>*required</small></p>
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
