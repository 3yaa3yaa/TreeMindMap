import React, { Component } from 'react';
import './Tree.css';
import DnDLeaf from "./DnDLeaf";
import Connector from "./Connector"
import StateProvider from "./StateProvider"
import { DndProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import Property from "./Property";

class Tree extends Component {

    constructor(props) {
        super(props);
    }

    _getFocusId()
    {
        if(this.props.property.isReadOnly!=Property.readOnlyLevel().canEdit)
        {
            return -1;
        }
        else
        {
            return this.props.property.focusId;
        }
    }

    safeExec(callback)
    {
        if(typeof callback === 'function')
        {
            return callback
        }
        else
        {
            return ()=>{return ""}
        }
    }

    _getLeaf(leaf)
    {
        return <DnDLeaf leafdata={leaf}
                     focusId={this._getFocusId()}
                     edit={this.safeExec(this.props.edit)}
                     addChild={this.safeExec(this.props.addChild)}
                        delete={this.safeExec(this.props.delete)}
                     addSibling={this.safeExec(this.props.addSibling)}
                     move={this.safeExec(this.props.move)}
                     walk={this.safeExec(this.props.walk)}
                     jump={this.safeExec(this.props.jump)}
                     changePreviewMode={this.safeExec(this.props.changePreviewMode)}
                     />
    }

    _getConnector(leaf)
    {
        // let arr = [<Connector leafid={leaf.id} mode={this._getMode(this.props.root, leaf.id)}/>]
        // return arr;
        return <Connector leafid={leaf.id} mode={this._getMode(this.props.root, leaf.id)}/>;
    }
    //
    // _getConnectorSub(originalleaf,rootleaf,result)
    // {
    //     StateProvider.filterAndSortLeafs(this.props.root,rootleaf.id).slice(1).forEach(
    //         (leaf)=>{
    //             result.push(<Connector mode={this._getVertical(originalleaf)}/>)
    //             this._getConnectorSub(originalleaf,leaf,result)
    //         })
    // }

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
                    <ul key={leaf.id + "-block"} className="Tree-Element" style={{margin:"0px"}}>
                        <li key={leaf.id + "-connector"} className="Tree-Trunk"  style={{margin:"0px"}}>
                            {this._getConnector(leaf)}
                        </li>
                        <li key={leaf.id + "-leaf"} className="Tree-Trunk" style={{margin:"0px"}}>
                            <ul key={leaf.id + "-leaf-element"} className="Tree-Element" style={{margin:"0px"}}>
                                <li key={leaf.id + "-leaf-detail"} className="Tree-Trunk-Sub" style={{margin:"0px"}}>
                                    {this._getLeaf(leaf)}
                                </li>
                            </ul>
                        </li>
                        <li key={leaf.id + "-leaf-children"} className="Tree-Branch"  style={{margin:"0px"}}>
                            {this._formatLeaf(leaf.getChildren(leaf.id))}
                        </li>
                    </ul>
                ))
            })
        }
        return <ul style={{margin:"0px"}}>{out}</ul>
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
            <DndProvider backend={HTML5Backend}>
                <div className="Tree" >
                    {this._getTree()}
                </div>
            </DndProvider>
        );
    }
}

//Tree=DragDropContext(HTML5Backend)(Tree)
export default Tree;
