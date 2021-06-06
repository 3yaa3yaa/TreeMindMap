import React, { Component } from "react";
import "./Connector.css";
import PropTypes from "prop-types";

class Connector extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {}

  _getTableStyle() {
    let isFirefox = navigator.userAgent.toLowerCase().indexOf("firefox") > -1;
    let isEdge = navigator.userAgent.toLowerCase().indexOf("edge") > -1;
    if (isFirefox || isEdge) {
      return { position: "absolute" };
    } else {
      return { height: "100%" };
    }
  }

  _getSingleConnector() {
    return (
      <div
        key={this.props.leafid}
        className="Connector-Table"
        style={this._getTableStyle()}
      >
        <div className="Connector-Row-top">
          <div className="Connector-Single-TopLeft">&nbsp;</div>
          <div className="Connector-Single-TopRight">&nbsp;</div>
        </div>
        <div className="Connector-Row-bottom">
          <div className="Connector-Single-BottomLeft">&nbsp;</div>
          <div className="Connector-Single-BottomRight">&nbsp;</div>
        </div>
      </div>
    );
  }

  _getVerticalConnector() {
    return (
      <div
        key={this.props.leafid}
        className="Connector-Table"
        style={this._getTableStyle()}
      >
        <div className="Connector-Row-top">
          <div className="Connector-Vertical-TopLeft">&nbsp;</div>
          <div className="Connector-Vertical-TopRight">&nbsp;</div>
        </div>
        <div className="Connector-Row-bottom">
          <div className="Connector-Vertical-BottomLeft">&nbsp;</div>
          <div className="Connector-Vertical-BottomRight">&nbsp;</div>
        </div>
      </div>
    );
  }

  _getTopConnector() {
    return (
      <div
        key={this.props.leafid}
        className="Connector-Table"
        style={this._getTableStyle()}
      >
        <div className="Connector-Row-top">
          <div className="Connector-Top-TopLeft">&nbsp;</div>
          <div className="Connector-Top-TopRight">&nbsp;</div>
        </div>
        <div className="Connector-Row-bottom">
          <div className="Connector-Top-BottomLeft">&nbsp;</div>
          <div className="Connector-Top-BottomRight">&nbsp;</div>
        </div>
      </div>
    );
  }

  _getMiddleConnector() {
    return (
      <div
        key={this.props.leafid}
        className="Connector-Table"
        style={this._getTableStyle()}
      >
        <div className="Connector-Row-top">
          <div className="Connector-Middle-TopLeft">&nbsp;</div>
          <div className="Connector-Middle-TopRight">&nbsp;</div>
        </div>
        <div className="Connector-Row-bottom">
          <div className="Connector-Middle-BottomLeft">&nbsp;</div>
          <div className="Connector-Middle-BottomRight">&nbsp;</div>
        </div>
      </div>
    );
  }

  _getBottomConnector() {
    return (
      <div
        key={this.props.leafid}
        className="Connector-Table"
        style={this._getTableStyle()}
      >
        <div className="Connector-Row-top">
          <div className="Connector-Bottom-TopLeft">&nbsp;</div>
          <div className="Connector-Bottom-TopRight">&nbsp;</div>
        </div>
        <div className="Connector-Row-bottom">
          <div className="Connector-Bottom-BottomLeft">&nbsp;</div>
          <div className="Connector-Bottom-BottomRight">&nbsp;</div>
        </div>
      </div>
    );
  }
  render() {
    switch (this.props.mode) {
      case "SINGLE":
        return this._getSingleConnector();
      case "VERTICAL":
        return this._getVerticalConnector();
      case "TOP":
        return this._getTopConnector();
      case "MIDDLE":
        return this._getMiddleConnector();
      case "BOTTOM":
        return this._getBottomConnector();
      default:
        return <div key={this.props.leafid}>&nbsp;</div>;
    }
  }
}

Connector.propTypes = {
  leafid: PropTypes.object,
  mode: PropTypes.object,
};

export default Connector;
