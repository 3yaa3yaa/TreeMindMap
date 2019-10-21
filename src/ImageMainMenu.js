import React, { Component } from 'react';
import './ImageMainMenu.css';
import Property from "./Property";
import backToEditImg from './images/backtoedit.png'
import goPreviewImg from './images/gopreview.png'
import exportImg from './images/export.png'
import domtoimage from "dom-to-image";
import {saveAs} from "file-saver";

export default class ImageMenu extends Component {

    constructor(props) {
        super(props);
    }

    getBackButton()
    {
        const id="ImageMainMenu-Back";
        return <div className="ImageMainMenu-button">
                <label htmlFor={id} className="ImageMenu-Label">
                    <img className="ImageMainMenu-Img" src={backToEditImg} alt="Back to Edit" />
                </label>
                <input type='button' id={id} className="ImageMainMenu-Item"
                       onClick={(e) => {this.props.changeMode(Property.readOnlyLevel().canEdit)}} />
            </div>
    }

    getPreviewButton()
    {
        const id="ImageMainMenu-Preview";
        return <div className="ImageMainMenu-button">
            <label htmlFor={id} className="ImageMenu-Label">
                <img className="ImageMainMenu-Img" src={goPreviewImg} alt="Preview/Export view" />
            </label>
            <input type='button' id={id} className="ImageMainMenu-Item"
                   onClick={(e) => {this.props.changeMode(Property.readOnlyLevel().softReadOnly)}} />
        </div>
    }

    getExportButton()
    {
        const id="ImageMainMenu-Export";
        return <div className="ImageMainMenu-button">
            <label htmlFor={id} className="ImageMenu-Label">
                <img className="ImageMainMenu-Img" src={exportImg} alt="Preview/Export view" />
            </label>
            <input type='button' id={id} className="ImageMainMenu-Item"
                   onClick={(e) => {
                       domtoimage.toBlob(this.props.dom)
                           .then(function (blob) {
                               saveAs(blob, 'treemindmap.png');
                           })}
                   } />
        </div>
    }

    getButtons()
    {
        switch (this.props.mode) {
            case Property.readOnlyLevel().canEdit:
                return <div className="ImageMainMenu-buttons">
                    {this.getPreviewButton()}
                </div>;
            case Property.readOnlyLevel().softReadOnly:
                return <div className="ImageMainMenu-buttons">
                    {this.getBackButton()}
                    {this.getExportButton()}
                </div>;
            case Property.readOnlyLevel().hardReadOnly:
                return <div className="ImageMainMenu-buttons">
                    {this.getExportButton()}
                </div>;
            default:
                return "";
        }
    }

    render() {
        return <div className="ImageMainMenu">
            {this.getButtons()}
        </div>
    }
}