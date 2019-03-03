import React, { Component } from 'react';
import './GlobalMenuModal.css';
import Burger from './Burger'

class GlobalMenuModal extends Component {

    constructor(props) {
        super(props);
        this.state={modal:"", newname:""}
    }

    _eraseAll()
    {
        this.props.leafs.forEach((leaf)=>{
            if(leaf.id>1){this.props.delete(leaf.id)}})
    }



    _closeModal() {
        this.setState({modal:""})
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
            top: event.pageY +20
        }
        return out;
    }

    _getLocalStorageKeys()
    {
        let out=[];
        for (var i = 0; i < localStorage.length; i++) {
            out.push(localStorage.key(i).replace(/^persist:/,""));
        }
        return out;
    }

    _getURLs()
    {
        let out=this._getLocalStorageKeys().map((key)=>{
            return {name: decodeURI(key)  , url: (window.location.href.replace(/\?.*$/,"") +"?key=" + key)}
        })
        return out;
    }

    _getLinks()
    {
        let out=this._getURLs().map((item)=><div><a href={item.url}>{item.name}</a></div>)
        return out;
    }

    _getLinkToNewItem()
    {
        let out=<div><a href={(window.location.href.replace(/\?.*$/,"") +"?key=" + this.state.newname)}>{this.state.newname}</a></div>
        return out;

    }

    onChangeHander(e)
    {
        this.setState({newname: e.target.value})
    }



    _getNewlyCreateForm()
    {
        return <div><input type="text" onChange={(e)=>this.onChangeHander(e)}></input>
            {this._getLinkToNewItem()}
        </div>
    }



    render() {
        return(
            <div className="GlobalMenuModal" style={this._getPositionStyle(this.props.event)}>
                <div  className='GlobalMenuModal-Item'>Create new mindmap {this._getNewlyCreateForm()}
                </div>
                <div  className='GlobalMenuModal-Item'>Your mindmaps {this._getLinks()}</div>
                <div className='GlobalMenuModal-Item'>
                    <div>Clear current mindmap</div>
                    <div>
                        <button  className='GlobalMenuModal-erase-button' onClick={(e)=>{this._eraseAll();this._closeModal() }}>Clear</button>
                    </div>
                </div>
                <div className='GlobalMenuModal-Item'>
                    <div>Help</div>
                    <div><a href="https://github.com/3yaa3yaa/TreeMindMap/blob/master/README.md">Link to README</a></div>
                </div>
            </div>
        )
    }
}

export default GlobalMenuModal;
