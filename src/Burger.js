import React, { Component } from 'react';
import './Burger.css';

class Burger extends Component {

    constructor(props) {
        super(props);
    }

    render() {
    return (
        <div id="hamburger" style={this.props.style}>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
    }
}

export default Burger;
