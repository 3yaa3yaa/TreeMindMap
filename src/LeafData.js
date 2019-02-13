import React, { Component } from 'react';

class LeafData  {
    constructor (parentid) {
        this._id = this.generateKey();
        this._parentid = parentid;
    }

    generateKey()
    {
        var len = 20;
        var str = "abcdefghijklmnopqrstuvwxyz";
        var strLen = str.length;
        var result = "";

        for (var i = 0; i < len; i++) {
            result += str[Math.floor(Math.random() * strLen)];
        }
        return result;
    }

    get id() {
        return this._id;
    }

    // set id(value) {
    //     this._id = value;
    // }

    get parentid() {
        return this._parentid;
    }

    set parentid(value) {
        this._parentid = value;
    }

    get title() {
        return this._title;
    }

    set title(value) {
        this._title = value;
    }

    get description() {
        return this._description;
    }

    set description(value) {
        this._description = value;
    }

    get status() {
        return this._status;
    }

    set status(value) {
        this._status = value;
    }

}


export default LeafData;