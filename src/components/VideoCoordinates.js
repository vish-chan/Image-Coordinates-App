import React, {Component} from 'react';
import { OverLayGrid, CoordinateText } from './HelperComponents';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';

const SAMPLE_VIDEO = "";

class VideoBox extends Component {

    constructor(props) {
        super(props);
        this.state = {
            x: 0,
            y: 0,
            pause: false,
        }
        this.handlePlayPause = this.handlePlayPause.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
    }

    handlePlayPause(event) {
        this.state.pause? this.video.play(): this.video.pause();
        this.setState({
            pause: !this.state.pause,
        })
    }

    handleMouseMove(event) {
        let x = event.clientX, y = event.clientY;
        const rect = this.video.getBoundingClientRect();
        this.setState( {
            x: x - rect.left,
            y: y - rect.top,
        });
    }

    render() {
        const customstyle = {
            objectFit: 'contain',
        }

        const controlBtn = this.state.pause?"PLAY":"PAUSE";
        const controlIcon = this.state.pause?<FontAwesomeIcon icon={faPlay} /> : <FontAwesomeIcon icon={faPause} />;

        return(
            <React.Fragment>
                <div className="box">
                    <video ref={video => this.video = video} width="100%" height="100%" style={customstyle} src={this.props.videosrc} autoPlay/>
                    <OverLayGrid onMouseMove={this.handleMouseMove} grid={this.props.grid} guidelines={this.props.guidelines} x={this.state.x} y={this.state.y}/>         
                </div>
                <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', width: 1280, backgroundColor: 'black', padding:5}}>
                    <CoordinateText x={this.state.x} y={this.state.y}/> 
        <button className="textSmall menuBtn" disabled={!this.props.videoloaded} onClick={this.handlePlayPause}>{controlBtn} {controlIcon}</button>
                </div> 
            </React.Fragment>
            
        );
    }
}

const InputVideo = (props) => {
    return(
        <div>
            <label className="textSmall" htmlFor='getFile'>Open a video file </label>
            <input className="textSmall" id='getfile' name='getfile' type='file' accept='video/*' onChange={props.handleVideoInput}/>
        </div>
    );
}


class VideoCoordinate extends Component {

    constructor(props) {
        super(props);
        this.state = {
            videosrc: SAMPLE_VIDEO,
            x: 0,
            y: 0,
            grid: false,
            guidelines: false,
            videoloaded: false,
        }
        this.handleGLCheckBox = this.handleGLCheckBox.bind(this);
        this.handleGridCheckBox = this.handleGridCheckBox.bind(this)
        this.handleVideoInput = this.handleVideoInput.bind(this);
    }

    handleGridCheckBox(event) {
        var cb = event.target;
        this.setState({
            grid: cb.checked,
        })
    }

    handleGLCheckBox(event) {
        var cb = event.target;
        this.setState({
            guidelines: cb.checked,
        })
    }

   
    handleVideoInput(event) {
        var input = event.target;
        var reader = new FileReader();
        reader.onloadend = function(){
            var dataURL = reader.result;
            this.setState({
                videosrc: dataURL,
                videoloaded: true
            });
        }.bind(this);
        var file = input.files[0];
        if (file && file.type.match('video.*')) {
            reader.readAsDataURL(file);
        }
    }

    render() {
        return(
            <div className='base'>
                <div style={{display: 'flex', flexDirection:'row', padding:'20px', justifyContent:'space-between'}}>
                    <InputVideo handleVideoInput={this.handleVideoInput} />
                    <div style={{display:'flex'}}>
                        <div className="textSmall" style={{marginLeft:20}}>
                            <label htmlFor="grid">Grid: </label>
                            <input type="checkbox" id="grid" onChange={this.handleGridCheckBox}></input>
                        </div>
                        <div className="textSmall" style={{marginLeft:20}}>
                            <label htmlFor="guidelines">Guide Lines: </label>
                            <input type="checkbox" id="guidelines" onChange={this.handleGLCheckBox}></input>
                        </div>
                    </div> 
                </div>
                <VideoBox videosrc={this.state.videosrc} videoloaded={this.state.videoloaded} grid={this.state.grid} guidelines={this.state.guidelines}/>
            </div>
        );
    }
}


export default VideoCoordinate;