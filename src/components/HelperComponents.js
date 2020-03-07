import React from 'react';

const size = [1280,720];

const _translateCoordinates = (x, y) => {
    let hd_constant_x = 960/(size[0]/ 2), hd_constant_y = 540/(size[1]/2)
    x = x-size[0]/2;
    y = 0 - (y-size[1]/2)
    x = Math.round(hd_constant_x*x);
    y = Math.round(hd_constant_y*y);
    return {x, y};
}

export const OverLayGrid = (props) => {
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
                <line x1="50%" y1="0" x2="50%" y2="100%" style={{display: props.grid? "block" : "none", stroke:"rgb(255,255,0)", strokeWidth:2}} />
                <line x1="0" y1="50%" x2="100%" y2="50%" style={{display: props.grid? "block" : "none", stroke:"rgb(255,255,0)", strokeWidth:2}} />
                <line x1={props.x} y1="0" x2={props.x} y2="100%" style={{display: props.guidelines? "block":"none", stroke:"rgb(255,153,51)", strokeWidth:2}} />
                <line x1="0" y1={props.y} x2="100%" y2={props.y} style={{display: props.guidelines? "block":"none", stroke:"rgb(255,153,51)", strokeWidth:2}} />
            </svg>
        </div>
    );
}

export const CoordinateText = (props) => {
    let coordinate = _translateCoordinates( props.x, props.y);
    return(
        <div className="text" style={{backgroundColor:'black', color:'white'}}>
            [{coordinate.x}, {coordinate.y}]
        </div>
    );
}
