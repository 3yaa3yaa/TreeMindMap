import React, { Component } from 'react';
import './Leaf.css';
import Thumbnail from './Thumbnail'
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
        let out=""
        let leaf = this.props.leafdata;
        //out=leaf.title.match(/http[^ ]+/);

        let re = new RegExp('http[^ ]+');
        if (re.test(leaf.title))
        {
            re.exec(leaf.title)
            out = re.$1
        }
        return out
    }

    _getDOM()
    {
    return (
        <div className="Leaf">
            <textarea className="Leaf-TextArea" type="text"
                      draggable="true"
                //value={this.props.leafdata.id}
                      onKeyDown={(e)=>this.keyDownHandler(e)}
                      onChange={(e)=>this.onChangeHandler(e)}
                      ref={(e)=>{ this.leafRef=e}} />
            <br/>
            <Thumbnail text={this.props.leafdata.title} />

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
