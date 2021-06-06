import React, { Component } from 'react';
import { DragSource, DropTarget } from 'react-dnd'
import Leaf from "./Leaf";
import PropTypes from "prop-types";

export default class DnDLeaf extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { connectDragSource, connectDropTarget } = this.props;
        return (
             connectDropTarget(connectDragSource(
                 <div>
                     <Leaf leafdata={this.props.leafdata}
                           focusId={this.props.focusId}
                           edit={this.props.edit}
                           addChild={this.props.addChild}
                           delete={this.props.delete}
                           addSibling={this.props.addSibling}
                           move={this.props.move}
                           walk={this.props.walk}
                           jump={this.props.jump}
                           changePreviewMode={this.props.changePreviewMode}
                     />
                 </div>
             ))
        );
    }
}

const dragSpec = {
    beginDrag: (props) => { return props.leafdata },
    endDrag: (props,monitor,component)=>{
        let dragged=monitor.getItem()
        let dropped=monitor.getDropResult()
        if(dropped!=null)
        {
            if(dragged.id!=dropped.id)
            {
                component.props.move(dragged.id, dropped.id);
            }
        }
    }
}

const dropSpec = {
    drop: (props, monitor, component)=> {
        return props.leafdata;
    }
}


function collectDrag(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging()
    }
}

function collectDrop(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver()
    }
}

DnDLeaf=DropTarget("leaf", dropSpec, collectDrop)(DnDLeaf)
DnDLeaf=DragSource("leaf", dragSpec, collectDrag)(DnDLeaf)


DndLeaf.propTypes={
    leafdata: PropTypes.object,
    focusId: PropTypes.object,
    edit:PropTypes.func,
    addChild: PropTypes.func,
    addSibling:PropTypes.func,
    changePreviewMode:PropTypes.func,
    walk:PropTypes.func,
    delete:PropTypes.func,
    jump:PropTypes.func
}

