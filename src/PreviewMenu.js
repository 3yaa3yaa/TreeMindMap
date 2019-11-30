import React, { Component } from 'react';
import './PreviewMenu.css';
import Property from "./Property";
import backToEditImg from './images/backtoedit.png'
import goPreviewImg from './images/gopreview.png'
import exportImg from './images/export.png'
import tableimg from './images/gotable.png'


export default class PreviewMenu extends Component {

    constructor(props) {
        super(props);
        this.export=this.props.export;
        this.changePreviewMode=this.props.changePreviewMode;
    }

    getCommandButton(previewMode, buttonimg, text, onClick)
    {
        const id="PreviewMenu-" + text;
        return <li className="PreviewMenu-button">
            <label htmlFor={id} className="ImageMenu-Label" style={this.getCommandLabelStyle(previewMode)}>
                <img className="PreviewMenu-Img" src={buttonimg} alt="Preview/Export view" />
                <div className="PreviewMenu-ButtonLabel">{text}</div>
            </label>
            <input type='button' id={id} className="PreviewMenu-Item"
                   onClick={(e) => {onClick(e)}} />
        </li>
    }

    getCommandLabelStyle(previewMode)
    {
        if(previewMode===this.props.previewMode)
        {
            return {fontWeight:"bold"}
        }
    }

    getButtons()
    {
        return <ul className="PreviewMenu-buttons">
            {this.getCommandButton(Property.previewMode().none, backToEditImg,"Back"
                , () => {this.changePreviewMode(Property.previewMode().none)})}
            {this.getCommandButton(Property.previewMode().Tree, goPreviewImg,"Preview"
                , () => {this.changePreviewMode(Property.previewMode().Tree)})}
            {this.getCommandButton(Property.previewMode().Sentence, goPreviewImg,"Composition"
                , () => {this.changePreviewMode(Property.previewMode().Sentence)})}
            {this.getCommandButton(Property.previewMode().Table, tableimg,"Labels"
                , () => {this.changePreviewMode(Property.previewMode().Table)})}
            {this.getCommandButton(Property.previewMode().List, tableimg,"List"
                , () => {this.changePreviewMode(Property.previewMode().List)})}
            {this.getCommandButton(Property.previewMode().none, exportImg,"Export"
                , () => {this.export()})}
        </ul>;
    }

    render() {
        return <div className="PreviewMenu">
            {this.getButtons()}
        </div>
    }
}