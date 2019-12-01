import React, { Component } from 'react';
import Leaf from "./Leaf";

export default class ReadOnlyLeaf extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
                 <div>
                     <Leaf leafdata={this.props.leafdata}
                           focusId={-1}
                           edit={()=>{}}
                           addChild={()=>{}}
                           delete={()=>{}}
                           addSibling={()=>{}}
                           move={()=>{}}
                           walk={()=>{}}
                           jump={()=>{}}
                           changePreviewMode={()=>{}}
                     />
                 </div>
        );
    }
}
