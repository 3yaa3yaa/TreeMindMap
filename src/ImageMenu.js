import React, { Component } from 'react';
import './ImageMenu.css';
import downimg from './images/down.png'
import rightimg from './images/right.png'
import cameraimg from './images/camera.png'
import paletteimg from './images/palette.png'
import ImgCanvas from "./ImgCanvas";

export default class ImageMenu extends Component {

    constructor(props) {
        super(props);
        this.state={
            imgcanvas:""}
    }


    colorPickHandler(e)
    {
        //e.preventDefault()
        let color=e.target.value
        let newleaf=this.props.leafdata
        newleaf.color=color
        this.props.edit(newleaf)
    }

    fileChangeHander(e)
    {
        //e.preventDefault()
        let file = e.target.files[0]
        let reader = new FileReader()
        reader.onloadend = () => {
            let img=new Image()
            img.onload=()=>{
                let w= 200
                let ratio= w /img.width
                let h=img.height*ratio
                this.setState( {imgcanvas:
                        <ImgCanvas className="ImageMenu-Canvas"
                                   width={w}
                                   height={h}
                                   setImage={(ctx,canvas)=>{
                                       ctx.drawImage(img,0,0,w,h);
                                       let newleaf=this.props.leafdata
                                       let imagedata=canvas.toDataURL("image/jpeg")
                                       if (newleaf.imgs==null)
                                       {newleaf.imgs = [imagedata]}
                                       else
                                       {newleaf.imgs.push([imagedata])}
                                       this.props.edit(newleaf)
                                   }
                                   }
                        >
                        </ImgCanvas>})
                this.setState({imgcanvas:""})
            }
            img.src=reader.result

        }
        reader.readAsDataURL(file)
    }


    render() {
        return <div className="ImageMenu" style={this.props.style}>
            <label htmlFor={this.props.leafdata.id + "-menu-camera"} className="ImageMenu-Label">
                <img className="ImageMenu-Img" src={cameraimg} alt="Add pictures" />
            </label>
            <input type='file' id={this.props.leafdata.id+"-menu-camera"} className="ImageMenu-Item"
                   onChange={(e) => {this.fileChangeHander(e)}} />
            {this.state.imgcanvas}

            <label htmlFor={this.props.leafdata.id + "-menu-palette"} className="ImageMenu-Label">
                <img className="ImageMenu-Img" src={paletteimg} alt="Choose color" />
            </label>
            <input type='color' id={this.props.leafdata.id+"-menu-palette"} className="ImageMenu-Item"
                   onChange={(e) => {this.colorPickHandler(e)}} />

            <label for={this.props.leafdata.id+"-menu-right"} className="ImageMenu-Label">
                <img className="ImageMenu-Img" src={rightimg} alt="Add a child" />
            </label>
            <input type='button' id={this.props.leafdata.id+"-menu-right"} className="ImageMenu-Item" value="Add"
                   onClick={(e) => {this.props.addChild(this.props.leafdata.id)}} />

            <label for={this.props.leafdata.id+"-menu-down"}  className="ImageMenu-Label">
                <img className="ImageMenu-Img" src={downimg} alt="Add a sibling" />
            </label>
            <input type='button' id={this.props.leafdata.id+"-menu-down"} className="ImageMenu-Item"  value="Add"
                   onClick={(e) => {this.props.addSibling(this.props.leafdata.id)}} />

        </div>
    }
}