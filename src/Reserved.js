import React from "react";
import { Reserved } from '@3yaa3yaa/markdowntextbox'


export default class ReservedList
{
    constructor(callback_sum, callback_count)
    {
        let arr=[];
        this.callback_sum=callback_sum;
        this.callback_count=callback_count;
        arr.push(new Reserved('#',[" ","\n","\r\n","\r"], (node)=>{return this.getTagJSX(node)},"label(:value)"))
        arr.push(new Reserved('=count(',[")"], (node)=>{return this.getCountJSX(node)},"label"))
        arr.push(new Reserved('=sum(',[")"], (node)=>{return this.getSumJSX(node)},"label"))
        arr.push(new Reserved('=mean(',[")"], (node)=>{return this.getMeanJSX(node)},"label"))
        this.items=arr;
    }

    getMeanJSX(text){
        if(text===null || text===undefined){text=""};
        return <div style={this.getBoldTagStyle()}>{this.callback_sum(text)/this.callback_count(text)}</div>;
    }

    getSumJSX(text)
    {
        if(text===null || text===undefined){text=""};
        return <div style={this.getBoldTagStyle()}>{this.callback_sum(text)}</div>;
    }

    getCountJSX(text)
    {
        if(text===null || text===undefined){text=""};
        return <div style={this.getBoldTagStyle()}>{this.callback_count(text)}</div>;
    }


    getTagJSX(text)
    {
        return <div style={this.getTagStyle()}>{text}</div>;
    }

    getTagStyle()
    {
        return {
            display:"block",
            textAlign: "justify",
            verticalAlign:"middle",
            backgroundColor: "#FFDDFF",
            fontsize:"8px",
            paddingLeft: "10px",
            paddingRight: "10px",
            borderBottomLeftRadius:"20px",
            borderTopLeftRadius:"20px",
            borderBottomRightRadius:"20px",
            borderTopRightRadius:"20px",
            width: "fit-content",
            // height: "10px",
            color: "#FF00FF"
        }
    }

    getBoldTagStyle()
    {
        let tagstyle= this.getTagStyle();
        tagstyle= Object.assign(tagstyle, {fontWeight:"bold"})
        return tagstyle;
    }
}


