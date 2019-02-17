import React, { Component } from 'react';
import './Thumbnail.css';
import axios from 'axios'

class Thumbnail extends Component {

    constructor(props) {
        super(props);
    }


    _getThumbnail(callback)
    {
        if(this._findURL()!="")
        {
            axios.get(this._findURL())
                .then(res => console.log(res.data))
        }
        else
        {
            return ""
        }
    }

    _findURL()
    {
        let out=""
        let fulltext = this.props.text;
        //out=leaf.title.match(/http[^ ]+/);

        let re = new RegExp('https://[^ ]+');
        if (re.test(fulltext))
        {
            out = fulltext.match(re)
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
