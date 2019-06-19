import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class EditBoard extends Component {
    constructor(){
        super();
        this.state = {
            title: "",
            description: "",
            oldTitle: "",
            oldDescription: "",
            editBoardId: "",
        }
    };

    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
            // [e.target.name] : 
            //     ...this.state,
                    // [e.target.name] : e.target.value
            
        })
    };

    findBoard = async (foundBoard) => {
        try{
            const board = await fetch(`${process.env.REACT_APP_BACKEND_ADDRESS}/boards/${foundBoard}`, {
                credentials: 'include'
            })
            const boardJSON = await board.json();
            this.setState({
                oldTitle: boardJSON.data.title,
                oldDescription: boardJSON.data.description,
                editBoardId: foundBoard
            })
        } catch(err){
            console.log(err)
        }
        
    };

    render(){
        if(this.state.editBoardId === ""){
            this.findBoard(this.props.editBoardId)
        }

        return (
            <div>
                <Modal isOpen={ this.props.editModal } toggle={ this.props.toggleEdit }>
                <ModalHeader toggle={ this.props.toggleEdit }>Edit Board Details</ModalHeader>
                <ModalBody>
                    <div>
                        *Title: <input onChange={ this.handleChange } type="text" name="title" />
                    </div>
                    <div>
                        Description: <textarea onChange={ this.handleChange } type="text" name="description" />
                    </div>
                    <div>
                        <small>* required</small>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={ () => this.props.handleEditSubmit(this.state) }>Submit</Button>{' '}
                    <Button outline color="secondary" onClick={ this.props.toggleEdit }>Cancel</Button>
                </ModalFooter>
                </Modal>
            </div>
        )
    };
}

export default connect()(EditBoard);