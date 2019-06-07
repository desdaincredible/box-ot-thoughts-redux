import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import { handleRegister } from '../../../actions/actions';

class Register extends Component {
    constructor(){
        super();
        this.state = {
            username: "",
            password: ""
        }
    };
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.handleRegister(this.state);
    };
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };
    render(){
        return(
            <div>
                <h1>Register</h1>
                <form onSubmit={ this.handleSubmit }>
                    <div>*username: <input onChange={ this.handleChange } type="text" name="username" /></div>
                    <div>*password: <input onChange={ this.handleChange } type="password" name="password" /></div> 
                    <Button color="secondary" type="submit">Register</Button>
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

export default connect( mapStateToProps, { handleRegister })(Register);