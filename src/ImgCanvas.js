import React, { Component } from 'react';
import './ImgCanvas.css'

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


export default ImgCanvas;
