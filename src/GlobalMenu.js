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

    // componentDidMount() {
    //     let re=new RegExp("GlobalMenuModal.*")
    //     document.onclick=(e)=>{
    //         if(re.test(e.srcElement.className)!=true)
    //         {
    //             this.setState({modal:""})
    //             document.onclick=null
    //         }
    //     }
    // }

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
            left: event.clientX,
            top: event.clientY +10
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
