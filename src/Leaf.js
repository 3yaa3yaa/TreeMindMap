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
                e.preventDefault()
                this.props.addSibling(this.props.leafdata.id)
                break;
            case 9: //Tab
                e.preventDefault()
                this.props.addChild(this.props.leafdata.id)
                break;
        }
    }

    getDOM()
    {
    return (
            <input type="text"
                   className="Leaf-Input"
                   draggable="true"
                   //value={this.props.leafdata.id}
                   onKeyDown={(e)=>this.keyDownHandler(e)}
                   onChange={this.onChange}
                   ref={(e)=>{ this.leafRef=e}}/>
    );
    }

    render() {
    return (
        <div className="Leaf">{this.getDOM()}</div>
    );
    }
}

export default Leaf;
