

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
        if (StateProvider.filterLeafs(leafs,0).length>0)
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
        let parentid=StateProvider.getCurrent(leafs, id).id;
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
        let parentid=StateProvider.getCurrent(leafs, id).parentid;
        let leaf={id:StateProvider.getNewId(leafs),
                  parentid: parentid,
                  elderbrotherid: id
                  }
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
        let leaf=StateProvider.getCurrent(leafs, id);
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

    static move(leafs, focusId, whereToMove)
    {
        let current = this.getCurrent(leafs, focusId);
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
                moveTo=this.getCurrent(leafs, current.parentid).id;
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



    static getCurrent(leafs, id)
    {
        let result = leafs.filter((leaf)=>{return leaf.id==id})
        return result[0]
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


    // Reducer
    static leafReducer(state = { leafs: [], id:"", focusId:"" }, action) {
        switch (action.type) {
            case 'delete':
                return StateProvider.delete(state.leafs, action.id,state.focusId)
            case 'addRoot':
                return StateProvider.addRoot(state.leafs ,state.id,state.id)
            case 'addSibling':
                return StateProvider.addSibling(state.leafs ,action.id)
            case 'addChild':
                return StateProvider.addChild(state.leafs ,action.id)
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
        return out
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