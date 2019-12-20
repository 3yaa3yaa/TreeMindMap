import React, { Component } from 'react';
import './Leaf.css';
import { MarkdownTextBox } from '@3yaa3yaa/markdowntextbox';
import ReservedList from "./Reserved";

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
