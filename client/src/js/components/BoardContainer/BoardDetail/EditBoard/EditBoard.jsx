import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class EditBoard extends Component {
    constructor(){
        super();
        this.state = {
            title: "",
            description: "",
            editBoardId:"",
            findBoardToggle: false,
            editBoard: {},
        }
    };
    componentDidMount(){
        this.setState({
            editBoardId: this.props.editBoardId,
            findBoardToggle: true,
        })
    }

    componentWillReceiveProps = (nextProps) => {
        this.setState({
            title: nextProps.title,
            description: nextProps.description,
            editBoardId: "",
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value,
        })
    };

    findBoard = async () => {
        const board = await fetch(`${process.env.REACT_APP_BACKEND_ADDRESS}/boards/${this.props.editBoardId}`, {
            credentials: 'include'
        })
        const boardJSON = await board.json();
        this.setState({
            editBoard: boardJSON.data,
            findBoardToggle: false
        }) 
    };

    render(){
        if(this.state.findBoardToggle){
            this.findBoard(this.state.editBoardId)
        }

        return (
            <div>
                <Modal isOpen={ this.props.editModal } toggle={ this.props.toggleEdit }>
                <ModalHeader toggle={ this.props.toggleEdit }>Edit Board Details</ModalHeader>
                <ModalBody>
                    <div>
                        *Title: <input onChange={ this.handleChange } type="text" name="title" defaultValue={this.props.title} />
                    </div>
                    <div>
                        Description: <input onChange={ this.handleChange } name="description" defaultValue={this.props.description} />
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