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
        return "root";
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


    _formatLeaf(dataarr) {
        let out = []
        dataarr.forEach((leaf)=>{
                out.push((
                    <ul class="Tree-Element">
                        <li class="Tree-Trunk">
                            {this._getLeaf(leaf)}
                        </li>
                         <li class="Tree-Branch" >
                             <Connector/>
                             {this._formatLeaf(this._filterLeafs(this.props.leafs, leaf.id ))}

                        </li>
                    </ul>
                        ))
                //out.push(this._formatLeaf(this._filterLeafs(this.props.leafs, leaf.id )))
        })
        return <ul>{out}</ul>
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
