import React from "react";
import { Reserved } from "@3yaa3yaa/markdowntextbox";

export default class ReservedList {
  constructor(callback_sum, callback_count) {
    let arr = [];
    this.callback_sum = callback_sum;
    this.callback_count = callback_count;
    arr.push(
      new Reserved(
        "#",
        [" ", "\n", "\r\n", "\r"],
        (node, key) => {
          return this.getTagJSX(node, key);
        },
        "label(:value)"
      )
    );
    arr.push(
      new Reserved(
        "=count(",
        [")"],
        (node, key) => {
          return this.getCountJSX(node, key);
        },
        "label"
      )
    );
    arr.push(
      new Reserved(
        "=sum(",
        [")"],
        (node, key) => {
          return this.getSumJSX(node, key);
        },
        "label"
      )
    );
    arr.push(
      new Reserved(
        "=mean(",
        [")"],
        (node, key) => {
          return this.getMeanJSX(node, key);
        },
        "label"
      )
    );
    this.items = arr;
  }

  getMeanJSX(text, key) {
    if (text === null || text === undefined) {
      text = "";
    }
    return (
      <div key={key} style={this.getBoldTagStyle()}>
        {this.callback_sum(text) / this.callback_count(text)}
      </div>
    );
  }

  getSumJSX(text, key) {
    if (text === null || text === undefined) {
      text = "";
    }
    return (
      <div key={key} style={this.getBoldTagStyle()}>
        {this.callback_sum(text)}
      </div>
    );
  }

  getCountJSX(text, key) {
    if (text === null || text === undefined) {
      text = "";
    }
    return (
      <div key={key} style={this.getBoldTagStyle()}>
        {this.callback_count(text)}
      </div>
    );
  }

  getTagJSX(text, key) {
    return (
      <div key={key} style={this.getTagStyle()}>
        {text}
      </div>
    );
  }

  getTagStyle() {
    return {
      display: "block",
      textAlign: "justify",
      verticalAlign: "middle",
      backgroundColor: "#FFDDFF",
      fontsize: "8px",
      paddingLeft: "10px",
      paddingRight: "10px",
      borderBottomLeftRadius: "20px",
      borderTopLeftRadius: "20px",
      borderBottomRightRadius: "20px",
      borderTopRightRadius: "20px",
      width: "fit-content",
      marginBottom: "2px",
      // height: "10px",
      color: "#FF00FF",
    };
  }

  getBoldTagStyle() {
    let tagstyle = this.getTagStyle();
    tagstyle = Object.assign(tagstyle, { fontWeight: "bold" });
    return tagstyle;
  }
}
