import React, { Component } from 'react';
import './ImageMainMenu.css';
import Property from "./Property";
import backToEditImg from './images/backtoedit.png'
import goPreviewImg from './images/gopreview.png'
import exportImg from './images/export.png'
import {saveAs} from "file-saver";
import html2canvas from 'html2canvas';


export default class ImageMenu extends Component {

    constructor(props) {
        super(props);
    }

    getBackButton()
    {
        const id="ImageMainMenu-Back";
        return <li className="ImageMainMenu-button">
                <label htmlFor={id} className="ImageMenu-Label">
                    <img className="ImageMainMenu-Img" src={backToEditImg} alt="Back to Edit" />
                </label>
                <input type='button' id={id} className="ImageMainMenu-Item"
                       onClick={(e) => {this.props.changeMode(Property.readOnlyLevel().canEdit)}} />
            </li>
    }

    getPreviewButton()
    {
        const id="ImageMainMenu-Preview";
        return <li className="ImageMainMenu-button">
            <label htmlFor={id} className="ImageMenu-Label">
                <img className="ImageMainMenu-Img" src={goPreviewImg} alt="Preview/Export view" />
            </label>
            <input type='button' id={id} className="ImageMainMenu-Item"
                   onClick={(e) => {this.props.changeMode(Property.readOnlyLevel().softReadOnly)}} />
        </li>
    }

    getExportButton()
    {
        const id="ImageMainMenu-Export";
        return <li className="ImageMainMenu-button">
            <label htmlFor={id} className="ImageMenu-Label">
                <img className="ImageMainMenu-Img" src={exportImg} alt="Preview/Export view" />
            </label>
            <input type='button' id={id} className="ImageMainMenu-Item"
                   onClick={(e) => {
                       html2canvas(this.props.dom).then(function(canvas) {
                           canvas.toBlob((blob => {saveAs(blob,'treemindmap.png')}));
                       });
                       }
                   } />
        </li>
    }

    getButtons()
    {
        switch (this.props.mode) {
            case Property.readOnlyLevel().canEdit:
                return <ul className="ImageMainMenu-buttons">
                    {this.getPreviewButton()}
                </ul>;
            case Property.readOnlyLevel().softReadOnly:
                return <ul className="ImageMainMenu-buttons">
                    {this.getBackButton()}
                    {this.getExportButton()}
                </ul>;
            case Property.readOnlyLevel().hardReadOnly:
                return <ul className="ImageMainMenu-buttons">
                    {this.getExportButton()}
                </ul>;
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