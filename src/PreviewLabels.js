import React, { Component } from 'react';
import './PreviewLabels.css'
import ReadOnlyLeaf from "./ReadOnlyLeaf";
import InstructionMessage from "./InstructionMessage";
import Property from "./Property";

export default class PreviewLabels extends Component {

    constructor(props) {
        super(props);
        this.leafdata=this.props.leafdata;
        this.fields=this.props.leafdata.getLabelFieldsOfChildren();
    }

    getSummary(field)
    {
        let count = this.leafdata.countLabelsOfChildren(field);
        let sum=this.leafdata.sumLabelsOfChildren(field);
        let mean=this.leafdata.meanLabelsOfChildren(field);
        if(sum>0 && count>1)
        {
            return <div style={{display:"block"}}>
                <div style={{display:"block"}}> {`Count: ${count}`}</div>
                <div style={{display:"block"}}> {`Total: ${sum}`}</div>
                <div style={{display:"block"}}> {`Average: ${mean}`}</div>
                <div style={{display:"block"}}></div>
            </div>
        }
        else
        {
            return "";
        }
    }

    getContent()
    {
        if(this.fields.length>0)
        {
            return this.fields.map((field, fieldid)=>{
                let items=this.leafdata.getAllChildren().map((child, itemid)=>{
                    if(child.labelExists(field))
                    {
                        return <div key={`val-${fieldid}-${itemid}`}
                                    testkey={`val-${fieldid}-${itemid}`}
                                    style={{display: "inline-block", margin: "5px", verticalAlign: "top", maxWidth:"230px"}}>
                            <ReadOnlyLeaf leafdata={child}/>
                        </div> ;
                    }
                    else
                    {
                        return null;
                    }
                }).filter((item)=>{return item!=null});
                return  <div key={`val-${fieldid}`} testkey={`val-${fieldid}`}><h1>{field}</h1>{items}{this.getSummary(field)}</div>
            })
        }
        else
        {
            return <InstructionMessage previewMode={Property.previewMode().Label} />
        }
    }


    render() {
        return <div>{this.getContent()}</div>
    }
}

