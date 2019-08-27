import StateProvider from '../src/StateProvider';

function testConvert(){
    let data1={id:0,some:"data"}
    let data2={id:1,some:"data2"};
    let convert = StateProvider.convertToDictionary([data1,data2])
    test("Convert",()=>expect(convert).toEqual({0:data1,1:data2}))
}

function testRoot()
{
    let store=StateProvider.addRoot([],0,0);
    let leafs_root=store.leafs;
    test("Root leafs", ()=>{expect(leafs_root).toEqual([{id:1,parentid:0,elderbrotherid:0}])});
}

function testSibling()
{
    let store=StateProvider.addRoot([],0,0);
    let leafs_root=store.leafs;

    let leafs_hasasibling=StateProvider.addSibling(leafs_root,1).leafs;
    leafs_hasasibling=StateProvider.addSibling(leafs_hasasibling,2).leafs;
    test("Siblings", ()=>{expect(leafs_hasasibling).toEqual(
        [{id:1,parentid:0,elderbrotherid:0},
            {id:2,parentid:0,elderbrotherid:1},
            {id:3,parentid:0,elderbrotherid:2}])});
}

function testYoungerBrother()
{
    let store=StateProvider.addRoot([],0,0);
    let leafs_root=store.leafs;
    let leafs_hasasibling=StateProvider.addSibling(leafs_root,1).leafs;
    leafs_hasasibling=StateProvider.addSibling(leafs_hasasibling,2).leafs;

    test("Sibling_1", ()=>{expect(leafs_hasasibling[1]).toEqual(
        {id:2,parentid:0,elderbrotherid:1})});

    test("Sibling_2", ()=>{expect(leafs_hasasibling[2]).toEqual(
        {id:3,parentid:0,elderbrotherid:2})});


    let tobeTested=StateProvider.getYoungerBrother(leafs_hasasibling,leafs_hasasibling[1])
    test("YoungerBrother", ()=>{expect(tobeTested).toEqual(
            {id:3,parentid:0,elderbrotherid:2})});

}

function testMove()
{
    let store=StateProvider.addRoot([],0,0);
    let leafs_root=store.leafs;
    let leafs_hasasibling=StateProvider.addSibling(leafs_root,1).leafs;
    leafs_hasasibling=StateProvider.addSibling(leafs_hasasibling,2).leafs;

    test("Focused Leaf", ()=>{expect(StateProvider.getCurrent(leafs_hasasibling,1)).toEqual(
        {id:1,parentid:0,elderbrotherid:0})});

    test("Younger brother Leaf", ()=>{expect(StateProvider.getYoungerBrother(leafs_hasasibling,
        StateProvider.getCurrent(leafs_hasasibling,1))).toEqual(
        {id:2,parentid:0,elderbrotherid:1})});

    let movedDown=StateProvider.move(leafs_hasasibling,1, StateProvider.whereToMove().DOWN);
    test("Keyword", ()=>{expect(StateProvider.whereToMove().DOWN).toEqual("DOWN")});

    test("Moved Down_focusId", ()=>{expect(movedDown.focusId).toEqual(2)});
}

function testChild()
{
    let store=StateProvider.addRoot([],0,0);
    let leafs_root=store.leafs;

    let leafs_hasachild=StateProvider.addChild(leafs_root,1).leafs;
    leafs_hasachild=StateProvider.addChild(leafs_hasachild,2).leafs;
    test("Children", ()=>{expect(leafs_hasachild).toEqual(
        [{id:1,parentid:0,elderbrotherid:0},
            {id:2,parentid:1,elderbrotherid:0},
            {id:3,parentid:2,elderbrotherid:0}])});
}

testConvert();
testYoungerBrother();
testRoot();
testSibling();
testChild();
testMove();



