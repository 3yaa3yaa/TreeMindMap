import React, { Component } from 'react';
import Property from "./Property";


export default class InstructionMessage extends Component {

    constructor(props) {
        super(props);
        this.previewMode=this.props.previewMode;
    }

    getContent()
    {
        switch (this.previewMode) {
            case Property.previewMode().Label:
                return <div>
                    <div style={{fontSize:"xx-large", position:"block"}}>No Labels!</div>
                    <div style={{fontSize:"xx-large", position:"block"}}>Try adding #label on your Mind Map!</div>
                </div>
            default:
                return <div>
                    <div style={{fontSize:"xx-large", position:"block"}}>No content!</div>
                    <div style={{fontSize:"xx-large", position:"block"}}>Start adding items on your Mind Map!</div>
                </div>
        }
    }

    getRandomImage()
    {
        let items = ['🥺','👻','👽','🙈','🙉','🙊','👺','👾','🤖'];
        let random = Math.floor( Math.random() * items.length );
        return items[random];
    }


    render() {
        return <div style={{marginTop:"5px", width:"600px"}}>
            <div style={{fontSize:"10em", align:"center", position:"block"}}>{this.getRandomImage()}</div>
            {this.getContent()}
        </div>
    }
}

