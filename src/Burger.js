import React, { Component } from 'react';
import './Burger.css';
import PropTypes from "prop-types";

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


Burger.propTypes={
    style: PropTypes.object,
}

export default Burger;
