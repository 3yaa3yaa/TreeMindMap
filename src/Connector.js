import React, { Component } from 'react';
import "./Connector.css"


// const canvasWidth = 30
// const canvasHeight = 30

class Connector extends Component {
    componentDidMount() {
    }


    _getTableStyle()
    {
        let isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
        if(isFirefox)
        {
            return {height:"100%"}
        }
        else
        {
            return {height:"50%"}
        }
    }

    _getSingleConnector()
    {
        return (
            <div className="Connector-Table" style={this._getTableStyle()}>
                <div className="Connector-Row-top">
                    <div className="Connector-Single-TopLeft">&nbsp;</div>
                    <div className="Connector-Single-TopRight">&nbsp;</div>
                </div>
                <div className="Connector-Row-bottom">
                    <div className="Connector-Single-BottomLeft">&nbsp;</div>
                    <div className="Connector-Single-BottomRight">&nbsp;</div>
                </div>
            </div>
        )
    }

    _getVerticalConnector()
    {
        return (
            <div className="Connector-Table" style={this._getTableStyle()}>
                <div className="Connector-Row-top">
                    <div className="Connector-Vertical-TopLeft">&nbsp;</div>
                    <div className="Connector-Vertical-TopRight">&nbsp;</div>
                </div>
                <div className="Connector-Row-bottom">
                    <div className="Connector-Vertical-BottomLeft">&nbsp;</div>
                    <div className="Connector-Vertical-BottomRight">&nbsp;</div>
                </div>
            </div>
        )
    }

    _getTopConnector()
    {
        return (
        <div className="Connector-Table" style={this._getTableStyle()}>
            <div className="Connector-Row-top">
                <div className="Connector-Top-TopLeft">&nbsp;</div>
                <div className="Connector-Top-TopRight">&nbsp;</div>
            </div>
            <div className="Connector-Row-bottom">
                <div className="Connector-Top-BottomLeft">&nbsp;</div>
                <div className="Connector-Top-BottomRight">&nbsp;</div>
            </div>
        </div>
        )
    }

    _getMiddleConnector()
    {
        return (
            <div className="Connector-Table" style={this._getTableStyle()}>
                <div className="Connector-Row-top">
                    <div className="Connector-Middle-TopLeft">&nbsp;</div>
                    <div className="Connector-Middle-TopRight">&nbsp;</div>
                </div>
                <div className="Connector-Row-bottom">
                    <div className="Connector-Middle-BottomLeft">&nbsp;</div>
                    <div className="Connector-Middle-BottomRight">&nbsp;</div>
                </div>
            </div>
        )
    }


    _getBottomConnector()
    {
        return (
            <div className="Connector-Table" style={this._getTableStyle()}>
                <div className="Connector-Row-top">
                    <div className="Connector-Bottom-TopLeft">&nbsp;</div>
                    <div className="Connector-Bottom-TopRight">&nbsp;</div>
                </div>
                <div className="Connector-Row-bottom">
                    <div className="Connector-Bottom-BottomLeft">&nbsp;</div>
                    <div className="Connector-Bottom-BottomRight">&nbsp;</div>
                </div>
            </div>
        )
    }
    render() {
        switch(this.props.mode)
        {
            case "SINGLE":
                return this._getSingleConnector()
            case "VERTICAL":
                return this._getVerticalConnector()
            case "TOP":
                return this._getTopConnector()
            case "MIDDLE":
                return this._getMiddleConnector()
            case "BOTTOM":
                return this._getBottomConnector()
            default:
                return <div>&nbsp;</div>
        }
    }
}
export default Connector;
