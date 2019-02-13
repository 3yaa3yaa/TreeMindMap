import React, { Component } from 'react';
import './Tree.css';
import LeafData from "./LeafData";
import Leaf from "./Leaf"


class Tree extends Component {

    constructor(props) {
        super(props);
        props.addRoot()
    }

    getRootId()
    {
        return "root";
    }


    filterLeafs(leafarray, parentid)
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


    formatLeaf(dataarr) {
        let out = []
        dataarr.forEach((leaf)=>{
                out.push((
                    <ul class="Tree-Element">
                        <li class="Tree-Trunk">
                            <Leaf leafdata={leaf}
                                  addChild={this.props.addChild}
                                  addSibling={this.props.addSibling}/>
                        </li>
                         <li class="Tree-Branch" >
                            {this.formatLeaf(this.filterLeafs(this.props.leafs, leaf.id ))}
                        </li>
                    </ul>
                        ))
                //out.push(this.formatLeaf(this.filterLeafs(this.props.leafs, leaf.id )))
        })
        return <ul>{out}</ul>
    }



    getTree()
    {
        return this.formatLeaf(this.filterLeafs(this.props.leafs, this.getRootId() ))
    }

    render() {

        return (
            <div>
                <div>
                    {this.getTree()}
                </div>
            </div>
        );
    }
}

export default Tree;
