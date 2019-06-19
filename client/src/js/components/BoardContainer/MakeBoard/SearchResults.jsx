import React, { Component } from 'react';
import $ from 'jquery';
import { Button } from 'reactstrap';

class SearchResults extends Component {
    componentDidMount(){
        $('img').click(function(){
            $('.selected').removeClass('selected'); 
            $(this).addClass('selected'); 
         });
    }


    render(){
        const searchResultsList = this.props.images.map((image, i) => {
            return(
                <div className="image-options">
                <img onClick={ () => this.props.handleImageClick(image) } alt="" src={ image } id={i} key={i}/>
                </div>
            )
        })
        return(
            <div>
            { searchResultsList }
            <Button onClick={this.props.moreImages}>more...</Button>
            </div>
        )
    }
}

export default SearchResults;

