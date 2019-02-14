import React, { Component } from 'react';
import Tree from "./Tree";


// const canvasWidth = 30
// const canvasHeight = 30

class Connector extends Component {
    // componentDidMount() {
    //     this.ctx = this.refs.canvas.getContext('2d')
    //     this.ctx.textAlign = 'center'
    //     this.ctx.font = '24px sans-serif'
    //
    //     //const { text } = this.props.store.getState()
    //     this.ctx.fillText("test", canvasWidth / 2, canvasHeight / 2)
    // }
    // shouldComponentUpdate() {
    //     const { text } = "test"
    //
    //     this.ctx.clearRect(0, 0, canvasWidth, canvasHeight)
    //     this.ctx.fillText(text, canvasWidth / 2, canvasHeight / 2)
    //
    //     return false
    // }

    render() {
        return (
            <div>
                <canvas ref="canvas" width={canvasWidth} height={canvasHeight} />
            </div>
        )
    }
}
export default Connector;
