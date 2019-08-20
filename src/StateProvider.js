

import { createStore } from 'redux'
import Leaf from "./Leaf";


class StateProvider
{
    // Action
    static deleteAction(id)
    {
        return { type: 'delete',id }
    }
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
    static delete(leafs,id)
    {
        //let leaf=new LeafData("ROOT")
        //return { leafs: leafs.concat(leaf) }
        let newleafs= leafs.filter((leaf)=>{return leaf.id != id})
        return {leafs:newleafs}
    }

    static addRoot(leafs,id)
    {
        //let leaf=new LeafData("ROOT")
        //return { leafs: leafs.concat(leaf) }

        if (StateProvider.filterLeafs(leafs,'ROOT').length>0)
        {
            return {leafs:leafs}
        }
        else
        {
            let leaf={id:StateProvider.getNewId(leafs),
                      parentid: "ROOT",
                      index:0}
            return { leafs: leafs.concat(leaf) }
        }
    }

    static getNextIndex(leafs, currentleaf)
    {
        let siblings= leafs.filter((leaf)=>leaf.parentid==currentleaf.parentid);
        if(siblings.length==0)
        {
            return 0;
        }
        else
        {
            let sort = siblings.sort((a,b)=>{return a.index-b.index});
            let flag=false;
            for(s of sort)
            {
                if(flag){return s.index};
                if(s.id==currentleaf.id){flag=true};
            }
            return sort[sort.length].index + 1;
        }
    }

    static getNewIndex(leafs, parentid)
    {
        let siblings= leafs.filter((leaf)=>leaf.parentid==parentid);
        if(siblings.length==0)
        {
            return 0;
        }
        else
        {
            return siblings.sort((a,b)=>{return b.index-a.index})[0].index+1;
        }
    }

    static addChild(leafs, id)
    {
        //let leaf=new LeafData(StateProvider.getCurrent(leafs, id).id)
        let parentid=StateProvider.getCurrent(leafs, id).id;
        let leaf={id:StateProvider.getNewId(leafs),
                  parentid: parentid,
                  index: this.getNewIndex(leafs, parentid)}
        return { leafs: leafs.concat(leaf) }
    }

    static addSibling(leafs, id)
    {
        let parentid=StateProvider.getCurrent(leafs, id).parentid;
        let leaf={id:StateProvider.getNewId(leafs),
                  parentid: parentid,
                  index: this.getNewIndex(leafs,parentid)}
        return { leafs: leafs.concat(leaf) }

    }

    static edit(leafs, newleaf)
    {
        let newleafs = leafs.map((oldleaf)=>
            {
                if(oldleaf.id==newleaf.id)
                {
                    if(oldleaf.parentid!=newleaf.parentid)
                    {
                        newleaf.index=this.getNewIndex(leafs,newleaf.parentid);
                    };
                    return Object.assign({},newleaf);
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
            case 'delete':
                return StateProvider.delete(state.leafs,action.id)
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

    static getNewId(leafs)
    {
        return StateProvider.getLatestId(leafs)+1;
    }
    static getLatestId(leafs)
    {
        let copiedLeafs =[]
        Object.assign(copiedLeafs,leafs)
        if(copiedLeafs.length>0)
        {

        return copiedLeafs.sort(function(a,b){
            if(a.id>b.id) return -1;
            if(a.id < b.id) return 1;
            return 0;
        })[0].id;
        }
        else{return 0}

    }

    static findLeaf(leafarray, id)
    {
        let out=[]
        //alert('Filtering with '+ parentid)
        if(leafarray.length>0)
        {
            leafarray.forEach((leaf)=>
                {
                    if(leaf.id==id)
                    {
                        out.push(leaf)
                    }
                }
            )
        }
        return out
    }


    static filterLeafs(leafarray, parentid)
    {
        let out=[]
        //alert('Filtering with '+ parentid)
        if(leafarray.length>0)
        {
            leafarray.forEach((leaf)=>
                {
                    if(leaf.parentid==parentid)
                    {
                        out.push(leaf)
                    }
                }
            )
        }
        return out.sort((a,b)=>{return a.index - b.index})
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
            delete: (id) => dispatch(StateProvider.deleteAction(id)),
            addRoot: () => dispatch(StateProvider.addRootAction()),
            addSibling: (id) => dispatch(StateProvider.addSiblingAction(id)),
            addChild: (id) => dispatch(StateProvider.addChildAction(id)),
            edit: (leaf) => dispatch(StateProvider.editAction(leaf))
        }
    }
}

export default StateProvider;