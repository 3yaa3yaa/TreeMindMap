

import { createStore } from 'redux'
import Leaf from "./Leaf";
import LeafData from "./LeafData";


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
    static addRoot(leafs,id)
    {
        let leaf=new LeafData('root')
        return { leafs: leafs.concat(leaf), id:leaf.id }
    }

    static addChild(leafs, id)
    {
        let leaf=new LeafData(StateProvider.getCurrent(leafs, id).id)
        return { leafs: leafs.concat(leaf), id:leaf.id }
    }

    static addSibling(leafs, id)
    {
        let leaf=new LeafData(StateProvider.getCurrent(leafs, id).parentid)
        return { leafs: leafs.concat(leaf), id:leaf.id }

    }


    static setPointer(leafs, id)
    {
        return { leafs: leafs, id:id }
    }


    static getCurrent(leafs, id)
    {
        let result = leafs.filter((leaf)=>{return leaf.id==id})
        return result[0]
    }


    // Reducer
    static leafReducer(state = { leafs: [], id:"" }, action) {

        switch (action.type) {
            case 'addRoot':
                return StateProvider.addRoot(state.leafs,state.id)
            case 'addSibling':
                return StateProvider.addSibling(state.leafs,action.id)
            case 'addChild':
                return StateProvider.addChild(state.leafs,action.id)
            case 'setPointer':
                return StateProvider.setPointer(state.leafs,action.id)
            default:
                return state
        }
    }

    // Map Redux state to component props
    static mapStateToProps(state) {
        return {
            leafs: state.leafs,
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