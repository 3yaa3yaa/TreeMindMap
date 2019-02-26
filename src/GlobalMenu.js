import React, { Component } from 'react';
import './GlobalMenu.css';
import Burger from './Burger'

class GlobalMenu extends Component {

    constructor(props) {
        super(props);
        this.state={modal:""}
    }

    _eraseAll()
    {
        this.props.leafs.forEach((leaf)=>{
            if(leaf.id>1){this.props.delete(leaf.id)}})
    }

    _collectKeys()
    {
        localStorage.key()
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
        //let out="left:"+ event.pageX + ";top:" + event.pageY + ";"
        let out={
            left: event.pageX,
            top: event.pageY +10
        }
        return out;
    }


    _getDOM(event)
    {
        return(
            <div className="GlobalMenu" style={this._getPositionStyle(event)}>

                <br />
                <label className='header-erase-label'>Clear
                    <button  className='header-erase-button' onClick={(e)=>{this._eraseAll() }}></button>
                </label>

            </div>
        )
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
