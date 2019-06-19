import React, { Component } from 'react';
import { connect } from 'react-redux';
import ImageList from './ImageList';
import EditBoard from './EditBoard/EditBoard';
import { Button } from 'reactstrap';

const mapStateToProps = state => {
    return { boards: state.boards };
  };

class ConnectedBoardDetail extends Component {
    constructor(){
        super();
        this.state = {
            id: "",
            title: "",
            description: ""
        }
    };

    render(){
        const usersBoardsToShow = this.props.boards;
        const boardsToShow = usersBoardsToShow.map((board, i) => {
            return (
                <div key={ i } id={ board._id } className="parent">
                    <div><h2>{ board.title }</h2></div>
                    <div>{ board.description }</div>
                    <Button className="button" onClick={ this.props.addNewImageButtonClick } id={ board._id }>Add New Image</Button>
                    <Button className="button" id={ board._id } onClick={ this.props.editBoardButtonClick }>Edit Board</Button>
                    <Button className="button" id={ board._id } onClick={ this.props.deleteBoardButtonClick }>Delete Board</Button>
                    <ImageList images = { board.images } deleteImageButtonClick= { this.props.deleteImageButtonClick } board = {board} />
                </div>
            )
        });  

        return(
            <div>
                <div>
                    <EditBoard toggleEdit={ this.props.toggleEdit } editModal={ this.props.editModal } handleEditSubmit={ this.props.handleEditSubmit } editBoardId={ this.props.editBoardId }
                    title={this.state.title} description={this.state.description} />
                </div>
                <div>
                    { boardsToShow }
                </div>
            </div>
        )
    }
}

const BoardDetail = connect(mapStateToProps)(ConnectedBoardDetail);

export default BoardDetail;

// onClick={()=>this.props.dispatch({ type:'EDIT_BOARD', id: board._id })}