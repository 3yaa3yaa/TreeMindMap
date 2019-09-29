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

    static moveAction(from, to)
    {
        return { type: 'move', from, to }
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
    static leafReducer(state = { root: new LeafData(0,"",[]), id:"", focusId:"" }, action) {
        let result;
        switch (action.type) {
            case 'delete':
                result= StateProvider.delete(state.root, action.id,state.focusId);
                break;
            case 'addRoot':
                result= StateProvider.addRoot(state.root ,state.id,state.id);
                break;
            case 'addSibling':
                let youngerbrothers=state.root.getYoungerBrother(state.focusId);
                if(youngerbrothers===null)
                    {result= StateProvider.addSibling(state.root ,action.id)}
                else
                    {result = StateProvider.walk(state.root, state.focusId, StateProvider.whereToMove().DOWN)};
                break;
            case 'addChild':
                let children = state.root.getChildren(state.focusId);
                if(children.length===0)
                    {result = StateProvider.addChild(state.root ,action.id)}
                else
                    {result = StateProvider.walk(state.root, state.focusId, StateProvider.whereToMove().LEVELDOWN)};
                break;
            case 'edit':
                result= StateProvider.edit(state.root ,action.leaf,state.focusId);
                break;
            case 'move':
                result= StateProvider.move(state.root, action.from, action.to ,state.focusId);
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
        current.children=current.children.concat(leaf)

        return { root: new LeafData(root.id, root.description, root.children, root.imgs), focusId: leaf.id }
    }

    static addSibling(root, id)
    {
        let parent=root.getParent(id);
        let leaf=new LeafData(root.getNewId(), "", []);
        parent.children=parent.children.concat(leaf)
        return { root: new LeafData(root.id, root.description, root.children, root.imgs), focusId: leaf.id }
    }

    static edit(root, newleaf, focusId)
    {
        let leaf = root.getLeaf(newleaf.id);
        leaf.description=newleaf.description;
        leaf.imgs=newleaf.imgs;
        return { root: new LeafData(root.id, root.description, root.children, root.imgs) , focusId: leaf.id}
    }

    static move(root, from, to, focusId)
    {
        let current=root.getLeaf(from);
        let currentParent = root.getParent(from);
        let destination = root.getLeaf(to);
        if(destination!=null && current!=null && currentParent!=null)
        {
            let newleaf= new LeafData(current.id,current.description, current.children, current.imgs);
            destination.children=destination.children.concat(newleaf);
            currentParent.children=currentParent.children.filter(child=>child.id!=from);
        }
        return { root: new LeafData(root.id, root.description, root.children, root.imgs) , focusId: focusId}
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
            return {root: new LeafData(root.id, root.description, root.children), focusId: focusId}
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
        let destination = StateProvider.whereToMove();
        let moveTo="";
        switch (whereToMove) {
            case destination.UP:
                let elderBrother=root.getElderBrother(focusId);
                if(elderBrother!=null){moveTo=elderBrother.id}
                else{moveTo=focusId};
                break;
            case destination.DOWN:
                let youngerBrother=root.getYoungerBrother(focusId);
                if(youngerBrother!=null){moveTo=youngerBrother.id}
                else{moveTo=focusId};
                break;
            case destination.LEVELUP:
                let parent=root.getParent(focusId);
                if(parent!=null){moveTo=parent.id}
                else {moveTo=focusId};
                break;
            case destination.LEVELDOWN:
                let children = root.getChildren(focusId);
                if(children.length>0){moveTo=children[0].id}
                else{moveTo=focusId}
                break;
            default:
                moveTo=focusId;
                break;
        }
        return { root: root , focusId: moveTo}
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
            move: (from, to) => dispatch(StateProvider.moveAction(from, to)),
            walk: (whereTo) => dispatch(StateProvider.walkAction(whereTo)),
            jump: (id) => dispatch(StateProvider.jumpAction(id))
        }
    }
}

export default StateProvider;