

import { createStore } from 'redux'
import Ticket from "./Ticket";
import TicketData from "./TicketData";


class StateProvider
{
    // Action
    static addRootAction()
    {
        return { type: 'addRoot' }
    }
    static addSiblingAction(id)
    {
        return { type: 'addSibling', id }
    }
    static addChildAction(id)
    {
        return { type: 'addChild', id }
    }
    static setPointerAction(id)
    {
        return { type: 'setId', id }
    }


    //Reducer implementation
    static addRoot(tickets,id)
    {
        let ticket=new TicketData('root')
        return { tickets: tickets.concat(ticket), id:ticket.id }
    }

    static addChild(tickets, id)
    {
        let ticket=new TicketData(StateProvider.getCurrent(tickets, id).id)
        return { tickets: tickets.concat(ticket), id:ticket.id }
    }

    static addSibling(tickets, id)
    {
        let ticket=new TicketData(StateProvider.getCurrent(tickets, id).parentid)
        return { tickets: tickets.concat(ticket), id:ticket.id }

    }


    static setPointer(tickets, id)
    {
        return { tickets: tickets, id:id }
    }


    static getCurrent(tickets, id)
    {
        let result = tickets.filter((ticket)=>{return ticket.id==id})
        return result[0]
    }


    // Reducer
    static ticketReducer(state = { tickets: [], id:"" }, action) {

        switch (action.type) {
            case 'addRoot':
                return StateProvider.addRoot(state.tickets,state.id)
            case 'addSibling':
                return StateProvider.addSibling(state.tickets,action.id)
            case 'addChild':
                return StateProvider.addChild(state.tickets,action.id)
            case 'setPointer':
                return StateProvider.setPointer(state.tickets,action.id)
            default:
                return state
        }
    }

    // Map Redux state to component props
    static mapStateToProps(state) {
        return {
            tickets: state.tickets,
            id: state.id
        }
    }

    // Map Redux actions to component props
    static mapDispatchToProps(dispatch) {
        return {
            addRoot: () => dispatch(StateProvider.addRootAction()),
            addSibling: (id) => dispatch(StateProvider.addSiblingAction(id)),
            addChild: (id) => dispatch(StateProvider.addChildAction(id)),
            setPointer: (id) => dispatch(StateProvider.setPointerAction(id))
        }
    }

}

export default StateProvider;