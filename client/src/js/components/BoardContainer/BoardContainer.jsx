import React, { Component } from 'react';
import { connect } from 'react-redux';
import MakeBoard from './MakeBoard/MakeBoard';
import BoardDetail from './BoardDetail/BoardDetail';
import { getUser, deleteBoard, editBoard, findEditBoard } from '../../actions/actions';

const mapDispatchToProps = (dispatch) => {
    return {
        getUser: user => dispatch(getUser(user)),
        deleteBoard: board => dispatch(deleteBoard(board)),
        editBoard: board => dispatch(editBoard(board)),
        findEditBoard: board => dispatch(findEditBoard(board)),
    }
  };

const mapStateToProps = state => {
    return { 
        renderBoardDetail: state.renderBoardDetail, 
        boards: state.boards,
        selectedImage: state.selectedImage,
    }
};

class ConnectedBoardContainer extends Component {
    constructor(){
        super();
        this.state = {
            modal: false,
            editModal: false,
            id: "",
            editBoardId: "",
            findBoardToggle: false,
            search: "",
            results: [],
            images: [],
            title: "",
            description: "",
            selectedImage: "",
            searchToggle: false,
        }
        this.toggle = this.toggle.bind(this);
        this.toggleEdit = this.toggleEdit.bind(this);
        this.searchToggleStateChange = this.searchToggleStateChange.bind(this);
    }

    componentDidMount(){
        this.props.getUser();
    };

    handleImageSubmit = ()=> {
        this.toggle();
        this.props.boards.map((board) => {
            if(board._id === this.state.id){
                this.updateBoard(board, board._id)
            }
        })
    }; 

    updateBoard = async (foundBoard, id) => {
        console.log(foundBoard, id, 'foundboard in update')
        console.log(this.state.selectedImage)
        foundBoard.images.push(this.state.selectedImage);
        await fetch(`${process.env.REACT_APP_BACKEND_ADDRESS}/boards/${id}`, {
            method: "PUT",
            body: JSON.stringify(foundBoard),
            headers: {
                "Content-Type": "application/json"
            }
        })
        this.props.getUser();
        console.log(foundBoard)
    };

    handleImageClick = (e, image) => {
        console.log(e, 'image click')
        this.setState({
            selectedImage: e
        })
    };

    toggle(){
        this.setState(prevState => ({
            modal: !prevState.modal,
            // searchToggle: !prevState.searchToggle
        }));
    };

    searchToggleStateChange(){
        this.setState(prevState => ({
            searchToggle: !prevState.searchToggle
        }));
    };

    toggleEdit(){
        this.setState(prevState => ({
            editModal: !prevState.editModal
        }));
    };

    addNewImageButtonClick = (e) => {
        this.setState({
            id: e.target.id,
            searchToggle: false
        })
        this.toggle();
    };

    deleteBoardButtonClick = (e, id) => {
        this.props.boards.map((board) => {
            if (board._id === e.target.id){
                this.props.deleteBoard(board._id)
            }
        })
    };

    deleteImageButtonClick = async (board, image, i) => {
        if(board.images[i] === image){
            board.images.splice(image, 1)
        };        
        this.updateBoardAfterDelete(board);
    }; 

    editBoardButtonClick = (e) => {
        this.toggleEdit();
        this.setState({
            editBoardId: e.target.id,
            findBoardToggle: true,
        })
    };

    handleEditSubmit = (response) => {
        console.log(response, 'response')
        console.log(this.state.editBoardId, 'editboardid')

        this.props.editBoard(response, this.state.editBoardId)
        this.toggleEdit();
    };

    render(){
        // console.log(this.props.currentUser.boards)
        // console.log(this.state, 'state')
        console.log(this.state.searchToggle, 'toggle')

        return (
            <div>
                {
                    this.props.createBoardToggle ?
                    <MakeBoard updateBoard={ this.updateBoard } 
                    search={this.state.search} results={this.state.results} images={this.state.images} title={this.state.title}
                    description={this.state.description} createBoardToggleStateChange={this.props.createBoardToggleStateChange}
    
                    selectedImageStateChange={ this.selectedImageStateChange } 
                     imageStateChange={ this.imageStateChange } 
                      classChange={ this.state.classChange } 
                     />
                    :
                    null
                }   

                {
                    this.props.renderBoardDetail ?
                        <BoardDetail toggleEdit={ this.toggleEdit } editModal={ this.state.editModal } editBoardId={ this.state.editBoardId }
                        editBoardButtonClick={ this.editBoardButtonClick } handleEditSubmit={ this.handleEditSubmit } findBoardToggle={this.state.findBoardToggle}
                        toggle={ this.toggle } modal={ this.state.modal } images={this.state.images} handleImageClick={ this.handleImageClick }
                        handleImageSubmit={ this.handleImageSubmit } searchToggleStateChange={this.searchToggleStateChange} searchToggle={this.state.searchToggle} 

                        addNewImageButtonClick={ this.addNewImageButtonClick } 
                        deleteBoardButtonClick={ this.deleteBoardButtonClick } deleteImageButtonClick= { this.deleteImageButtonClick }
                        />
                    :
                    null
                }
                 
            </div>
        )
    }
}

const BoardContainer = connect(mapStateToProps, mapDispatchToProps)(ConnectedBoardContainer);

export default BoardContainer;