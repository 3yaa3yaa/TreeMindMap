import React, { Component } from 'react';
import './ImgViewer.css';

class ImgViewer extends Component {

    constructor(props) {
        super(props);
    }

    _generateImgs(imgs)
    {
        return imgs.map((img)=><div><img className="ImgViewer-img" src={img} /></div>  )
    }


    _getDOM()
    {
        if (this.props.leafdata.imgs!=null)
        {
        return (
        <div className="ImgViewer">
            {this._generateImgs(this.props.leafdata.imgs)}
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
