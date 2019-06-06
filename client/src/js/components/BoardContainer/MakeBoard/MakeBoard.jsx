import React, { Component } from 'react';
import { connect } from 'react-redux';
import Search from './Search';
import { Button } from 'reactstrap';
import { createBoard } from '../../../actions/actions';

const mapDispatchToProps = (dispatch) => {
    return {
        createBoard: board => dispatch(createBoard(board)),
    }
  };

class ConnectedMakeBoard extends Component {
    constructor(){
        super();
        this.state = {
            title: "",
            description: "",
            images: [],
            selectedImage: {}
        }
    };
    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    };
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.createBoard(this.state);
        this.setState({
            title: null,
            description: null
        }) 
    };

    render(){
        return (
            <div>
                <h1>Create a New Board</h1>
                <form onSubmit={ this.handleSubmit }>
                    <div>
                        *Title: <input onChange={ this.handleChange } type="text" name="title" placeholder=""/>
                    </div>
                    <div>
                        Description: <input onChange={ this.handleChange } type="text" name="description" />
                    </div>
                    <div>
                        <Button className="button" color="secondary" type="submit">Submit</Button>
                    </div>
                    </form>

                    <div>
                        <small>* required</small>
                    </div>
                    <div>
                        <Search imageStateChange={ this.props.imageStateChange } handleImageClick={ this.props.handleImageClick } 
                        updateBoard={ this.props.updateBoard } toggle={ this.props.toggle } modal={ this.props.modal } 
                        classChange={ this.props.classChange } handleImageSubmit={ this.props.handleImageSubmit } clearModal= { this.props.clearModal } />
                    </div>

            </div>

        )
    }

}

const MakeBoard = connect(null, mapDispatchToProps)(ConnectedMakeBoard);

export default MakeBoard;