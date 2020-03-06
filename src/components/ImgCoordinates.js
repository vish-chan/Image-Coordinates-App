import React, {Component} from 'react';

const SAMPLE_IMG = "assets/sample.jpg";
const size = [1280,720];

const _translateCoordinates = (x, y) => {
    let hd_constant_x = 960/(size[0]/ 2), hd_constant_y = 540/(size[1]/2)
    x = x-size[0]/2;
    y = 0 - (y-size[1]/2)
    x = Math.round(hd_constant_x*x);
    y = Math.round(hd_constant_y*y);
    return {x, y};
}

const CoordinateText = (props) => {
    let coordinate = _translateCoordinates( props.x, props.y);
    return(
        <div style={{position:'absolute', left:-5, top:"100%",width:1290, backgroundColor:'black', color:'white', fontSize:30}}>
            [{coordinate.x}, {coordinate.y}]
        </div>
    );
}

const OverLayGrid = (props) => {
    const customStyle = {
        width: '100%',
        height: '100%',
        position: 'absolute',
        left: 0,
        top: 0,
    }
    return(
        <div style={customStyle} onMouseMove={props.onMouseMove}>
            <svg height="100%" width="100%">
                <line x1="50%" y1="0" x2="50%" y2="100%" style={{display: props.grid? "block" : "none", stroke:"rgb(255,255,255)", strokeWidth:2}} />
                <line x1="0" y1="50%" x2="100%" y2="50%" style={{display: props.grid? "block" : "none", stroke:"rgb(255,255,255)", strokeWidth:2}} />
                <line x1={props.x} y1="0" x2={props.x} y2="100%" style={{display: props.guidelines? "block":"none", stroke:"rgb(255,255,255)", strokeWidth:2}} />
                <line x1="0" y1={props.y} x2="100%" y2={props.y} style={{display: props.guidelines? "block":"none", stroke:"rgb(255,255,255)", strokeWidth:2}} />
            </svg>
        </div>
    );
}

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
            <div className="imgbox">
                <img ref={image => this.image = image} style={customstyle} src={this.props.imgsrc}/>
                <OverLayGrid onMouseMove={this.handleMouseMove} grid={this.props.grid} guidelines={this.props.guidelines} x={this.state.x} y={this.state.y}/>
                <CoordinateText x={this.state.x} y={this.state.y}/>            
            </div>
        );
    }
}

const InputImage = (props) => {
    return(
        <div>
            <label htmlFor='getFile'>Select a file </label>
            <input id='getfile' name='getfile' type='file' accept='image/*' onChange={props.handleImageInput}/>
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
            <div className='imgcoordinates'>
                <div style={{display: 'flex', flexDirection:'row', margin:'20px'}}>
                    <InputImage handleImageInput={this.handleImageInput} />
                    <div style={{marginLeft:20}}>
                        <label htmlFor="grid">Grid: </label>
                        <input type="checkbox" id="grid" onChange={this.handleGridCheckBox}></input>
                    </div>
                    <div style={{marginLeft:20}}>
                        <label htmlFor="guidelines">Guide Lines: </label>
                        <input type="checkbox" id="guidelines" onChange={this.handleGLCheckBox}></input>
                    </div>
                </div>
                <ImageBox imgsrc={this.state.imgsrc} grid={this.state.grid} guidelines={this.state.guidelines}/>
            </div>
        );
    }
}


export default ImgCoordinate;