import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { findEditBoard } from '../../../../actions/actions';

const mapDispatchToProps = (dispatch) => {
    return {
        findEditBoard: board => dispatch(findEditBoard(board)),
    }
};

const mapStateToProps = state => {
    return {
        editBoard: state.editBoard,
    }
}

class ConnectedEditBoard extends Component {
    constructor(){
        super();
        this.state = {
            title: "",
            description: "",
            findBoardToggle: "",
            editBoard: {},
        }
    };

    componentWillReceiveProps = (nextProps) => {
        this.setState({
            // title: nextProps.title,
            // description: nextProps.description,
            editBoardId: nextProps.editBoardId,
        })
    }

    handleChange = (e) => {
        console.log(e.target.value)
        console.log(e.target.name, 'name')
        this.setState({
            [e.target.name] : e.target.value,
        })
    };

    render(){
        // console.log(this.props, 'edit props')
        // console.log(this.state, 'edit state')


        if(this.props.editModal){
            this.props.findEditBoard(this.props.editBoardId)
        }

        return (
            <div>
                <Modal isOpen={ this.props.editModal } toggle={ this.props.toggleEdit }>
                <ModalHeader toggle={ this.props.toggleEdit }><h5>Edit Board</h5></ModalHeader>
                <ModalBody>
                    {
                        this.props.editBoard ?
                        <div>
                            <div>
                                *Title: <input onChange={this.handleChange} type="text" name="title" defaultValue={this.props.editBoard.title} />
                            </div>
                            <div>
                                Description: <input onChange={this.handleChange} name="description" defaultValue={this.props.editBoard.description} />
                            </div>
                            <div>
                                <small>* required</small>
                            </div>
                        </div>
                    :
                        <div>    
                            <div>
                                *Title: <input onChange={ this.handleChange } type="text" name="title" defaultValue="" />
                            </div>
                            <div>
                                Description: <input onChange={ this.handleChange } name="description" defaultValue="" />
                            </div>
                            <div>
                                <small>* required</small>
                            </div>
                        </div>
                    }
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

const EditBoard = connect(mapStateToProps, mapDispatchToProps)(ConnectedEditBoard);
export default EditBoard;

