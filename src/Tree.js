import React, { Component } from 'react';
import './Tree.css';
import LeafData from "./LeafData";
import Leaf from "./Leaf"
import Connector from "./Connector"

class Tree extends Component {

    constructor(props) {
        super(props);
        props.addRoot()
    }

    _getRootId()
    {
        return "ROOT";
    }


    _filterLeafs(leafarray, parentid)
    {
        let out=[]
        if(leafarray.length>0)
        {
            leafarray.forEach((leaf)=>
                {
                    if(leaf.parentid==parentid)
                    {
                        out.push(leaf)
                    }
                }
            )
        }
        return out
    }


    _getLeaf(leaf)
    {
        return <Leaf leafdata={leaf}
                     edit={this.props.edit}
                     addChild={this.props.addChild}
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
        this._filterLeafs(this.props.leafs,rootleaf.id).slice(1).forEach(
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
                                 {this._formatLeaf(this._filterLeafs(this.props.leafs, leaf.id ))}
                            </li>
                        </ul>
                        ))
                //out.push(this._formatLeaf(this._filterLeafs(this.props.leafs, leaf.id )))
        })
        return <ul>{out}</ul>
    }

    _isLastRecord(leaf,leafs)
    {
        let filtered = this._filterLeafs(leafs,leaf.parentid)
        if(leaf.id==filtered[filtered.length-1].id || filtered.length==0)
        {return true}
        else
        {return false}
    }

    _getMode(leaf,leafs)
    {
        let out=""
        let filtered = this._filterLeafs(leafs,leaf.parentid)
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
        return this._formatLeaf(this._filterLeafs(this.props.leafs, this._getRootId() ))
    }

    render() {

        return (
            <div>
                <div>
                    {this._getTree()}
                </div>
            </div>
        );
    }
}

export default Tree;
