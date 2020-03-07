import React, { Component } from 'react';
import ImgCoordinate from './ImgCoordinates';
import VideoCoordinate from './VideoCoordinates';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage, faVideo } from '@fortawesome/free-solid-svg-icons';



class MainComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            image: true,
        }
        this.handleImageClick = this.handleImageClick.bind(this);
        this.handleVideoClick = this.handleVideoClick.bind(this);
    }


    handleImageClick() {
        this.setState({
            image: true,
        });
    }

    handleVideoClick() {
        this.setState({
            image: false,
        });
    }


    render() {
        const _display = this.state.image?<ImgCoordinate />: <VideoCoordinate />;
        return(
            <div className="base">  
                <button className="text menuBtn"  disabled={this.state.image} onClick={this.handleImageClick}>Image <FontAwesomeIcon icon={faImage}/> </button>
                <button className="text menuBtn" disabled={!this.state.image} onClick={this.handleVideoClick}>Video <FontAwesomeIcon icon={faVideo}/></button>
                {_display}
            </div>
        );
    }
}

export default MainComponent;