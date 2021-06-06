import React, { Component } from 'react';
import './PreviewPanel.css';
import Property from "./Property";
import Tree from './Tree'
import PreviewMenu from "./PreviewMenu";
import PreviewLabels from "./PreviewLabels";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";
import PreviewSentence from "./PreviewSentence";
import PreviewList from "./PreviewList";
import PropTypes from "prop-types";

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
            case Property.previewMode().Label:
                return <PreviewLabels leafdata={this.leafdata} />;
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
            case Property.previewMode().Label:
            case Property.previewMode().List:
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

    getPreviewMainStyle()
    {
        switch (this.props.previewMode) {
            case Property.previewMode().Sentence:
            case Property.previewMode().Label:
            case Property.previewMode().List:
                return {width:"100%"};
            default:
                return {width:"fit-content"};
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
                    <div className="PreviewPanel-Main" style={this.getPreviewMainStyle()} ref={this.previewRef}>
                        {this.getContent()}
                    </div>
                </div>
    }
}


PreviewPanel.propTypes={
    leafdata: PropTypes.object,
    focusId: PropTypes.object,
    edit:PropTypes.func,
    addChild: PropTypes.func,
    addSibling:PropTypes.func,
    changePreviewMode:PropTypes.func,
    previewMode:PropTypes.object,
    walk:PropTypes.func,
    delete:PropTypes.func,
    jump:PropTypes.func
}

export default PreviewPanel;
