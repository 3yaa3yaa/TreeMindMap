import React, { Component } from 'react';
import Property from "./Property";
import { MarkdownTextBox } from '@3yaa3yaa/markdowntextbox';
import './PreviewSentence.css'
import ImgViewer from "./ImgViewer";

export default class PreviewSentence extends Component {

    constructor(props) {
        super(props);
        this.leafdata=this.props.leafdata;
        this.fields=this.props.leafdata.getLabelFieldsOfChildren();
    }

    getContent()
    {
        let out=[];
        this.fillContents(this.leafdata,1, out);
        return out;
    }

    fillContents(leafdata, depth, out)
    {
        if(leafdata.description!="")
        {
            out.push(this.getTag(depth,leafdata.description,(leafdata.children.length>0)));
        }
        if(leafdata.imgs.length>0)
        {
            out.push(<ImgViewer leafdata={leafdata} />);
        }
        leafdata.children.forEach((child)=>this.fillContents(child, depth+1, out))
    }

    removeHeader(text)
    {
        return text.replace(/h[1-7]\./g,'');
    }

    divideMessage(text)
    {
        let arr=[];
        let tmp="";
        this.removeHeader(text).split('\n').forEach((line,index)=>{
            if(index===0)
            {
                arr.push(line);
            }
            if(index===1)
            {
                arr.push(line);
            }
            if(index>1)
            {
                arr[1]=arr[1]+"\n"+line;

            }
        });
        return arr;
    }

    getTag(depth,data,hasChildren)
    {
        let arr = this.divideMessage(data).map((line,index)=>{
            if(index===0 && hasChildren)
            {
                switch (depth) {
                    case 1:
                        return <h1 className="PreviewSentence-Header" key={index}><MarkdownTextBox value={line}/></h1>;
                    case 2:
                        return <h2 className="PreviewSentence-Header" key={index}><MarkdownTextBox value={line}/></h2>;
                    case 3:
                        return <h3 className="PreviewSentence-Header" key={index}><MarkdownTextBox value={line}/></h3>;
                    case 4:
                        return <h4 className="PreviewSentence-Header" key={index}><MarkdownTextBox value={line}/></h4>;
                    case 5:
                        return <h5 className="PreviewSentence-Header" key={index}><MarkdownTextBox value={line}/></h5>;
                    case 6:
                        return <h6 className="PreviewSentence-Header" key={index}><MarkdownTextBox value={line}/></h6>;
                    case 7:
                        return <h7 className="PreviewSentence-Header" key={index}><MarkdownTextBox value={line}/></h7>;
                    default:
                        return <p className="PreviewSentence-Paragraph" key={index}><MarkdownTextBox value={line}/></p>
                }
            }
            else
            {
                return <p><MarkdownTextBox value={line}/></p>;
            }
        })
        return arr;
    }


    render() {
        return <div className="PreviewSentence">
            {this.getContent()}
               </div>
    }
}

