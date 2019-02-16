import React, { Component } from 'react';
import './Thumbnail.css';

class Thumbnail extends Component {

    constructor(props) {
        super(props);
    }


    _getThumbnail()
    {
        let out=""
        let fulltext = this.props.text;
        //out=leaf.title.match(/http[^ ]+/);

        let re = new RegExp('http[^ ]+');
        if (re.test(fulltext))
        {
            out = fulltext.match(re)
            // re.exec(fulltext)
            // out = re.$1
        }
        return out
    }

    _getDOM()
    {
        if(this._getThumbnail()=="")
        {return ""}
        else
        {return (<img className="Thumbnail" src={this._getThumbnail()}></img>)}

    }

    render() {
    return (
        this._getDOM()
    );
    }
}

export default Thumbnail;
