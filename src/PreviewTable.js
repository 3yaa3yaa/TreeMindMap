import React, { Component } from 'react';
import Property from "./Property";
import MarkdownTextBox from '@3yaa3yaa/markdowntextbox';

export default class PreviewTable extends Component {

    constructor(props) {
        super(props);
        this.leafdata=this.props.leafdata;
    }

    getContent()
    {
        let array = [this.leafdata];
        array=array.concat(this.leafdata.getAllChildren(this.leafdata.id));
        return array.map((item)=>{return <div className="PreviewTable-Row">
            <div className="PreviewTable-Cell">
                <MarkdownTextBox value={item.description} focus={false}/>
            </div>
            </div>});
    }

    render() {
        return <div className="PreviewTable">
            <div className="PreviewTable-Header">Contents</div>
            {this.getContent()}
               </div>
    }
}

