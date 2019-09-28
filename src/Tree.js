import React, { Component } from 'react';
import './Tree.css';
import Leaf from "./Leaf"
import Connector from "./Connector"
import StateProvider from "./StateProvider"
import {DragDropContext} from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";

class Tree extends Component {

    constructor(props) {
        super(props);
        props.addRoot();
    }

    _getLeaf(leaf)
    {
        return <Leaf leafdata={leaf}
                     focusId={this.props.focusId}
                     edit={this.props.edit}
                     sumOfChildren={(label)=>{return StateProvider.sumLabelsOfChildren(leaf, this.props.root,label)}}
                     countOfChildren={(label)=>{return StateProvider.countLabelsOfChildren(leaf, this.props.root,label)}}
                     addChild={this.props.addChild}
                     delete={this.props.delete}
                     addSibling={this.props.addSibling}
                     move={this.props.move}
                     walk={this.props.walk}
                     jump={this.props.jump}
                     />
    }

    _getConnector(leaf)
    {
        let arr = [<Connector mode={this._getMode(this.props.root, leaf.id)}/>]
        return arr;
    }

    _getConnectorSub(originalleaf,rootleaf,result)
    {
        StateProvider.filterAndSortLeafs(this.props.root,rootleaf.id).slice(1).forEach(
            (leaf)=>{
                result.push(<Connector mode={this._getVertical(originalleaf)}/>)
                this._getConnectorSub(originalleaf,leaf,result)
            })
    }

    _getVertical(leaf)
    {
        if(this._isLastRecord(leaf,this.props.root))
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
        if(dataarr!=null)
        {
            dataarr.forEach((leaf)=>{
                out.push((
                    <ul key={leaf.id + "-block"} className="Tree-Element">
                        <li key={leaf.id + "-connector"} className="Tree-Trunk">
                            {this._getConnector(leaf)}
                        </li>
                        <li key={leaf.id + "-leaf"} className="Tree-Trunk">
                            <ul className="Tree-Element">
                                <li key={leaf.id + "-leaf-detail"} className="Tree-Trunk-Sub">
                                    {this._getLeaf(leaf)}
                                </li>
                            </ul>
                        </li>
                        <li  key={leaf.id + "-leaf-children"} className="Tree-Branch" >
                            {this._formatLeaf(leaf.getChildren(leaf.id))}
                        </li>
                    </ul>
                ))
                //out.push(this._formatLeaf(this._filterLeafs(this.props.root, leaf.id )))
            })
        }
        return <ul>{out}</ul>
    }


    _getMode(root, id)
    {
        let out=""
        let parent=root.getParent(id);
        if(parent===null)
        {out=""}
        else
        {
            let filtered=parent.children;
            if(id==filtered[0].id)
            {
                if (filtered.length==1)
                    {out="SINGLE"}
                else
                    {out = "TOP"}
            }
            else
            {
                if(id==filtered[filtered.length-1].id)
                    {out = "BOTTOM"}
                else
                    {out="MIDDLE"}
            }
        }
        return out
    }

    _getTree()
    {
        return this._formatLeaf([this.props.root])
    }


    render() {
        return (
            <div>
                {this._getTree()}
            </div>
        );
    }
}

Tree=DragDropContext(HTML5Backend)(Tree)
export default Tree;
