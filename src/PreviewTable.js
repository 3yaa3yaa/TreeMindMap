import React, { Component } from 'react';
import Property from "./Property";
import { MarkdownTextBox } from '@3yaa3yaa/markdowntextbox';
import './PreviewTable.css'
import ImgViewer from "./ImgViewer";

export default class PreviewTable extends Component {

    constructor(props) {
        super(props);
        this.leafdata=this.props.leafdata;
        this.fields=this.props.leafdata.getLabelFieldsOfChildren();
    }

    getHeader()
    {
        let array = ["Content","Images"];
        array= array.concat(this.fields);
        array = array.map(el=>{return <div className="PreviewTable-Cell">{el}</div>})

        return <div className="PreviewTable-Header">{array}</div>;
    }

    removeLabelAndFunction(text)
    {
        let out=text;
        out=out.replace(/#[^ ]+?(\n|\r|\r\n| |$)/g,'');
        out=out.replace(/=[^ ]+?(\n|\r|\r\n| |$)/g,'');
        return out;
    }

    getContent()
    {
        let array = [this.leafdata];
        array=array.concat(this.leafdata.getAllChildren(this.leafdata.id));
        return array.map((item)=>{
            let cells=[<MarkdownTextBox value={this.removeLabelAndFunction(item.description)}
                                        focus={false} />];
            cells.push(<ImgViewer leafdata={item} />)
            for(let field of this.fields)
            {
                let val="";
                if(item.labelExists(field))
                {
                    let tmp = item.getLabelValues(field);
                    if(tmp.length>0)
                    {
                        val = tmp;
                    }
                    else
                    {
                        val = '\u2705';
                    }
                }
                else
                {
                     val = '';
                }
                cells.push(val);
            }
            cells=cells.map(el=>{return <div className="PreviewTable-Cell">{el}</div>});
            return <div className="PreviewTable-Row">{cells}</div>});
    }

    render() {
        return <div className="PreviewTable">
            {this.getHeader()}
            {this.getContent()}
               </div>
    }
}

