import React, { Component } from 'react';
import './ImgViewer.css';

class ImgViewer extends Component {

    constructor(props) {
        super(props);
    }


    _getDOM()
    {
        if (this.props.leafdata.img!=null)
        {
        return (
        <div className="ImgViewer">
            <img className="ImgViewer-img" src={this.props.leafdata.img} />
        </div>)
        }
        else
        {
            return <div></div>
        }


    }

    render() {
    return (
        this._getDOM()
    );
    }
}

export default ImgViewer;
