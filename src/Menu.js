import React, { Component } from 'react';
import './Menu.css';
import Burger from './Burger'
import MenuModal from './MenuModal'
import onClickOutside from 'react-onclickoutside';

class Menu extends Component {

    constructor(props) {
        super(props);
        this.state={modalDisplay:false}
    }

    _closeModal() {
        this.setState({modalDisplay:false})
    }


    _switchModal()
    {
        let nextState=(this.state.modalDisplay === false)
        this.setState({modalDisplay:nextState})
    }
    _getModal()
    {
        return <MenuModal position={this._getPositionStyle(event)}
                          leafdata={this.props.leafdata}
                          edit={this.props.edit}
                          addChild={this.props.addChild}
                          addSibling={this.props.addSibling}
                          closeModal={()=>{this._closeModal()}}/>
    }


    _getPositionStyle(event)
    {
        if(this.state.modalDisplay==false)
        {
            const out={display:"none"}
            return out;
        }
        const out={
            left: 20 ,
            top: 0
        }
        return out;
    }

    handleClickOutside() {
        this._closeModal()
    }


    render() {
    return (
        <div className="Menu" style={this.props.style}>
            <label  className="Menu-Command-Burger"><Burger/>
                <input type='button' className="Menu-Command"
                       onClick={() => {this._switchModal() }}
                ></input>
            </label>
            {this._getModal()}
        </div>
    );
    }
}

export default onClickOutside(Menu) ;
