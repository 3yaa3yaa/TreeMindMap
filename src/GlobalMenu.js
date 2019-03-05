import React, { Component } from 'react';
import './GlobalMenu.css';
import Burger from './Burger'
import GlobalMenuModal from "./GlobalMenuModal";

class GlobalMenu extends Component {

    constructor(props) {
        super(props);
        this.state={modal:"", newname:""}
    }

    _closeModal() {
        this.setState({modal:""})
    }

    _switchModal(event)
    {
        if(this.state.modal=="")
        {return <GlobalMenuModal position={this._getPositionStyle(event)} delete={this.props.delete} leafs={this.props.leafs}/>}
        else
        {return ""}
    }

    _getPositionStyle(event) {
        //let out="left:"+ event.pageX + ";top:" + event.pageY + ";"
        let out = {
            left: event.pageX,
            top: event.pageY + 20
        }
        return out;
    }



        render() {
    return (
        <div>
            <label  className="GlobalMenu-Command-Label"> <Burger/>
                <input type='button' className="GlobalMenu-Command" onClick={(e) => {this.setState({modal : this._switchModal(e)}) }}></input>
            </label>
            {this.state.modal}
        </div>
    );
    }
}

export default GlobalMenu;
