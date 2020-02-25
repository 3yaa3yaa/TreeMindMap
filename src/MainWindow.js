import React, { Component } from 'react';
import Tree from "./Tree";
import PreviewPanel from "./PreviewPanel";
import Property from "./Property";
import  './MainWindow.css'

class MainWindow extends Component {

    constructor(props) {
        super(props);
        this.mainRef = React.createRef();
        this.mainContentRef = React.createRef();
        this.state={height:"0px"};
    }

    componentDidUpdate(prevProps) {
        this.setState({height:this.mainContentRef.clientHeight});
    }

    _getPreviewScreen()
    {
        if(this.props.property.previewMode!=Property.previewMode().none)
        {
            return <PreviewPanel leafdata={this.props.root.getLeaf(this.props.property.focusId)}
                                 previewMode={this.props.property.previewMode}
                                 changePreviewMode={this.props.changePreviewMode}
            />
        }
    }

    _getTreeStyle() {
        if (this.props.property.previewMode != Property.previewMode().none) {
            return {filter: "blur(10px)",
                    opacity: "0.7",
                    position: "fixed",
                    overflow:"hidden"}
        }
    }

    _getMainStyle()
    {
        return {height: this.state.height};
    }



    render() {
        return <div className="MainWindow" style={this._getMainStyle()}>
                    <div className="MainWindow-Preview">
                        {this._getPreviewScreen()}
                    </div>
                    <div className="MainWindow-Content"
                         ref={(e)=>{this.mainContentRef=e}}
                         style={this._getTreeStyle()}>
                        <Tree
                            root={this.props.root}
                            property={this.props.property}
                            delete={this.props.delete}
                            addRoot={this.props.addRoot}
                            addSibling={this.props.addSibling}
                            addChild={this.props.addChild}
                            edit={this.props.edit}
                            move={this.props.move}
                            walk={this.props.walk}
                            jump={this.props.jump}
                            changeMode={this.props.changeMode}
                            changePreviewMode={this.props.changePreviewMode}
                        />
                    </div>
                </div>
    }
}

export default MainWindow;
