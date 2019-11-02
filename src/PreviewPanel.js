import React, { Component } from 'react';
import './PreviewPanel.css';
import Property from "./Property";
import Tree from './Tree'
import PreviewMenu from "./PreviewMenu";
import PreviewTable from "./PreviewTable";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";

class PreviewPanel extends Component {

    constructor(props) {
        super(props);
        this.leafdata=this.props.leafdata;
        this.previewMode=this.props.previewMode;
        this.changePreviewMode=this.props.changePreviewMode;
        this.previewRef = React.createRef();
    }

    getContent()
    {
        switch(this.previewMode)
        {
            case Property.previewMode().Tree:
                let props = new Property();
                props.isReadOnly=Property.readOnlyLevel().hardReadOnly;
                return <Tree root={this.leafdata} property={props}/>;
            case Property.previewMode().Table:
                return <PreviewTable leafdata={this.leafdata} />;
            default:
                return "";
        }
    }

    doExport()
    {
        html2canvas(this.previewRef.current).then(function(canvas) {
            canvas.toBlob((blob => {saveAs(blob,'treemindmap.png')}));
        });
    }


    render() {
        return <div className="PreviewPanel">
                    <div className="PreviewPanel-Menu">
                        <PreviewMenu export={()=>{this.doExport()}}
                                     changePreviewMode={this.changePreviewMode}
                        />
                    </div>
                    <div className="PreviewPanel-Main" ref={this.previewRef}>
                        {this.getContent()}
                    </div>
                </div>
    }
}

export default PreviewPanel;
