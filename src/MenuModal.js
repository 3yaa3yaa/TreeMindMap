import React, { Component } from 'react';
import './MenuModal.css';
import ImgCanvas from './ImgCanvas'

class MenuModal extends Component {

    constructor(props) {
        super(props);
        this.state={
            modal:"",
            imgcanvas:""}

    }

    // componentDidMount() {
    //     this.setState({modal:this._getModal()})
    // }

    fileChangeHander(e)
    {
        e.preventDefault()
        let file = e.target.files[0]
        let reader = new FileReader()
        reader.onloadend = () => {
            // let newleaf=this.props.leafdata
            // if (newleaf.imgs==null)
            // {newleaf.imgs = [reader.result]}
            // else
            // {newleaf.imgs.push([reader.result])}
            // this.props.edit(newleaf)
            let img=new Image()
            img.onload=()=>{
                let w= 200
                let ratio= w /img.width
                let h=img.height*ratio
                this.setState( {imgcanvas:
                        <ImgCanvas className="MenuModal-canvas"
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
            }
            img.src=reader.result

        }
        reader.readAsDataURL(file)
    }

    _getModal()
    {
        return(
            <div className="MenuModal" style={this.props.position}>
                <label  className="MenuModal-Command-Label"> Add Attachment
                    <input type='file' className="MenuModal-Command" onChange={(e) => {this.fileChangeHander(e)}}></input>
                </label>
                {this.state.imgcanvas}
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

    render() {
        return this._getModal()
    }
}

export default MenuModal;
