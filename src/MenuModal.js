import React, { Component } from 'react';
import './MenuModal.css';

class MenuModal extends Component {

    constructor(props) {
        super(props);
        this.state={modal:"",
        file:""}
        this.canvasRef=React.createRef()

    }

    componentDidUpdate()
    {
        let ctx = this.canvasRef.getContext('2d')
        let img=new Image()
        img.onload=function(event){
            this.canvasRef.width="200px"
            this.canvasRef.height="200px"
            ctx.drawImage(this,0,0)
        }
        img.src=this.state.file
    }


    fileChangeHander(e)
    {
        e.preventDefault()
        // let reader = new FileReader()
        // let file = e.target.files[0]
        // reader.onloadend = () => {
        //     let newleaf=this.props.leafdata
        //     if (newleaf.imgs==null)
        //     {newleaf.imgs = [reader.result]}
        //     else
        //     {newleaf.imgs.push([reader.result])}
        //     this.props.edit(newleaf)
        // }
        //reader.readAsDataURL(file)
        this.setState({file:e.target.files[0]})

    }


    render() {
        return(
            <div className="MenuModal" style={this.props.position}>
                <label  className="MenuModal-Command-Label"> Add Attachment
                    <input type='file' className="MenuModal-Command" onChange={(e) => {this.fileChangeHander(e)}}></input>
                    <canvas className="MenuModal-canvas" ref={(e)=>{ this.canvasRef=e}}> </canvas>
                </label>
                <br />
                <label  className="MenuModal-Command-Label"> Add Child
                    <input type='button' className="MenuModal-Command" onClick={(e) => {this.props.addChild(this.props.leafdata.id)}}></input>
                </label>
                <br />
                <label  className="MenuModal-Command-Label"> Add SIbling
                    <input type='button' className="MenuModal-Command" onClick={(e) => {this.props.addSibling(this.props.leafdata.id)}}></input>
                </label>
            </div>
        )
    }
}

export default MenuModal;
