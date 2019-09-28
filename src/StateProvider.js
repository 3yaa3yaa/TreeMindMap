import LeafData from './LeafData'

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


    // Reducer
    static leafReducer(state = { root: null, id:"", focusId:"" }, action) {
        let result;
        switch (action.type) {
            case 'delete':
                result= StateProvider.delete(state.root, action.id,state.focusId);
                break;
            case 'addRoot':
                result= StateProvider.addRoot(state.root ,state.id,state.id);
                break;
            case 'addSibling':
                let youngerbrothers=StateProvider.getYoungerBrother(state.root,StateProvider.getLeaf(state.root,state.focusId)  );
                if(youngerbrothers == null)
                    {result= StateProvider.addSibling(state.root ,action.id)}
                else
                    {result = StateProvider.walk(state.root, state.focusId, StateProvider.whereToMove().DOWN)};
                break;
            case 'addChild':
                let children = StateProvider.getChildren(state.root, state.focusId);
                if(children == null)
                    {result = StateProvider.addChild(state.root ,action.id)}
                else
                    {result = StateProvider.walk(state.root, state.focusId, StateProvider.whereToMove().LEVELDOWN)};
                break;
            case 'edit':
                result= StateProvider.edit(state.root ,action.leaf,state.focusId);
                break;
            case 'walk':
                result = StateProvider.walk(state.root, state.focusId, action.whereTo);
                break;
            case 'jump':
                result = StateProvider.jump(state.root, action.id);
                break;
            default:
                result= state;
                break;
        }
        return result;
    }

    //Reducer implementation
    static addRoot(root,id,focusId)
    {
        if (root!=null)
        {
            return {root:root, focusId: 0}
        }
        else
        {
            let leaf = new LeafData(0, "", []);
            return { root: leaf, focusId: leaf.id}
        }
    }

    static addChild(root, id)
    {
        let current=root.getLeaf(id);
        let leaf=new LeafData(root.getNewId(), "", []);
        current.children.push(leaf)

        return { root: root, focusId: leaf.id }
    }

    static addSibling(root, id)
    {
        let parent=root.getParent(id);
        let leaf=new LeafData(root.getNewId(), "", []);
        parent.children.push(leaf)
        return { root: root, focusId: leaf.id }
    }

    static edit(root, newleaf, focusId)
    {
        let leaf = root.getLeaf(newleaf.id);
        leaf.description=newleaf.description;
        return { root: root , focusId: leaf.id}
    }

    static delete(root, id, focusId)
    {
        if(root!=null && root.id!=id)
        {
            let parent=root.getParent(id);
            parent.children=parent.children.filter(child=>child.id!=id)
            return {root: root, focusId: parent.id}
        }
        else
        {
            return {root: root, focusId: focusId}
        }
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

    static jump(root, focusId)
    {
        return { root: root , focusId: focusId}
    }

    static walk(root, focusId, whereToMove)
    {
        let current = this.getLeaf(root, focusId);
        let destination = StateProvider.whereToMove();
        let moveTo="";
        switch (whereToMove) {
            case destination.UP:
                if(current.elderbrotherid!=0){moveTo=current.elderbrotherid}
                else{moveTo=current.id};
                break;
            case destination.DOWN:
                let youngerbrother=StateProvider.getYoungerBrother(root,current);
                if(youngerbrother!=null){moveTo=youngerbrother.id}
                else{moveTo=current.id};
                break;
            case destination.LEVELUP:
                let parent=StateProvider.getLeaf(root, current.parentid);
                if(parent==null){moveTo=focusId;}
                else {moveTo=parent.id;};
                break;
            case destination.LEVELDOWN:
                let children = StateProvider.getChildren(root,current.id);
                if(children!=null)
                {
                    let youngestChild=children.filter((child=>child.elderbrotherid==0))[0];
                    if(youngestChild!=null){moveTo=youngestChild.id};
                }
                else
                {
                    moveTo=current.id
                }
                break;
            default:
                moveTo=focusId;
                break;
        }
        return { root: root , focusId: moveTo}
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



    // Map Redux state to component props
    static mapStateToProps(state) {
        return {
            root: state.root,
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