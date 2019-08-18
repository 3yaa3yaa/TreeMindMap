import React, { Component } from 'react';
import './Leaf.css';
import ImgViewer from './ImgViewer'
import Menu from './Menu'
import { DragSource, DropTarget } from 'react-dnd'
import MarkdownTextBox from 'markdowntextbox';
import StateProvider from './StateProvider'

class Leaf extends Component {

    constructor(props) {
        super(props);
        this.leafTextAreaRef=React.createRef()
        this.leafRef=React.createRef()
        this.state={focused:true}
        //this.leafTextAreaRef.onfocus=()=>{this.setState({focused:true})}
        //this.leafTextAreaRef.onblur=()=>{this.setState({focused:false})}
    }

    componentDidMount()
    {
        //this.leafTextAreaRef.focus()
    }



    onChange(e)
    {
        // let newdata = this.state.data
        // newdata.name=e.target.value
        // this.setState({ data : newdata });
    }

    keyDownHandler(e) {
        switch (e.keyCode) {
            case 13: //Enter
                if (e.shiftKey != true) {
                    e.preventDefault()
                    this.props.addSibling(this.props.leafdata.id)
                }
                break;
            case 9: //Tab
                if (e.shiftKey!=true)
                {
                    e.preventDefault()
                    this.props.addChild(this.props.leafdata.id)
                }
                break;
            case 46: //Delete
                    e.preventDefault()
                    this.props.delete(this.props.leafdata.id)
                    break;
        }
    }

    onChangeHandler(e)
    {
        let newleaf = this.props.leafdata
        newleaf.title=e.target.value
        this.props.edit(newleaf)
    }

    onFocusHandler(e)
    {
        this.setState({focused:true})
        //this.leafRef.style={backgroundColor: "#0000FF"};
    }

    onBlurHandler(e)
    {

        this.setState({focused:false})
        //this.leafRef.style
        //this.leafRef.style={backgroundColor: "#FF0000"};
    }

    _getLeafInputFieldsStyle()
    {
        if(this.state.focused)
        {
            return {opacity:"1"}
        }
        else
        {
            return {opacity: "0"}
        }
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
            webkitOverflowScrolling: "touch"
        }
    }

    _getLeafStyle()
    {
        let color=this.props.leafdata.color
        let inheritedColor = this.props.inheritedColor
        let sizeinfo = this._getLeafSize()
        if(typeof (color)!='undefined')
        {
            return {backgroundColor: color,
                    width: sizeinfo.width,
                    height: sizeinfo.height}
        }
        else
        {
            if(typeof(inheritecColor)!='undefined')
            {
                return {backgroundColor: inheritedColor,
                        width: sizeinfo.width,
                        height: sizeinfo.height}
            }
            else
            {
                return {backgroundColor: "palegreen",
                        width: sizeinfo.width,
                        height: sizeinfo.height}
            }
        }
    }

    _getLeafFirstColumnStyle()
    {
        let leafsize=this._getLeafSize()

        let out={
            width: leafsize.width,
            height: leafsize.height
        }
        return out
    }

    _getLeafSize() {
        let widthtobeset = "50px"
        let heighttobeset = "20px"
        if (typeof (this.props.leafdata.title) == "string") {
            let lines = this.props.leafdata.title.split('\n')
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
            //heighttobeset=(lines.length * 20)+"px"
            heighttobeset = this.leafTextAreaRef.scrollHeight
        }
        let out= {
            width: widthtobeset,
            height: heighttobeset
        }
        return out;
    }

    _getDOM(){
    return (
        <div className="Leaf"
             onFocus={(e)=>this.onFocusHandler(e)}
             onBlur={(e)=>this.onBlurHandler(e)}
             ref={(e)=>{this.leafRef=e}} >
            <div className="Leaf-Row">
                <div className="Leaf-Columns" style={this._getLeafFirstColumnStyle()}>
                    <div className="Leaf-Row"><ImgViewer leafdata={this.props.leafdata}/></div>
                    <div className="Leaf-Row">
                        <div className="Leaf-Colomuns">
                            <MarkdownTextBox value={this.props.leafdata.title}
                                             style={this._getTextAreaStyle()}
                                             onKeyDown={(e)=>this.keyDownHandler(e)}
                                             onChange={(e)=>this.onChangeHandler(e)}
                                              />
                        </div>
                    </div>
                </div>
                <div className="Leaf-Colomuns">
                    <Menu leafdata={this.props.leafdata}
                          edit={this.props.edit}
                          addChild={this.props.addChild}
                          addSibling={this.props.addSibling}/>
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
                dragged.parentid=dropped.id
                component.props.edit(dragged)
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
