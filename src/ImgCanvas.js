import React, { Component } from 'react';
import './ImgCanvas.css'
import PropTypes from "prop-types";

class ImgCanvas extends Component {

    constructor(props) {
        super(props);
        this.canvasRef=React.createRef()
    }

    componentDidMount() {
        let canvas = this.canvasRef;
        let ctx=canvas.getContext('2d')
        this.props.setImage(ctx,canvas)
        //this.props.updateLeaf(this.canvasRef.toDataURL("image/jpeg",0.1))
    }

    render() {
    return <canvas className="ImgCanvas-canvas" width={this.props.width}  height={this.props.height} ref={(e)=>{this.canvasRef=e}}> </canvas>
    }
}


ImgCanvas.propTypes={
    leafdata: PropTypes.object,
    focusId: PropTypes.object,
    width: PropTypes.object,
    height: PropTypes.object,
    setImage:PropTypes.func,
}

export default ImgCanvas;
