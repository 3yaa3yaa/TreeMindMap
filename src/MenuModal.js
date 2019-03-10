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

    componentDidMount() {
        this.setState({modal:this._getModal()})
        let re=new RegExp("MenuModal.*")
        document.onclick=(e)=>{
            if(re.test(e.srcElement.className)!=true)
            {
                this._endModal()
            }
        }
    }

    _endModal()
    {
        this.setState({modal:"",imgcanvas:""})
        document.onclick=null
    }


    colorPickHandler(e)
    {
        e.preventDefault()
        let color=e.target.value
        let newleaf=this.props.leafdata
        newleaf.color=color
        this.props.edit(newleaf)
    }

    fileChangeHander(e)
    {
        e.preventDefault()
        let file = e.target.files[0]
        let reader = new FileReader()
        reader.onloadend = () => {
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
            <div className="MenuModal" style={this.props.position} ref={(e)=>{ this.menuModalRef=e}}>
                <label  className="MenuModal-Command-Label"> Add Picture
                </label>
                <input type='file' className="MenuModal-Command" onChange={(e) => {this.fileChangeHander(e);this._endModal()}}></input>
                <br />
                <label  className="MenuModal-Command-Label">Pick Color</label>
                <input type='color'  className="MenuModal-Command" value="#98FB98" onChange={(e) => {this.colorPickHandler(e);this._endModal()}}>
                </input>
                <br />
                <label  className="MenuModal-Command-Label"> Add Child</label>
                <input type='button' className="MenuModal-Command"  value="Add" onClick={(e) => {this.props.addChild(this.props.leafdata.id);this._endModal()}}></input>
                <br />
                <label  className="MenuModal-Command-Label"> Add Sibling</label>
                <input type='button' className="MenuModal-Command"  value="Add" onClick={(e) => {this.props.addSibling(this.props.leafdata.id);this._endModal()}}></input>
                <br />
            </div>
        )
    }

    render() {
        //return this._getModal()
        return <div>{this.state.modal}{this.state.imgcanvas}</div>
    }
}

export default MenuModal;
