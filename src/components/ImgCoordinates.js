import React, {Component} from 'react';
import { OverLayGrid, CoordinateText } from './HelperComponents';

const SAMPLE_IMG = "assets/image.jpg";

class ImageBox extends Component {

    constructor(props) {
        super(props);
        this.state = {
            x: 0,
            y: 0,
        }
        this.handleMouseMove = this.handleMouseMove.bind(this);
    }

    handleMouseMove(event) {
        let x = event.clientX, y = event.clientY;
        const rect = this.image.getBoundingClientRect();
        this.setState( {
            x: x - rect.left,
            y: y - rect.top,
        });
    }


    render() {
        const customstyle = {
            width: '100%',
            heigt: '100%',
            objectFit: 'contain',
        }

        return(
            <React.Fragment>
                <div className="box">
                    <img ref={image => this.image = image} style={customstyle} src={this.props.imgsrc} alt=""/>
                    <OverLayGrid onMouseMove={this.handleMouseMove} grid={this.props.grid} guidelines={this.props.guidelines} x={this.state.x} y={this.state.y}/>         
                </div>
                <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', width: 1280, backgroundColor: 'black', padding:5}}>
                    <CoordinateText x={this.state.x} y={this.state.y}/> 
                </div> 
            </React.Fragment>
        );
    }
}

const InputImage = (props) => {
    return(
        <div>
            <label className="textSmall" htmlFor='getFile'>Open an Image </label>
            <input  className="textSmall" id='getfile' name='getfile' type='file' accept='image/*' onChange={props.handleImageInput}/>
        </div>
    );
}


class ImgCoordinate extends Component {

    constructor(props) {
        super(props);
        this.state = {
            imgsrc: SAMPLE_IMG,
            x: 0,
            y: 0,
            grid: false,
            guidelines: false,
        }
        this.handleGLCheckBox = this.handleGLCheckBox.bind(this);
        this.handleGridCheckBox = this.handleGridCheckBox.bind(this)
        this.handleImageInput = this.handleImageInput.bind(this);
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

   
    handleImageInput(event) {
        var input = event.target;
        var reader = new FileReader();
        reader.onloadend = function(){
            var dataURL = reader.result;
            this.setState({
                imgsrc: dataURL, 
            });
        }.bind(this);
        var file = input.files[0];
        if (file && file.type.match('image.*')) {
            reader.readAsDataURL(file);
        }
    }

    render() {
        return(
            <div className='base'>
                <div style={{display: 'flex', flexDirection:'row', padding:'20px', justifyContent:'space-between'}}>
                    <InputImage handleImageInput={this.handleImageInput} />
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
                <ImageBox imgsrc={this.state.imgsrc} grid={this.state.grid} guidelines={this.state.guidelines}/>
            </div>
        );
    }
}


export default ImgCoordinate;