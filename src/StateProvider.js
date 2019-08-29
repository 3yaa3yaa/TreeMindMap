

import { createStore } from 'redux'
import Leaf from "./Leaf";


class StateProvider
{
    // Action
    static deleteAction(id)
    {
        return { type: 'delete',id }
    }
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

    static walkAction(whereTo)
    {
        return { type: 'walk', whereTo }
    }

    static jumpAction(id)
    {
        return { type: 'jump', id }
    }



    //Reducer implementation
    static delete(leafs,id, focusId)
    {
        let me = StateProvider.getLeaf(leafs, id);
        let parent=StateProvider.getLeaf(leafs, me.parentid);
        let elderbro=StateProvider.getLeaf(leafs, me.elderbrotherid);
        let youngerbro = StateProvider.getYoungerBrother(leafs, me.id);

        let newleafs = leafs.filter((leaf)=>{return leaf.id != id});
        if(youngerbro!=null)
        {
            newleafs=newleafs.map((l)=>{
                if(l.id==youngerbro.id)
                {
                    youngerbro.elderbrotherid=me.elderbrotherid;
                    return youngerbro;
                }
                else
                {
                    return l;
                }
            })
        }
        if(elderbro!=null)
        {
            focusId=elderbro.id;
        }
        else
        {
            if(parent!=null)
            {
                focusId=parent.id;
            }
        }
        return {leafs:newleafs, focusId: focusId}
    }

    static addRoot(leafs,id,focusId)
    {
        let filtered=StateProvider.filterAndSortLeafs(leafs,0);
        if (filtered!=null && filtered.length>0)
        {
            return {leafs:leafs, focusId: 0}
        }
        else
        {
            let leaf={id:StateProvider.getNewId(leafs),
                      parentid: 0,
                      elderbrotherid:0}
            return { leafs: leafs.concat(leaf) , focusId: leaf.id}
        }
    }

    static addChild(leafs, id)
    {
        let parentid=StateProvider.getLeaf(leafs, id).id;
        let children=StateProvider.findChildren(leafs, id);
        let elderbrotherid;
        if(children.length==0){elderbrotherid=0}
        else{elderbrotherid=children.sort((a, b) => {return (b - a)})[0].id};

        let leaf= {
            id: StateProvider.getNewId(leafs),
            parentid: parentid,
            elderbrotherid: elderbrotherid
        }
        return { leafs: leafs.concat(leaf), focusId: leaf.id }
    }

    static addSibling(leafs, id)
    {
        let parentid=StateProvider.getLeaf(leafs, id).parentid;
        let leaf={id:StateProvider.getNewId(leafs),
                  parentid: parentid,
                  elderbrotherid: id}
        return { leafs: leafs.concat(leaf), focusId: leaf.id }
    }

    static convertToDictionary(leafs)
    {
        let out={};
        leafs.forEach(leaf=>{out[leaf.id]=leaf})
        return out;
    }
    static convertToArray(leafobjects)
    {
        let out=[];
        let keys=Object.keys(leafobjects);
        keys.forEach((key)=>{out.push(leafobjects[key])})
        return out;

    }

    static edit(leafs, newleaf, focusId)
    {
        let leafDictionary=StateProvider.convertToDictionary(leafs);
        let currentleaf=leafDictionary[newleaf.id];
        let youngerbrotherleaf=StateProvider.getYoungerBrother(leafs, currentleaf);

        if(currentleaf.elderbrotherid!=newleaf.elderbrotherid)
        {
            if(youngerbrotherleaf!=null)
            {
                leafDictionary[youngerbrotherleaf.id].elderbrotherid=currentleaf.elderbrotherid;
            }
        }
        leafDictionary[currentleaf.id]=newleaf;

        let newleafs=StateProvider.convertToArray(leafDictionary);
        return { leafs: newleafs , focusId: newleaf.id}
    }

    static findChildren(leafs, parentid)
    {
        return leafs.filter(leaf=>leaf.parentid==parentid);
    }
    static findSiblings(leafs, id)
    {
        let leaf=StateProvider.getLeaf(leafs, id);
        return StateProvider.findChildren(leafs,leaf.parentid);
    }


    static getYoungestChild(leafs, parentid)
    {
        return StateProvider.getYoungest(StateProvider.findChildren(leafs, parentid))
    }

    static whereToMove()
    {
        return {
            LEVELDOWN: "LEVELDOWN",
            LEVELUP: "LEVELUP",
            DOWN: "DOWN",
            UP: "UP"
        }
    }

    static jump(leafs, focusId)
    {
        return { leafs: leafs , focusId: focusId}
    }

    static walk(leafs, focusId, whereToMove)
    {
        let current = this.getLeaf(leafs, focusId);
        let destination = StateProvider.whereToMove();
        let moveTo="";
        switch (whereToMove) {
            case destination.UP:
                if(current.elderbrotherid!=null){moveTo=current.elderbrotherid}
                else{moveTo=current.id};
                break;
            case destination.DOWN:
                let youngerbrother=StateProvider.getYoungerBrother(leafs,current);
                if(youngerbrother!=null){moveTo=youngerbrother.id}
                else{moveTo=current.id};
                break;
            case destination.LEVELUP:
                moveTo=this.getLeaf(leafs, current.parentid).id;
                break;
            case destination.LEVELDOWN:
                let children = StateProvider.findChildren(leafs,current.id);
                let youngestChild=children.filter((child=>{child.elderbrotherid==0}))[0];
                if(youngestChild!=null){moveTo=youngestChild.id}
                else{moveTo=current.id};
                break;
            default:
                moveTo=focusId;
                break;
        }
        return { leafs: leafs , focusId: moveTo}
    }



    static getLeaf(leafs, id)
    {
        let result = leafs.filter((leaf)=>{return leaf.id==id})
        if(result.length>0)
        {
            return result[0];
        }
        else
        {
            return null;
        }
    }


    static getYoungerBrother(leafs, leaf)
    {
        let out = leafs.filter((l)=>{return (l.elderbrotherid == leaf.id)});
        if(out.length>0)
        {
            return out[0];
        }
        else
        {
            return null;
        }
    }

    static IsIntegrityCheckOK(leafs)
    {
        for(let leaf of leafs)
        {
            if(leaf.elderbrotherid>0)
            {
                let elderbrother = StateProvider.getLeaf(leafs, leaf.elderbrotherid);
                if(elderbrother==null)
                {
                    return false;
                }
                else
                {
                    if(leaf.parentid != elderbrother.parentid)
                    {
                        return false;
                    }
                }
            }
        }
        return true;
    }


    // Reducer
    static leafReducer(state = { leafs: [], id:"", focusId:"" }, action) {
        let result;
        switch (action.type) {
            case 'delete':
                result= StateProvider.delete(state.leafs, action.id,state.focusId);
                break;
            case 'addRoot':
                result= StateProvider.addRoot(state.leafs ,state.id,state.id);
                break;
            case 'addSibling':
                result= StateProvider.addSibling(state.leafs ,action.id);
                break;
            case 'addChild':
                result = StateProvider.addChild(state.leafs ,action.id);
                break;
            case 'edit':
                result= StateProvider.edit(state.leafs ,action.leaf,state.focusId);
                break;
            case 'walk':
                result = StateProvider.walk(state.leafs, state.focusId, action.whereTo);
            case 'jump':
                result = StateProvider.jump(state.leafs, action.id);
                break;
            default:
                result= state;
                break;
        }
        if(StateProvider.IsIntegrityCheckOK(result.leafs))
        {
            return result;
        }
        else
        {
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


    static filterAndSortLeafs(leafs, parentid)
    {
        let out=[];
        if(Array.isArray(leafs) && leafs.length>0)
        {
            let bigbrother = leafs.filter((leaf)=>{return (leaf.parentid==parentid && leaf.elderbrotherid==0)})[0];
            StateProvider.recursivelyGetSiblings(leafs, bigbrother, out);
            return out;
        }
        else
        {
            return null;
        }

        // if(leafarray.length>0)
        // {
        //     leafarray.forEach((leaf)=>
        //         {
        //             if(leaf.parentid==parentid)
        //             {
        //                 out.push(leaf)
        //             }
        //         }
        //     )
        // }
        //return out
    }

    static recursivelyGetSiblings(leafs, leaf, out)
    {
        if(leaf==null)
        {
            return leafs;
        }

        out.push(leaf);
        let youngerbrother = StateProvider.getYoungerBrother(leafs, leaf);
        if(youngerbrother==null)
        {
            return leafs;
        }
        else
        {
            return StateProvider.recursivelyGetSiblings(leafs, youngerbrother, out);
        }
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
            walk: (whereTo) => dispatch(StateProvider.walkAction(whereTo)),
            jump: (id) => dispatch(StateProvider.jumpAction(id))
        }
    }
}

export default StateProvider;