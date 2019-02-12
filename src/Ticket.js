import React, { Component } from 'react';
import './Ticket.css';
import TicketData from './TicketData';

class Ticket extends Component {

    constructor(props) {
        super(props);

        this.ticketRef=React.createRef()
    }

    componentDidMount()
    {
        this.ticketRef.focus()
    }

    onChange(e)
    {
        // let newdata = this.state.data
        // newdata.name=e.target.value
        // this.setState({ data : newdata });
    }

    keyDownHandler(e) {
        switch (e.keyCode) {
            case 13: //Enter
                e.preventDefault()
                this.props.addSibling(this.props.ticketdata.id)
                break;
            case 9: //Tab
                e.preventDefault()
                this.props.addChild(this.props.ticketdata.id)
                break;
        }
    }

    getDOM()
    {
    return (
            <input type="text"
                   className="Ticket-Input"
                   draggable="true"
                   //value={this.props.ticketdata.id}
                   onKeyDown={(e)=>this.keyDownHandler(e)}
                   onChange={this.onChange}
                   ref={(e)=>{ this.ticketRef=e}}/>
    );
    }

    render() {
    return (
        <div className="Ticket">{this.getDOM()}</div>
    );
    }
}

export default Ticket;
