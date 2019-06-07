import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { UPDATE_BOARD } from '../../../../constants/action-types';

class EditBoard extends Component {
    constructor(){
        super();
        this.state = {
            title: "",
            description: "",
        }
    };

    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
        // this.props.handleEditSubmit(this.state)
    };

    // handleEditSubmit = () => {
    //     console.log('edit submit hit')
    //     console.log(this.state, 'state', this.props.editBoardId, 'editBoardId')
    //     this.props.dispatch({ type: UPDATE_BOARD, id: this.props.editBoardId, data: this.state })
    // }


    render(){
        console.log(this.props, 'edit modal props')
        return (
            <div>
                <Modal isOpen={ this.props.editModal } toggle={ this.props.toggleEdit }>
                <ModalHeader toggle={ this.props.toggleEdit }>Edit Board Details</ModalHeader>
                <ModalBody>
                    <div>
                        *Title: <input onChange={ this.handleChange } type="text" name="title" value={ this.props.title }/>
                    </div>
                    <div>
                        Description: <input onChange={ this.handleChange } type="text" name="description" value={ this.props.description } />
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