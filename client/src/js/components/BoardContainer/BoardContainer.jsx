import React, { Component } from 'react';
import { connect } from 'react-redux';
import MakeBoard from './MakeBoard/MakeBoard';
import BoardDetail from './BoardDetail/BoardDetail';
import { getUser } from '../../actions/actions';

const mapDispatchToProps = (dispatch) => {
    return {
        getUser: user => dispatch(getUser(user)),
    }
  };

const mapStateToProps = state => {
return { renderBoardDetail: state.renderBoardDetail };
};

class ConnectedBoardContainer extends Component {
    constructor(){
        super();
        this.state = {
            classChange: false,
            modal: false,
            editModal: false,
            selectedImage: {},
            id: "",
            editBoardId: "",
        }
        this.toggle = this.toggle.bind(this);
        this.toggleEdit = this.toggleEdit.bind(this);
    }

    componentDidMount(){
        this.props.getUser();
    };

    selectedImageStateChange = (newState) => {
        this.setState({
            selectedImage: newState.selectedImage
        })
    };

    handleImageSubmit = ()=> {
        this.toggle();
        this.state.boards.map((board) => {
            if(board._id === this.state.id){
                this.updateBoard(board, board._id)
            }
        })
    }; 

    // toggleClass = () => {
    //     // console.log(this.state.classChange, 'toggle class');
    //     this.setState({
    //         classChange: true
    //     })
    // };

    handleImageClick = (e, image) => {
        this.setState({
            selectedImage: e
        })
        // this.toggleClass();
    };

    toggle(){
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    };

    toggleEdit(){
        this.setState(prevState => ({
            editModal: !prevState.editModal
        }));
    };

    addNewImageButtonClick = (e, id) => {
        this.state.boards.map((board) => {
            this.setState({
                id: e.target.id
            })
        })
        this.toggle();
    };

    updateBoard = async (foundBoard, id) => {
        foundBoard.images.push(this.state.selectedImage);
        await fetch(`${process.env.REACT_APP_BACKEND_ADDRESS}/boards/${id}`, {
            method: "PUT",
            body: JSON.stringify(foundBoard),
            headers: {
                "Content-Type": "application/json"
            }
        })
    };

    deleteBoardButtonClick = (e, id) => {
        this.state.boards.map((board) => {
            if (board._id === e.target.id){
                this.deleteBoard(board._id)
            }
        })
    };

    deleteBoard = async (id) => {
        console.log(id)
        const response = await fetch(`${process.env.REACT_APP_BACKEND_ADDRESS}/boards/${id}`, {
            method: "DELETE",
        })
        if(response.status === 200){
            this.setState({
                boards: this.state.boards.filter(board => board._id !== id)
            })
        }
    }; 

    updateBoardAfterDelete = async (board) => {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_ADDRESS}/boards/${board._id}`, {
            method: "PUT",
            body: JSON.stringify(board),
            headers: {
                "Content-Type": "application/json"
            }
        })
        if(response.status === 200){
            this.setState({
                boards: [...this.state.boards, board]
            })
        }
    };

    deleteImageButtonClick = async (board, image, i) => {
        if(board.images[i] === image){
            board.images.splice(image, 1)
        };        
        this.updateBoardAfterDelete(board);
    }; 

    editBoardButtonClick = (e) => {
        this.setState({
            editBoardId: e.target.id
        })
        this.toggleEdit();
    };

    handleEditSubmit = (text) => {
        this.state.boards.map((board) => {
            if (board._id === this.state.editBoardId){
                this.editBoard(text, board)
            }
        })
        this.toggleEdit();
    };

    editBoard = async (text, board) => {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_ADDRESS}/boards/${this.state.editBoardId}`, {
            method: "PUT",
            body: JSON.stringify(text),
            headers: {
                "Content-Type": "application/json"
            }
        })
        if(response.status === 200){
            this.setState({
                boards: [...this.state.boards, text, board]
            })
        }
        this.getUser();
    }; 

    render(){
        return (
            <div>   
                <MakeBoard selectedImageStateChange={ this.selectedImageStateChange } 
                handleImageClick={ this.handleImageClick } imageStateChange={ this.imageStateChange } 
                updateBoard={ this.updateBoard } toggle={ this.toggle } modal={ this.state.modal } classChange={ this.state.classChange } 
                handleImageSubmit={ this.handleImageSubmit } />
                <hr />
                {
                    this.props.renderBoardDetail ?
                        <BoardDetail addNewImageButtonClick={ this.addNewImageButtonClick } 
                        deleteBoardButtonClick={ this.deleteBoardButtonClick } deleteImageButtonClick= { this.deleteImageButtonClick }
                        toggleEdit={ this.toggleEdit } editModal={ this.state.editModal } editBoardButtonClick={ this.editBoardButtonClick }
                        handleEditSubmit={ this.handleEditSubmit }  />
                    :
                    null
                }      
                 
            </div>
        )
    }
}

const BoardContainer = connect(mapStateToProps, mapDispatchToProps)(ConnectedBoardContainer);

export default BoardContainer;