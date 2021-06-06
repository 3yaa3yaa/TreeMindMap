import React, { Component } from 'react';
import './Leaf.css';
import { MarkdownTextBox } from '@3yaa3yaa/markdowntextbox';
import ReservedList from "./Reserved";
import PropTypes from "prop-types";
import ReadOnlyLeaf from "./ReadOnlyLeaf";

export default class MarkDownTextBoxWrapper extends Component {

    constructor(props) {
        super(props);
        this.reservedList = new ReservedList((label)=>{return this.props.leafdata.sumLabelsOfChildren(label)}
                                            , (label)=>{return this.props.leafdata.countLabelsOfChildren(label)});
    }


    render() {
        return (
            <MarkdownTextBox value={this.props.leafdata.description}
                             reservedItems={this.reservedList.items}
                             onChange={this.props.onChange}
                             onBlur={this.props.onBlur}
                             focus={this.props.focus}
                             descriptionStyle={this.props.descriptionStyle}
                             textAreaStyle={this.props.textAreaStyle}
            />
        );
    }
}


MarkDownTextBoxWrapper.propTypes={
    leafdata: PropTypes.object,
    descriptionStyle: PropTypes.object,
    textAreaStyle: PropTypes.object,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    focus: PropTypes.func
}