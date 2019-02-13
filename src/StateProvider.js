

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
    static editAction(leaf)
    {
        return { type: 'edit', leaf }
    }


    //Reducer implementation
    static addRoot(leafs,id)
    {
        let leaf=new LeafData('root')
        return { leafs: leafs.concat(leaf) }
    }

    static addChild(leafs, id)
    {
        let leaf=new LeafData(StateProvider.getCurrent(leafs, id).id)
        return { leafs: leafs.concat(leaf) }
    }

    static addSibling(leafs, id)
    {
        let leaf=new LeafData(StateProvider.getCurrent(leafs, id).parentid)
        return { leafs: leafs.concat(leaf) }

    }

    static edit(leafs, newleaf)
    {
        let newleafs = leafs.map((oldleaf)=>
            {
                if(oldleaf.id==newleaf.id)
                {
                    return newleaf
                }
                else
                {
                    return oldleaf
                }
            }
            )
        return { leafs: newleafs }
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
            case 'edit':
                return StateProvider.edit(state.leafs,action.leaf)

            default:
                return state
        }
    }

    // Map Redux state to component props
    static mapStateToProps(state) {
        return {
            leafs: state.leafs
        }
    }

    // Map Redux actions to component props
    static mapDispatchToProps(dispatch) {
        return {
            addRoot: () => dispatch(StateProvider.addRootAction()),
            addSibling: (id) => dispatch(StateProvider.addSiblingAction(id)),
            addChild: (id) => dispatch(StateProvider.addChildAction(id)),
            edit: (leaf) => dispatch(StateProvider.editAction(leaf))
        }
    }

}

export default StateProvider;