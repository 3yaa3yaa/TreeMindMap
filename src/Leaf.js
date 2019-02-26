import React, { Component } from 'react';
import './Leaf.css';
import ImgViewer from './ImgViewer'
import Menu from './Menu'
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
                // if (e.altKey==true)
                // {
                //     e.preventDefault()
                //     this.props.addChild(this.props.leafdata.id)
                //     break;
                // }
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
        let lines = this.props.leafdata.title.split('\n')
        let maxwidth= lines.reduce((acc,curr)=>{if(acc<curr){acc=curr}})
        let out={
            width: maxwidth * 10  ,
            height: lines.length
        }
        alert(out.width)

        return out

    }


    _getDOM()
    {
    return (
        <div className="Leaf">
            <ImgViewer leafdata={this.props.leafdata}/>
            <div className="Leaf-Row">
                <div className="Leaf-Colomuns">
                </div>
                <div className="Leaf-Colomuns">
                <textarea className="Leaf-TextArea" type="text" style={(e)=>this._getTextAreaStyle()}
                          value={this.props.leafdata.title}
                          onKeyDown={(e)=>this.keyDownHandler(e)}
                          onChange={(e)=>this.onChangeHandler(e)}
                          ref={(e)=>{ this.leafRef=e}} />
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
    return (
        this._getDOM()
    );
    }
}

export default Leaf;
