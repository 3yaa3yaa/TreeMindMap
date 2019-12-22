import React, { Component } from 'react';
import './Leaf.css';
import ImgViewer from './ImgViewer'
import ImageMenu from "./ImageMenu";
import MarkDownTextBoxWrapper from "./MarkDownTextBoxWrapper";
import StateProvider from './StateProvider';
import LeafData from "./LeafData";

class Leaf extends Component {

    constructor(props) {
        super(props);
        this.leafTextAreaRef=React.createRef()
        this.leafRef=React.createRef()
        this.state={flag:true};
        this.textValueBuffer="";

    }

    edit()
    {
        let newleaf= LeafData.getNewObject(this.props.leafdata);
        newleaf.description= this.textValueBuffer;
        this.props.edit(newleaf);
    }


    keyDownHandler(e) {
        switch (e.keyCode) {
            case 13: //Enter
                if (e.shiftKey != true && this.props.leafdata.id!=0) {
                    e.preventDefault();
                    this.props.addSibling(this.props.leafdata.id);
                }
                break;
            case 9: //Tab
                if (e.shiftKey!=true)
                {
                    e.preventDefault()
                    this.props.addChild(this.props.leafdata.id)
                }
                else
                {
                    e.preventDefault()
                    this.props.walk(StateProvider.whereToMove().LEVELUP);
                }
                break;
            case 46: //Delete
                    e.preventDefault()
                    this.props.delete(this.props.leafdata.id)
                    break;
            case 38: //UP

                if (e.shiftKey!=true)
                {
                    e.preventDefault()
                    this.props.walk(StateProvider.whereToMove().UP);
                }
                break;
            case 40: //Down
                if (e.shiftKey!=true)
                {
                    e.preventDefault();
                    this.props.walk(StateProvider.whereToMove().DOWN);
                    break;
                }
        }
    }

    leafUpdateHandler(e)
    {
        // let newleaf = Object.assign({},this.props.leafdata)
        // newleaf.description=e.target.value
        // this.props.edit(newleaf)
        this.textValueBuffer=e.target.value;
        this.edit()
    }

    stateChange()
    {
        this.setState({flag: this.state.flag===false})
    }

    _getLeafStyle()
    {
        let color=this.props.leafdata.color;
        if(color==undefined){color="silver"};

        return {
            textAlign: "left",
            backgroundColor: color,
            padding: "10px",
            marginTop: "1px",
            marginBottom: "1px",
            marginLeft:"0px",
            marginRight:"0px",
            borderRadius:"10px",
            resize: "both"
            }
    }

    _getMenuVisibility()
    {
        if(this._getIsFocused())
        {
            return {display: "block" }
        }
        else
        {
            return {display: "none"}
        }
    }

    _getIsFocused()
    {
        if(this.props.leafdata.id==this.props.focusId)
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    _getDescriptionStyle()
    {
        return {minWidth: "100px", maxWidth: "200px"};

        // if(this.props.leafdata.codeExists())
        // {
        //     return {minWidth: "600px", maxWidth: "600px"}; //seems not working on markdowntextbox
        // }
        // else
        // {
        //     return {minWidth: "100px", maxWidth: "200px"};
        // }
    }



    _getDOM(){
    return (
        <div className="Leaf"
             onKeyDown={(e)=>this.keyDownHandler(e)}
             style={this._getLeafStyle()}
             ref={(e)=>{this.leafRef=e}} >
            <div className="Leaf-Row">
                <div className="Leaf-Columns"
                     onClick={(e)=>{this.props.jump(this.props.leafdata.id)}}
                >
                    <div className="Leaf-Row">
                        <div className="Leaf-Colomuns">
                            <MarkDownTextBoxWrapper leafdata={this.props.leafdata}
                                             onChange={(e)=>this.leafUpdateHandler(e)}
                                             focus={this._getIsFocused()}
                                             descriptionStyle={this._getDescriptionStyle()}
                                             textAreaStyle={{height:"170px",fontFamily:"sans-serif", fontSize:"100%"}}
                                              />
                        </div>
                    </div>
                    <div className="Leaf-Row"><ImgViewer leafdata={this.props.leafdata} ImgStyle={{width:'200px'}}/></div>
                </div>
                <div className="Leaf-Colomuns">
                    <ImageMenu leafdata={this.props.leafdata}
                          edit={(leaf)=>{this.props.edit(leaf);this.stateChange();}}
                          addChild={this.props.addChild}
                          addSibling={this.props.addSibling}
                          changePreviewMode={this.props.changePreviewMode}
                          style={this._getMenuVisibility()}/>
                </div>
            </div>
        </div>

    )
    }

    render() {
        return (
                 this._getDOM()
        );
    }
}

export default Leaf ;
