import React from "react";

class Reserved
{
    constructor(keyword, stopword, behaviour, description)
    {
        this.keyword　=　keyword;
        this.stopword　=　stopword;
        this.behaviour　=　behaviour;
        this.description = description;
    }

}

export default class ReservedList
{
    constructor(callback_sum, callback_count)
    {
        let arr=[];
        this.callback_sum=callback_sum;
        this.callback_count=callback_count;
        arr.push(new Reserved('=count(',")", (node)=>{return this.getCountJSX(node)},"label"))
        arr.push(new Reserved('=sum(',")", (node)=>{return this.getSumJSX(node)},"label"))
        arr.push(new Reserved('=mean(',")", (node)=>{return this.getMeanJSX(node)},"label"))
        this.items=arr;
    }

    getMeanJSX(text){
        if(text===null || text===undefined){text=""};
        return <div style={this.getTagStyle()}>{this.callback_sum(text)/this.callback_count(text)}</div>;
    }

    getSumJSX(text)
    {
        if(text===null || text===undefined){text=""};
        return <div style={this.getTagStyle()}>{this.callback_sum(text)}</div>;
    }

    getCountJSX(text)
    {
        if(text===null || text===undefined){text=""};
        return <div style={this.getTagStyle()}>{this.callback_count(text)}</div>;
    }

    getTagStyle()
    {
        return {
            display:"inline",
            textAlign: "justify",
            verticalAlign:"middle",
            fontWeight:"bold",
            backgroundColor: "#FFDDFF",
            fontsize:"8px",
            paddingLeft: "10px",
            paddingRight: "10px",
            borderBottomLeftRadius:"20px",
            borderTopLeftRadius:"20px",
            borderBottomRightRadius:"20px",
            borderTopRightRadius:"20px",
            width: "50px",
            height: "10px",
            color: "#FF00FF"
        }
    }
}


