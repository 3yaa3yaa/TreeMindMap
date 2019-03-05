import React, { Component } from 'react';
import './Menu.css';
import Burger from './Burger'
import MenuModal from './MenuModal'

class Menu extends Component {

    constructor(props) {
        super(props);
        this.state={modal:""}
    }

    _closeModal() {
        this.setState({modal:""})
    }


    _switchModal(event)
    {
        if(this.state.modal=="")
        {return <MenuModal event={event}
                           leafdata={this.props.leafdata}
                           edit={this.props.edit}
                           addChild={this.props.addChild}
                           addSibling={this.props.addSibling} />}
        else
        {return ""}
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
