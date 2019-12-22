import React, { Component } from 'react';
import Property from "./Property";
import MarkDownTextBoxWrapper from "./MarkDownTextBoxWrapper";
import ImgViewer from "./ImgViewer";
import InstructionMessage from "./InstructionMessage";
import LeafData from "./LeafData";

export default class PreviewSentence extends Component {

    constructor(props) {
        super(props);
        this.leafdata=this.props.leafdata;
        this.fields=this.props.leafdata.getLabelFieldsOfChildren();
    }

    getContent()
    {
        if(this.leafdata.isNullObject())
        {
            return <InstructionMessage />
        }
        else
        {
            let out=[];
            this.fillContents(this.leafdata,1, out);
            return out;
        }
    }

    fillContents(leafdata, depth, out)
    {
        if(leafdata.description!="")
        {
            out.push(this.getTag(depth,leafdata));
        }
        if(leafdata.imgs.length>0)
        {
            out.push(<ImgViewer leafdata={leafdata}   ImgStyle={{width:'500px'}}/>);
        }
        leafdata.children.forEach((child)=>this.fillContents(child, depth+1, out))
    }

    removeHeader(text)
    {
        return text.replace(/h[1-7]\./g,'');
    }

    firstlineHasSpecialCharacter(text) {
        let re = /^[^\n]*(```|#|\=sum|\=count|\=mean)/g;
        return re.test(text);
    }



    getTag(depth,leafdata)
    {
        let outputdata = LeafData.getNewObject(leafdata);
        outputdata.description=this.removeHeader(leafdata.description)
        if(outputdata.children.length>0 && depth<7 && !this.firstlineHasSpecialCharacter(outputdata.description)) {
            outputdata.description = 'h' + depth + '.' + outputdata.description;
        }
        return <div key={leafdata.id} className="PreviewSentence-Paragraph" style={{display:"block", marginBottom:"5px"}}>
            <MarkDownTextBoxWrapper leafdata={outputdata}/>
        </div>;

    }


    render() {
        return <div className="PreviewSentence" style={{marginTop:"10px"}} >
            {this.getContent()}
               </div>
    }
}

