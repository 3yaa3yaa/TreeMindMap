import React, { Component } from 'react';
import './Leaf.css';
import LeafData from './LeafData';

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
                    break;
                }

        }
    }

    onChangeHandler(e)
    {
        let newleaf = this.props.leafdata
        newleaf.title=e.target.value
        this.props.edit(newleaf)
    }

    _getThumbnail()
    {
        let leaf = this.props.leafdata;
        return leaf.title
    }

    _getDOM()
    {
    return (
        <div>
            <img src={this._getThumbnail()}></img>
            <textarea type="text"
                      className="Leaf-Input"
                      draggable="true"
                //value={this.props.leafdata.id}
                      onKeyDown={(e)=>this.keyDownHandler(e)}
                      onChange={(e)=>this.onChangeHandler(e)}
                      ref={(e)=>{ this.leafRef=e}} />
        </div>
    )
    }

    render() {
    return (
        <div className="Leaf">{this._getDOM()}</div>
    );
    }
}

export default Leaf;
