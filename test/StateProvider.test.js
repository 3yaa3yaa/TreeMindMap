import StateProvider from '../src/StateProvider';

//ROOT Node
let store=StateProvider.addRoot([],0,0);
let leafs_root=store.leafs;
test("Root leafs", ()=>{expect(leafs_root).toEqual([{id:1,parentid:"ROOT",index:0}])});

//Siblings
let leafs_hasasibling=StateProvider.addSibling(leafs_root,1).leafs;
leafs_hasasibling=StateProvider.addSibling(leafs_hasasibling,2).leafs;
test("Siblings", ()=>{expect(leafs_hasasibling).toEqual(
                        [{id:1,parentid:"ROOT",index:0},
                         {id:2,parentid:"ROOT",index:1},
                         {id:3,parentid:"ROOT",index:2}])});

//Move Down
let leafs_movedDown=StateProvider.move(leafs_hasasibling,0,StateProvider.whereToMove().DOWN).leafs;
leafs_movedDown=StateProvider.move(leafs_movedDown,1,StateProvider.whereToMove().DOWN).focusId;
test("Moved Down", ()=>{expect(leafs_movedDown).toEqual(2)});


//Children
let leafs_hasachild=StateProvider.addChild(leafs_root,1).leafs;
test("Children", ()=>{expect(leafs_hasachild).toEqual(
    [{id:1,parentid:"ROOT",index:0},
        {id:2,parentid:1,index:0},
        {id:3,parentid:2,index:0}])});


