

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

    static moveAction(id, moveTo)
    {
        return { type: 'move', id, moveTo }
    }



    //Reducer implementation
    static delete(leafs,id, focusId)
    {
        //let leaf=new LeafData("ROOT")
        //return { leafs: leafs.concat(leaf) }
        let newleafs= leafs.filter((leaf)=>{return leaf.id != id})
        return {leafs:newleafs, focusId: focusId}
    }

    static addRoot(leafs,id,focusId)
    {
        if (StateProvider.filterLeafs(leafs,'ROOT').length>0)
        {
            return {leafs:leafs, focusId: 'ROOT'}
        }
        else
        {
            let leaf={id:StateProvider.getNewId(leafs),
                      parentid: "ROOT",
                      index:0}
            return { leafs: leafs.concat(leaf) , focusId: leaf.id}
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
        return { leafs: leafs.concat(leaf), focusId: leaf.id }
    }

    static addSibling(leafs, id)
    {
        let parentid=StateProvider.getCurrent(leafs, id).parentid;
        let leaf={id:StateProvider.getNewId(leafs),
                  parentid: parentid,
                  index: this.getNewIndex(leafs,parentid)}
        return { leafs: leafs.concat(leaf), focusId: leaf.id }

    }

    static edit(leafs, newleaf, focusId)
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
        return { leafs: newleafs , focusId: focusId}
    }

    static findChildren(leafs, parentid)
    {
        return leafs.filter(leaf=>leaf.parentid==parentid);
    }
    static findSiblings(leafs, id)
    {
        let leaf=StateProvider.getCurrent(leafs, id);
        return StateProvider.findChildren(leafs,leaf.parentid);
    }

    static getOldest(leafs)
    {
        return leafs.sort((a,b)=>{return (b.index-a.index)})[0];
    }

    static checkIfImOldest(leafs, id)
    {
        let leaf=StateProvider.getOldest(StateProvider.findSiblings(leafs, id));
        if(leaf!=null && leaf.id==id)
        {
            return true;
        }
        else
        {
            return false;
        }
    }


    static getYoungest(leafs)
    {
        return leafs.sort((a,b)=>{return (a.index-b.index)})[0];
    }


    static getYoungestChild(leafs, parentid)
    {
        return StateProvider.getYoungest(StateProvider.findChildren(leafs, parentid))
    }

    static whereToMove()
    {
        return {
            LEVELDOWN: Symbol(),
            LEVELUP: Symbol(),
            DOWN: Symbol(),
            UP: Symbol()
        }
    }

    static upOrDown(leafs, leaf, whereTo)
    {
        let compare;
        if(whereTo==StateProvider.whereToMove().DOWN){compare=(a,b)=>{return (b.index-a.index)}}
        else{compare=(a,b)=>{return (a.index-b.index)}};

        let flag=false;
        let sorted=StateProvider.findChildren(leafs, leaf.parentid).sort(compare);
        for(s of sorted)
        {
            if(flag){return s};
            if(s.id==leaf.id){flag=true};
        }
    }

    static move(leafs, focusId, whereToMove)
    {
        let current = this.getCurrent(leafs, focusId);
        let destination = StateProvider.whereToMove();
        let moveTo="";
        switch (whereToMove) {
            case destination.UP:
                moveTo=StateProvider.upOrDown(leafs.current, destination.UP);
                break;
            case destination.DOWN:
                moveTo=StateProvider.upOrDown(leafs.current, destination.DOWN);
                break;
            case destination.LEVELUP:
                moveTo=this.getCurrent(leafs, current.parentid).id;
                break;
            case destination.LEVELDOWN:
                moveTo=StateProvider.getYoungestChild(leafs, current.id);
                break;
        }
        return { leafs: leafs , focusId: focusId}
    }



    static getCurrent(leafs, id)
    {
        let result = leafs.filter((leaf)=>{return leaf.id==id})
        return result[0]
    }


    // Reducer
    static leafReducer(state = { leafs: [], id:"", focusId:"" }, action) {
        switch (action.type) {
            case 'delete':
                return StateProvider.delete(state.leafs, action.id,state.focusId)
            case 'addRoot':
                return StateProvider.addRoot(state.leafs ,state.id,state.id)
            case 'addSibling':
                if(StateProvider.checkIfImOldest(state.leafs,action.id)==false)
                    {return StateProvider.move(state.leafs, action.id, StateProvider.whereToMove().DOWN)}
                else
                    {return StateProvider.addSibling(state.leafs ,action.id)}
            case 'addChild':
                if(StateProvider.findChildren(state.leafs,action.id).length>0)
                    {return StateProvider.move(state.leafs, action.id, StateProvider.whereToMove().LEVELDOWN)}
                else
                    {return StateProvider.addChild(state.leafs ,action.id)}
            case 'edit':
                return StateProvider.edit(state.leafs ,action.leaf,state.focusId)
            case 'move':
                return StateProvider.move(state.leafs, action.focusId, action.whereTo)
            default:
                return state;
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
            leafs: state.leafs,
            focusId: state.focusId
        }
    }

    // Map Redux actions to component props
    static mapDispatchToProps(dispatch) {
        return {
            delete: (id) => dispatch(StateProvider.deleteAction(id)),
            addRoot: () => dispatch(StateProvider.addRootAction()),
            addSibling: (id) => dispatch(StateProvider.addSiblingAction(id)),
            addChild: (id) => dispatch(StateProvider.addChildAction(id)),
            edit: (leaf) => dispatch(StateProvider.editAction(leaf)),
            move: (id, moveTo) => dispatch(StateProvider.moveAction(id, moveTo))
        }
    }
}

export default StateProvider;