import LeafData from './LeafData'
import Property from "./Property";

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

    static changeModeAction(mode)
    {
        return { type: 'changeMode', mode }
    }

    static changePreviewModeAction(mode)
    {
        return { type: 'changePreviewMode', mode }
    }


    // Reducer
    static leafReducer(state = { root: new LeafData(), property: new Property() }, action) {
        let result;
        if(state.property.isReadOnly===Property.readOnlyLevel().canEdit || action.type==="changeMode")
        {
            switch (action.type) {
                case 'delete':
                    result= StateProvider.delete(state, action.id,state.property.focusId);
                    break;
                case 'addRoot':
                    result= StateProvider.addRoot(state ,state.property.focusId,state.property.focusId);
                    break;
                case 'addSibling':
                    let youngerbrothers=state.root.getYoungerBrother(state.property.focusId);
                    if(youngerbrothers===null)
                    {result= StateProvider.addSibling(state ,action.id)}
                    else
                    {result = StateProvider.walk(state, state.property.focusId, StateProvider.whereToMove().DOWN)};
                    break;
                case 'addChild':
                    let children = state.root.getChildren(state.property.focusId);
                    if(children.length===0)
                    {result = StateProvider.addChild(state ,action.id)}
                    else
                    {result = StateProvider.walk(state, state.property.focusId, StateProvider.whereToMove().LEVELDOWN)};
                    break;
                case 'edit':
                    result= StateProvider.edit(state ,action.leaf,state.property.focusId);
                    break;
                case 'move':
                    result= StateProvider.move(state, action.from, action.to ,state.property.focusId);
                    break;
                case 'walk':
                    result = StateProvider.walk(state, state.property.focusId, action.whereTo);
                    break;
                case 'jump':
                    result = StateProvider.jump(state, action.id);
                    break;
                case 'changeMode':
                    result = StateProvider.changeMode(state, action.mode);
                    break;
                case 'changePreviewMode':
                    result = StateProvider.changePreviewMode(state, action.mode);
                    break;
                default:
                    result= state;
                    break;
            }
            return result;
        }
        else
        {
            return state;
        }
    }

    //Reducer implementation
    static addRoot(state,id,focusId)
    {
        if (state.root!=null)
        {
            return {root:state.root, property: state.property}
        }
        else
        {
            let leaf = new LeafData(0, "", []);
            let property = Property.getNewObject(state.property);
            property.focusId=leaf.id;
            return { root: leaf, property: property}
        }
    }

    static addChild(state, id)
    {
        let current=state.root.getLeaf(id);
        let leaf=new LeafData(state.root.getNewId(), "", []);
        current.children=current.children.concat(leaf);

        let property = Property.getNewObject(state.property);
        property.focusId=leaf.id;

        return { root: LeafData.getNewObject(state.root), property: property }
    }

    static addSibling(state, id)
    {
        let parent=state.root.getParent(id);
        if(parent===null)
        {
            return { root: state.root, property: state.property }
        }
        else
        {
            let leaf=new LeafData(state.root.getNewId());
            parent.children=parent.children.concat(leaf);

            let property = Property.getNewObject(state.property);
            property.focusId=leaf.id;
            return { root: LeafData.getNewObject(state.root), property:property }
        }
    }

    static edit(state, newleaf, focusId)
    {
        let leaf = state.root.getLeaf(newleaf.id);
        leaf.description=newleaf.description;
        leaf.imgs=newleaf.imgs;
        leaf.color=newleaf.color;
        return { root: LeafData.getNewObject(state.root) , property:state.property}
    }

    static move(state, from, to, focusId)
    {
        let current=state.root.getLeaf(from);
        let currentParent = state.root.getParent(from);
        let destination = state.root.getLeaf(to);
        if(destination!=null && current!=null && currentParent!=null)
        {
            let newleaf = LeafData.getNewObject(current);
            destination.children=destination.children.concat(newleaf);
            currentParent.children=currentParent.children.filter(child=>child.id!=from);
        }
        return { root: LeafData.getNewObject(state.root) , property:state.property}
    }


    static delete(state, id, focusId)
    {
        if(state.root!=null && state.root.id!=id)
        {
            let parent=state.root.getParent(id);
            parent.children=parent.children.filter(child=>child.id!=id);

            let property = Property.getNewObject(state.property);
            property.focusId=parent.id;

            return {root: LeafData.getNewObject(state.root), property: property}
        }
        else
        {
            return {root: state.root , property:state.property}
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


    static walk(state, focusId, whereToMove)
    {
        let destination = StateProvider.whereToMove();
        let moveTo="";
        switch (whereToMove) {
            case destination.UP:
                let elderBrother=state.root.getElderBrother(focusId);
                if(elderBrother!=null){moveTo=elderBrother.id}
                else{moveTo=focusId};
                break;
            case destination.DOWN:
                let youngerBrother=state.root.getYoungerBrother(focusId);
                if(youngerBrother!=null){moveTo=youngerBrother.id}
                else{moveTo=focusId};
                break;
            case destination.LEVELUP:
                let parent=state.root.getParent(focusId);
                if(parent!=null){moveTo=parent.id}
                else {moveTo=focusId};
                break;
            case destination.LEVELDOWN:
                let children = state.root.getChildren(focusId);
                if(children.length>0){moveTo=children[0].id}
                else{moveTo=focusId}
                break;
            default:
                moveTo=focusId;
                break;
        }
        let property=Property.getNewObject(state.property)
        property.focusId=moveTo;

        return { root: state.root , property:property}
    }

    static jump(state, focusId)
    {
        let property=Property.getNewObject(state.property)
        property.focusId=focusId;
        return { root: state.root , property: property}
    }

    static changeMode(state, mode)
    {
        let property=Property.getNewObject(state.property)
        property.isReadOnly=mode;
        return { root: state.root , property: property}
    }


    static changePreviewMode(state, mode)
    {
        let property=Property.getNewObject(state.property)
        property.previewMode=mode;
        return { root: state.root , property: property}
    }


    // Map Redux state to component props
    static mapStateToProps(state) {
        return {
            root: state.root,
            property: state.property
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
            jump: (id) => dispatch(StateProvider.jumpAction(id)),
            changeMode: (mode) => dispatch(StateProvider.changeModeAction(mode)),
            changePreviewMode: (mode) => dispatch(StateProvider.changePreviewModeAction(mode))
        }
    }
}

export default StateProvider;