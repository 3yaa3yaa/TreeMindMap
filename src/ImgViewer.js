import React, { Component } from 'react';
import './ImgViewer.css';
import PropTypes from "prop-types";

class ImgViewer extends Component {

    constructor(props) {
        super(props);
    }

    _generateImgs(imgs)
    {
        return imgs.map((img)=><div><img className="ImgViewer-img" src={img} style={this.props.ImgStyle}/></div>  )
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


ImgViewer.propTypes={
    leafdata: PropTypes.object,
    ImgStyle: PropTypes.object
}

export default ImgViewer;
