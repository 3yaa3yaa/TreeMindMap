import React, { Component } from 'react';
import './PreviewMenu.css';
import Property from "./Property";
import backToEditImg from './images/backtoedit.png'
import goPreviewImg from './images/gopreview.png'
import exportImg from './images/export.png'


export default class PreviewMenu extends Component {

    constructor(props) {
        super(props);
        this.export=this.props.export;
        this.changePreviewMode=this.props.changePreviewMode;
        console.log(JSON.stringify(this.dom))
    }

    getBackButton()
    {
        const id="PreviewMenu-Back";
        return <li className="PreviewMenu-button">
                <label htmlFor={id} className="ImageMenu-Label">
                    <img className="PreviewMenu-Img" src={backToEditImg} alt="Back to Edit" />
                </label>
                <input type='button' id={id} className="PreviewMenu-Item"
                       onClick={(e) => {this.changePreviewMode(Property.previewMode().none)}} />
            </li>
    }

    // getPreviewButton()
    // {
    //     const id="PreviewMenu-Preview";
    //     return <li className="PreviewMenu-button">
    //         <label htmlFor={id} className="ImageMenu-Label">
    //             <img className="PreviewMenu-Img" src={goPreviewImg} alt="Preview/Export view" />
    //         </label>
    //         <input type='button' id={id} className="PreviewMenu-Item"
    //                onClick={(e) => {this.props.changeMode(Property.readOnlyLevel().softReadOnly)}} />
    //     </li>
    // }

    getExportButton()
    {
        const id="PreviewMenu-Export";
        return <li className="PreviewMenu-button">
            <label htmlFor={id} className="ImageMenu-Label">
                <img className="PreviewMenu-Img" src={exportImg} alt="Preview/Export view" />
            </label>
            <input type='button' id={id} className="PreviewMenu-Item"
                   onClick={() => {
                       this.export();
                       }
                   } />
        </li>
    }

    getButtons()
    {
        return <ul className="PreviewMenu-buttons">
            {this.getBackButton()}
            {this.getExportButton()}
        </ul>;
    }

    // getButtons()
    // {
    //     switch (this.props.mode) {
    //         case Property.readOnlyLevel().canEdit:
    //             return <ul className="PreviewMenu-buttons">
    //                 {this.getPreviewButton()}
    //             </ul>;
    //         case Property.readOnlyLevel().softReadOnly:
    //             return <ul className="PreviewMenu-buttons">
    //                 {this.getBackButton()}
    //                 {this.getExportButton()}
    //             </ul>;
    //         case Property.readOnlyLevel().hardReadOnly:
    //             return <ul className="PreviewMenu-buttons">
    //                 {this.getExportButton()}
    //             </ul>;
    //         default:
    //             return "";
    //     }
    // }

    render() {
        return <div className="PreviewMenu">
            {this.getButtons()}
        </div>
    }
}