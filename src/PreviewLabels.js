import React, { Component } from 'react';
import Property from "./Property";
import {MarkdownTextBox} from "@3yaa3yaa/markdowntextbox"
import './PreviewLabels.css'
import ReadOnlyLeaf from "./ReadOnlyLeaf";

export default class PreviewLabels extends Component {

    constructor(props) {
        super(props);
        this.leafdata=this.props.leafdata;
        this.fields=this.props.leafdata.getLabelFieldsOfChildren();
    }

    getContent()
    {
        if(this.fields.length>0)
        {
            return this.fields.map((field)=>{
                let items=this.leafdata.getAllChildren().map((child)=>{
                    if(child.labelExists(field))
                    {
                        return <div style={{display: "inline-block", margin: "5px", verticalAlign: "top", maxWidth:"230px"}}>
                            <ReadOnlyLeaf leafdata={child}/>
                        </div> ;
                    }
                    else
                    {
                        return null;
                    }
                }).filter((item)=>{return item!=null});
                return  <div><h1>{field}</h1>{items}</div>
            })
        }
        else
        {
            return <div>No Labels! Let's try adding #label on your Mind Map!</div>
        }
    }


    render() {
        return <div>{this.getContent()}</div>
    }
}

