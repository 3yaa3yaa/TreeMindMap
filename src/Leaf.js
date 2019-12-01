import React, { Component } from 'react';
import './Leaf.css';
import ImgViewer from './ImgViewer'
import ImageMenu from "./ImageMenu";
import { DragSource, DropTarget } from 'react-dnd'
import MarkDownTextBoxWrapper from "./MarkDownTextBoxWrapper";
import StateProvider from './StateProvider';

class Leaf extends Component {

    constructor(props) {
        super(props);
        this.leafTextAreaRef=React.createRef()
        this.leafRef=React.createRef()
    }

    componentDidMount()
    {
        //this.leafTextAreaRef.focus()
    }

    keyDownHandler(e) {
        switch (e.keyCode) {
            case 13: //Enter
                if (e.shiftKey != true && this.props.leafdata.id!=0) {
                    e.preventDefault();
                    this.props.addSibling(this.props.leafdata.id);
                }
                break;
            case 9: //Tab
                if (e.shiftKey!=true)
                {
                    e.preventDefault()
                    this.props.addChild(this.props.leafdata.id)
                }
                else
                {
                    e.preventDefault()
                    this.props.walk(StateProvider.whereToMove().LEVELUP);
                }
                break;
            case 46: //Delete
                    e.preventDefault()
                    this.props.delete(this.props.leafdata.id)
                    break;
            case 38: //UP

                if (e.shiftKey!=true)
                {
                    e.preventDefault()
                    this.props.walk(StateProvider.whereToMove().UP);
                }
                break;
            case 40: //Down
                if (e.shiftKey!=true)
                {
                    e.preventDefault()
                    this.props.walk(StateProvider.whereToMove().DOWN);
                    break;
                }
            // case 37 : //LEFT
            //     e.preventDefault()
            //     this.props.walk(StateProvider.whereToMove().LEVELUP);
            //     break;
            // case 39: //RIGHT
            //     e.preventDefault()
            //     this.props.walk(StateProvider.whereToMove().LEVELDOWN);
            //     break;
        }
    }

    onChangeHandler(e)
    {
        let newleaf = Object.assign({},this.props.leafdata)
        newleaf.description=e.target.value
        this.props.edit(newleaf)
    }


    _getTextAreaStyle()
    {
        let leafsize=this._getLeafSize()

        return {
            textAlign: "left",
            backgroundColor: "transparent",
            border: "none",
            width: leafsize.width,
            height: leafsize.height,
            margin: "1px",
            padding: "0px",
            minWidth: "50px",
            verticalAlign: "middle",
            color: "white",
            webkitUserSelect : "auto",
            //webkitOverflowScrolling: "touch"
        }
    }

    _getLeafStyle()
    {
        let color=this.props.leafdata.color;
        if(color==undefined){color="silver"};

        return {
            textAlign: "left",
            backgroundColor: color,
            padding: "10px",
            marginTop: "1px",
            marginBottom: "1px",
            marginLeft:"0px",
            marginRight:"0px",
            borderRadius:"10px",
            resize: "both"
            }
    }

    _getLeafSize() {
        let widthtobeset = "50px"
        if (typeof (this.props.leafdata.description) == "string") {
            let lines = this.props.leafdata.description.split('\n')
            let reducer = (acc, curr) => {
                if (acc < curr) {
                    return curr
                } else {
                    return acc
                }
            };
            let maxwidth = lines.map((line) => line.length).reduce(reducer, 5)
            widthtobeset = (Math.floor(maxwidth / 5) * 75)
            if (widthtobeset > 200) {
                widthtobeset = 200
            }
            widthtobeset = widthtobeset + "px"
        }
        let out= {
            width: widthtobeset
        }
        return out;
    }

    _getMenuVisibility()
    {
        if(this._getIsFocused())
        {
            return {display: "block" }
        }
        else
        {
            return {display: "none"}
        }
    }

    _getIsFocused()
    {
        if(this.props.leafdata.id==this.props.focusId)
        {
            return true;
        }
        else
        {
            return false;
        }
    }



    _getDOM(){
    return (
        <div className="Leaf"
             onKeyDown={(e)=>this.keyDownHandler(e)}
             onMouseOver={(e)=>this.setState({hover:true})}
             onMouseLeave={(e)=>this.setState({hover:false})}
             style={this._getLeafStyle()}
             ref={(e)=>{this.leafRef=e}} >
            <div className="Leaf-Row">
                <div className="Leaf-Columns"
                     onClick={(e)=>{this.props.jump(this.props.leafdata.id)}}
                >
                    <div className="Leaf-Row">
                        <div className="Leaf-Colomuns">
                            <MarkDownTextBoxWrapper leafdata={this.props.leafdata}
                                             onChange={(e)=>this.onChangeHandler(e)}
                                             focus={this._getIsFocused()}
                                             descriptionStyle={{minWidth: "100px", maxWidth: "200px"}}
                                             textAreaStyle={{height:"170px",fontFamily:"sans-serif", fontSize:"100%"}}
                                              />
                        </div>
                    </div>
                    <div className="Leaf-Row"><ImgViewer leafdata={this.props.leafdata} ImgStyle={{width:'200px'}}/></div>
                </div>
                <div className="Leaf-Colomuns">
                    <ImageMenu leafdata={this.props.leafdata}
                          edit={this.props.edit}
                          addChild={this.props.addChild}
                          addSibling={this.props.addSibling}
                          changePreviewMode={this.props.changePreviewMode}
                          style={this._getMenuVisibility()}/>
                </div>
            </div>
        </div>

    )
    }

    render() {
        //const { isDragging,dragSource, text, connectDropTarget, isOver, children } = this.props;
        const { connectDragSource, connectDropTarget } = this.props;
        return (
             connectDropTarget(connectDragSource(
                 this._getDOM()
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

Leaf=DropTarget("leaf", dropSpec, collectDrop)(Leaf)
Leaf=DragSource("leaf", dragSpec, collectDrag)(Leaf)

export default Leaf ;
