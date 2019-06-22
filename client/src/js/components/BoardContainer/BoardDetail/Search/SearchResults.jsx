import React, { Component } from 'react';
import $ from 'jquery';
import { Button } from 'reactstrap';

class SearchResults extends Component {
    // componentDidMount(){
    //     $('img').click(function(){
    //         $('.selected').removeClass('selected'); 
    //         $(this).addClass('selected'); 
    //      });
    // }
    handleClick(){
        $("div.image-options").click(function() {
            $(this).find('img.check').toggleClass("nocheck");
            $(this).find('img.fb_thumbnail').toggleClass("uncheckedborder");
        });    
    }

    render(){
        const searchResultsList = this.props.images.map((image, i) => {
            return(
                <div className="image-options" key={i} onClick={this.handleClick}>
                    <img class="check" onClick={ () => this.props.handleImageClick(image) } alt="" src={ image } id={i}/>
                    <img class="fb_thumbnail uncheckedborder" onClick={ () => this.props.handleImageClick(image) } alt="" src={ image } id={i}/>
                </div>
            )
        })
        return(
            <div>
            { searchResultsList }
            </div>
        )
    }
}

export default SearchResults;
