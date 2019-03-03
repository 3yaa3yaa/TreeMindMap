import React, { Component } from 'react';
import './Menu.css';
import Burger from './Burger'

class Menu extends Component {

    constructor(props) {
        super(props);
        this.state={modal:""}
    }

    _closeModal() {
        this.setState({modal:""})
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


    _switchModal(event)
    {
        if(this.state.modal=="")
        {return this._getDOM(event)}
        else
        {return ""}
    }

    _getPositionStyle(event)
    {
        let out={
            left: event.pageX+20,
            top: event.pageY
        }
        return out;
    }


    _getDOM(event)
    {
        return(
            <div className="Menu" style={this._getPositionStyle(event)}>
                <label  className="Menu-Command-Label"> Add Attachment
                    <input type='file' className="Menu-Command" onChange={(e) => {this.fileChangeHander(e);this._closeModal()}}></input>
                </label>
                <br />
                <label  className="Menu-Command-Label"> Add Child
                    <input type='button' className="Menu-Command" onClick={(e) => {this.props.addChild(this.props.leafdata.id);this._closeModal()}}></input>
                </label>
                <br />
                <label  className="Menu-Command-Label"> Add SIbling
                    <input type='button' className="Menu-Command" onClick={(e) => {this.props.addSibling(this.props.leafdata.id);this._closeModal()}}></input>
                </label>
            </div>
        )
    }

    render() {
    return (
        <div>
            <label  className="Menu-Command-Burger"><Burger/>
                <input type='button' className="Menu-Command"
                       onClick={(e) => {this.setState({modal : this._switchModal(e)}) }}
                ></input>
            </label>
            {this.state.modal}
        </div>
    );
    }
}

export default Menu;
