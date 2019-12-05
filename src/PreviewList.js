import React, { Component } from 'react';
import Property from "./Property";
import { MarkdownTextBox } from '@3yaa3yaa/markdowntextbox';
import ImgViewer from "./ImgViewer";
import InstructionMessage from "./InstructionMessage";

export default class PreviewList extends Component {

    constructor(props) {
        super(props);
        this.leafdata=this.props.leafdata;
        this.fields=this.props.leafdata.getLabelFieldsOfChildren();
    }

    getHeader()
    {
        let array = ["Content","Images"];
        array= array.concat(this.fields);
        array = array.map(el=>{return <div style={this.GetPreviewListCellStyle()}>{el}</div>})

        return <div style={this.GetPreviewListHeaderStyle()}>{array}</div>;
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
            cells.push(<ImgViewer leafdata={item}  ImgStyle={{width:'300px'}}/>)
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
            cells=cells.map(el=>{return <div style={this.GetPreviewListCellStyle()}>{el}</div>});
            return <div style={this.GetPreviewListRowStyle()}>{cells}</div>});
    }

    GetPreviewListStyle() {
        return {display: "table",
        width:"auto",
        borderStyle: "solid",
        borderWidth: "0.3px",
        borderColor: "darkslategray",
        marginTop: "15px",
        marginRight:"15px"}
    }


    GetPreviewListHeaderStyle() {
        return {display: "table-header-group",
        fontWeight: "bold"}
    }

    GetPreviewListRowStyle() {
        return {display: "table-row"}
    }

    GetPreviewListCellStyle() {
        return {display: "table-cell",
                verticalAlign: "top",
                textAlign: "left",
                maxWidth:"600px",
                padding: "3px",
                borderStyle: "solid",
                borderWidth: "0.3px",
                borderColor: "darkslategray"}
    }

    getContentOrInstruction()
    {
        if(this.leafdata.isNullObject())
        {
            return <InstructionMessage />
        }
        else
        {
            return <div style={this.GetPreviewListStyle()}>
                {this.getHeader()}
                {this.getContent()}
            </div>
        }
    }


    render() {
        return this.getContentOrInstruction()
    }
}

