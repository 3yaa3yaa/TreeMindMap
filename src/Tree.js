import React, { Component } from 'react';
import './Tree.css';
import TicketData from "./TicketData";
import Ticket from "./Ticket"


class Tree extends Component {

    constructor(props) {
        super(props);
        props.addRoot()
    }

    getRootId()
    {
        return "root";
    }


    filterTickets(ticketarray, parentid)
    {
        let out=[]
        if(ticketarray.length>0)
        {
            ticketarray.forEach((ticket)=>
                {
                    if(ticket.parentid==parentid)
                    {
                        out.push(ticket)
                    }
                }
            )
        }
        return out
    }


    formatTicket(dataarr) {
        let out = []
        dataarr.forEach((ticket)=>{
                out.push((
                    <ul class="Tree-Element">
                        <li class="Tree-Trunk">
                            <Ticket ticketdata={ticket}
                                    addChild={this.props.addChild}
                                    addSibling={this.props.addSibling}/>
                        </li>
                         <li class="Tree-Branch" >
                            {this.formatTicket(this.filterTickets(this.props.tickets, ticket.id ))}
                        </li>
                    </ul>
                        ))
                //out.push(this.formatTicket(this.filterTickets(this.props.tickets, ticket.id )))
        })
        return <ul>{out}</ul>
    }



    getTree()
    {
        return this.formatTicket(this.filterTickets(this.props.tickets, this.getRootId() ))
    }

    render() {

        return (
            <div>
                <div>
                    {this.getTree()}
                </div>
            </div>
        );
    }
}

export default Tree;
