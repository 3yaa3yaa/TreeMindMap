import React, { Component } from 'react';
import './Header.css';
import GlobalMenu from "./GlobalMenu";

class Header extends Component {

    constructor(props) {
        super(props);
    }

    _getKey()
    {
        let re= new RegExp('key=(.*?)(&|$)')
        let param=window.location.search
        let keystring=''
        if(re.test(param))
        {
            keystring=decodeURI( param.match(re)[1])
        }
        return keystring;
    }

    _getHeader()
    {
        return (
            <div className='header'>
                <div className='header-row'>
                    <div className='header-items'>
                        <img className='header-logo' src='logo.jpeg'></img>
                    </div>
                    <div className='header-items'>
                    <GlobalMenu leafs={this.props.leafs}
                                delete={this.props.delete}/>
                    </div>
                    <div className='header-items'>
                        {this._getKey()}
                    </div>
                </div>
                <div className='header-margin'></div>
                </div>
        )
    }

    render() {
        return (
                this._getHeader()
        );
    }
}

export default Header;
