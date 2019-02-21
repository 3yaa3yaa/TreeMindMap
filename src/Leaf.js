import React, { Component } from 'react';
import './Leaf.css';
import ImgViewer from './ImgViewer'

class Leaf extends Component {

    constructor(props) {
        super(props);
        this.leafRef=React.createRef()

    }

    componentDidMount()
    {
        this.leafRef.focus()
    }

    onChange(e)
    {
        // let newdata = this.state.data
        // newdata.name=e.target.value
        // this.setState({ data : newdata });
    }

    keyDownHandler(e) {
        switch (e.keyCode) {
            case 13: //Enter
                if (e.shiftKey != true) {
                    e.preventDefault()
                    this.props.addSibling(this.props.leafdata.id)
                }
                // if (e.altKey==true)
                // {
                //     e.preventDefault()
                //     this.props.addChild(this.props.leafdata.id)
                //     break;
                // }
                break;
            case 9: //Tab
                if (e.shiftKey!=true)
                {
                    e.preventDefault()
                    this.props.addChild(this.props.leafdata.id)
                }
                break;
            case 46: //Delete
                    e.preventDefault()
                    this.props.delete(this.props.leafdata.id)
                    break;
        }
    }

    onChangeHandler(e)
    {
        let newleaf = this.props.leafdata
        newleaf.title=e.target.value
        this.props.edit(newleaf)
    }

    fileChangeHander(e)
    {
        e.preventDefault()
        let reader = new FileReader()
        let file = e.target.files[0]
        reader.onloadend = () => {
            let newleaf=this.props.leafdata
            if (newleaf.imgs==null)
            {newleaf.imgs = [reader.result]}
            else
            {newleaf.imgs.push([reader.result])}
            this.props.edit(newleaf)
        }
        reader.readAsDataURL(file)
    }


    _getDOM()
    {
    return (
        <div className="Leaf">
            <ImgViewer leafdata={this.props.leafdata}/>
            <div className="Leaf-Row">
                <div className="Leaf-Colomuns">
                <label  className="Leaf-Command-Label"> +
                    <input type='file' className="Leaf-Command" onChange={(e) => this.fileChangeHander(e)}></input>
                </label>
                </div>
                <div className="Leaf-Colomuns">
                <textarea className="Leaf-TextArea" type="text"
                          value={this.props.leafdata.title}
                          onKeyDown={(e)=>this.keyDownHandler(e)}
                          onChange={(e)=>this.onChangeHandler(e)}
                          ref={(e)=>{ this.leafRef=e}} />
                </div>
                <div className="Leaf-Colomuns">
                    <label  className="Leaf-Command-Label"> →
                        <input type='button' className="Leaf-Command" onClick={(e) => this.props.addChild(this.props.leafdata.id)}></input>
                    </label>
                    <br />
                    <label  className="Leaf-Command-Label"> ↓
                        <input type='button' className="Leaf-Command" onClick={(e) => this.props.addSibling(this.props.leafdata.id)}></input>
                    </label>
                </div>
            </div>
        </div>
    )
    }

    render() {
    return (
        this._getDOM()
    );
    }
}

export default Leaf;
