import React, { Component } from 'react';
import './Tree.css';
import Leaf from "./Leaf"
import Connector from "./Connector"
import StateProvider from "./StateProvider"

class Tree extends Component {

    constructor(props) {
        super(props);
        props.addRoot()
    }

    _getRootId()
    {
        return "ROOT";
    }

    _getLeaf(leaf)
    {
        return <Leaf leafdata={leaf}
                     edit={this.props.edit}
                     addChild={this.props.addChild}
                     delete={this.props.delete}
                     addSibling={this.props.addSibling}/>
    }

    _getConnector(leaf)
    {
        let arr = [<Connector mode={this._getMode(leaf,this.props.leafs)}/>]
        // if(leaf.parentid!="ROOT")
        // {
        //     this._getConnectorSub(leaf,leaf,arr)
        // }
        return arr;
    }

    _getConnectorSub(originalleaf,rootleaf,result)
    {
        StateProvider.filterLeafs(this.props.leafs,rootleaf.id).slice(1).forEach(
            (leaf)=>{
                result.push(<Connector mode={this._getVertical(originalleaf)}/>)
                this._getConnectorSub(originalleaf,leaf,result)
            })
    }

    _getVertical(leaf)
    {
        if(this._isLastRecord(leaf,this.props.leafs))
        {
            return ""
        }
        else
        {
            return "VERTICAL"
        }
    }

    _formatLeaf(dataarr) {
        let out = []
        dataarr.forEach((leaf)=>{
                out.push((
                        <ul class="Tree-Element">
                            <li className="Tree-Trunk">
                                {this._getConnector(leaf)}
                            </li>
                            <li class="Tree-Trunk">
                                <li className="Tree-Trunk-Sub">
                                    {this._getLeaf(leaf)}
                                </li>
                            </li>
                             <li class="Tree-Branch" >
                                 {this._formatLeaf(StateProvider.filterLeafs(this.props.leafs, leaf.id ))}
                            </li>
                        </ul>
                        ))
                //out.push(this._formatLeaf(this._filterLeafs(this.props.leafs, leaf.id )))
        })
        return <ul>{out}</ul>
    }

    _isLastRecord(leaf,leafs)
    {
        let filtered = StateProvider.filterLeafs(leafs,leaf.parentid)
        if(leaf.id==filtered[filtered.length-1].id || filtered.length==0)
        {return true}
        else
        {return false}
    }

    _getMode(leaf,leafs)
    {
        let out=""
        let filtered = StateProvider.filterLeafs(leafs,leaf.parentid)
        if(leaf.parentid=="ROOT")
        {out=""}
        else
        {
            if(leaf.id==filtered[0].id)
            {
                if (filtered.length==1)
                    {out="SINGLE"}
                else
                    {out = "TOP"}
            }
            else
            {
                if(leaf.id==filtered[filtered.length-1].id)
                    {out = "BOTTOM"}
                else
                    {out="MIDDLE"}
            }
        }
        return out
    }

    _getTree()
    {
        return this._formatLeaf(StateProvider.filterLeafs(this.props.leafs, this._getRootId() ))
    }

    _eraseAll()
    {
        this.props.leafs.forEach((leaf)=>{
            if(leaf.id>1){this.props.delete(leaf.id)}})
    }

    _getHeader()
    {
        return (
            <div className='header'>
                <div className='header-items'>
                    <img className='header-logo' src='logo.jpeg'></img>
                </div>
                <div className='header-items'>
                    <label className='header-erase-label'>Clear
                        <button  className='header-erase-button' onClick={(e)=>{this._eraseAll() }}></button>
                    </label>
                </div>
            </div>
        )
    }

    render() {
        return (
            <div>
                {this._getHeader()}
                {this._getTree()}
                </div>

        );
    }
}

export default Tree;
