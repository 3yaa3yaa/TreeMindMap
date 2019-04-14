import React, { Component } from 'react';
import './Leaf.css';
import ImgViewer from './ImgViewer'
import Menu from './Menu'
import { DragSource, DropTarget } from 'react-dnd'

class Leaf extends Component {

    constructor(props) {
        super(props);
        this.leafRef=React.createRef()

    }

    componentDidMount()
    {
        this.leafRef.focus()
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

    _getTextAreaStyle()
    {
        let widthtobeset="50px"
        let heighttobeset="20px"
        if(typeof(this.props.leafdata.title)=="string")
        {
            let lines = this.props.leafdata.title.split('\n')
            let reducer=(acc,curr)=>{if(acc<curr){return curr}else{return acc}};
            let maxwidth= lines.map((line)=>line.length).reduce(reducer,5)
            widthtobeset= (Math.floor(maxwidth  / 5) *75)
            if(widthtobeset>200) {widthtobeset=200}
            widthtobeset=widthtobeset+"px"
            //heighttobeset=(lines.length * 20)+"px"
            heighttobeset=this.leafRef.scrollHeight
        }

        let out={
            width: widthtobeset  ,
            height: heighttobeset
            // width: "100px",
            // height: "50px"
        }

        return out

    }

    _getLeafStyle()
    {
        let color=this.props.leafdata.color
        let inheritedColor = this.props.inheritedColor
        if(typeof (color)!='undefined')
        {
            return {backgroundColor: color}
        }
        else
        {
            if(typeof(inheritecColor)!='undefined')
            {
                return {backgroundColor: inheritedColor}
            }
            else
            {
                return {backgroundColor: "palegreen"}
            }
        }
    }


    _getDOM(){
    return (
        <div className="Leaf" style={this._getLeafStyle()}>
            <div className="Leaf-Row">
                <div>
                    <ImgViewer leafdata={this.props.leafdata}/>
                <div className="Leaf-Colomuns">
                <textarea className="Leaf-TextArea" type="text" style={this._getTextAreaStyle()}
                          value={this.props.leafdata.title}
                          onKeyDown={(e)=>this.keyDownHandler(e)}
                          onChange={(e)=>this.onChangeHandler(e)}
                          ref={(e)=>{ this.leafRef=e}} />
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
        const { dragSource,  connectDropTarget } = this.props;
        return (
             connectDropTarget(dragSource(this._getDOM()))
        );
    }
}

const dragSpec = {
    beginDrag: (props) => { return props.leafdata },
    endDrag: (props, monitor)=>{alert(JSON.stringify(monitor.getItem()));alert(JSON.stringify(monitor.getDropResult()))}
}


const dropSpec = {
    drop: (props, monitor, component)=> {
        return props.leafdata;
    }
}


function collectDrag(connect, monitor) {
    return {
        dragSource: connect.dragSource(),
        isDragging: monitor.isDragging(),
    }
}

function collectDrop(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
    }
}

Leaf=DragSource("leaf", dragSpec, collectDrag)(Leaf)
Leaf=DropTarget("leaf", dropSpec, collectDrop)(Leaf)

export default Leaf ;
