import React, { Component } from 'react';
import './PreviewPanel.css';
import Property from "./Property";
import Tree from './Tree'
import PreviewMenu from "./PreviewMenu";
import PreviewTable from "./PreviewTable";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";
import PreviewSentence from "./PreviewSentence";
import PreviewList from "./PreviewList";

class PreviewPanel extends Component {

    constructor(props) {
        super(props);
        this.leafdata=this.props.leafdata;
        this.changePreviewMode=this.props.changePreviewMode;
        this.previewRef = React.createRef();
    }

    getContent()
    {
        switch(this.props.previewMode)
        {
            case Property.previewMode().Tree:
                let props = new Property();
                props.isReadOnly=Property.readOnlyLevel().hardReadOnly;
                return <Tree root={this.leafdata} property={props}/>;
            case Property.previewMode().List:
                return <PreviewList leafdata={this.leafdata} />;
            case Property.previewMode().Table:
                return <PreviewTable leafdata={this.leafdata} />;
            case Property.previewMode().Sentence:
                return <PreviewSentence leafdata={this.leafdata} />;
            default:
                return "";
        }
    }

    doExport()
    {
        switch (this.props.previewMode) {
            case Property.previewMode().Sentence:
                let blob=new Blob([this.previewRef.current.innerHTML], {type: "text/plain;charset=utf-8"})
                saveAs(blob,"treemindmap.html");
                break;
            default:
                html2canvas(this.previewRef.current).then(function(canvas) {
                    canvas.toBlob((blob => {saveAs(blob,'treemindmap.png')}));
                });
                break;
        }
    }


    render() {
        return <div className="PreviewPanel">
                    <div className="PreviewPanel-Menu">
                        <PreviewMenu export={()=>{this.doExport()}}
                                     changePreviewMode={this.changePreviewMode}
                                     previewMode={this.props.previewMode}
                        />
                    </div>
                    <div className="PreviewPanel-Main" ref={this.previewRef}>
                        {this.getContent()}
                    </div>
                </div>
    }
}

export default PreviewPanel;
