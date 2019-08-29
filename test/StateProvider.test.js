import StateProvider from '../src/StateProvider';

function testConvertToDictionary(){
    let data1={id:0,some:"data"}
    let data2={id:1,some:"data2"};
    let convert = StateProvider.convertToDictionary([data1,data2])
    test("Convert",()=>expect(convert).toEqual({0:data1,1:data2}))
}

function testConvertToArray(){
    let data1={id:0,some:"data"}
    let data2={id:1,some:"data2"};
    let convert = StateProvider.convertToArray({0:data1,1:data2})
    test("Convert",()=>expect(convert).toEqual([data1,data2]))
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

    test("Focused Leaf", ()=>{expect(StateProvider.getLeaf(leafs_hasasibling,1)).toEqual(
        {id:1,parentid:0,elderbrotherid:0})});

    test("Younger brother Leaf", ()=>{expect(StateProvider.getYoungerBrother(leafs_hasasibling,
        StateProvider.getLeaf(leafs_hasasibling,1))).toEqual(
        {id:2,parentid:0,elderbrotherid:1})});

    let movedDown=StateProvider.walk(leafs_hasasibling,1, StateProvider.whereToMove().DOWN);
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

function testNewId()
{
    let leafs = [{id:1,parentid:0,elderbrotherid:0},
        {id:2,parentid:1,elderbrotherid:0},
        {id:3,parentid:2,elderbrotherid:0},
        {id:4,parentid:2,elderbrotherid:3},
        {id:5,parentid:2,elderbrotherid:4},
        {id:6,parentid:2,elderbrotherid:5}];

    test("Test New Id 1", ()=>{expect(StateProvider.getNewId(leafs)).toBe(7)});

    let leafs_2 = null;

    test("Test New Id 2", ()=>{expect(StateProvider.getNewId(leafs_2)).toBe(1)});

}

function testFilter()
{
    let leafs = [{id:1,parentid:0,elderbrotherid:0},
        {id:2,parentid:1,elderbrotherid:0},
        {id:3,parentid:2,elderbrotherid:0},
        {id:4,parentid:2,elderbrotherid:3},
        {id:5,parentid:2,elderbrotherid:4},
        {id:6,parentid:2,elderbrotherid:5}];

    test("Test filter 1", ()=>{expect(StateProvider.filterAndSortLeafs(leafs, 2)).toEqual(
           [{id:3,parentid:2,elderbrotherid:0},
            {id:4,parentid:2,elderbrotherid:3},
            {id:5,parentid:2,elderbrotherid:4},
            {id:6,parentid:2,elderbrotherid:5}])});


    let leafs_sort = [{id:1,parentid:0,elderbrotherid:0},
        {id:2,parentid:1,elderbrotherid:0},
        {id:6,parentid:2,elderbrotherid:5},
        {id:5,parentid:2,elderbrotherid:4},
        {id:4,parentid:2,elderbrotherid:3},
        {id:3,parentid:2,elderbrotherid:0}];

    test("Test filter 2", ()=>{expect(StateProvider.filterAndSortLeafs(leafs_sort, 2)).toEqual(
        [{id:3,parentid:2,elderbrotherid:0},
            {id:4,parentid:2,elderbrotherid:3},
            {id:5,parentid:2,elderbrotherid:4},
            {id:6,parentid:2,elderbrotherid:5}])});

    let leafs_3 = null;
    test("Test filter 3", ()=>{expect(StateProvider.filterAndSortLeafs(leafs_3, 0)).toBe(null)});


    let leafs_4 = [{id:1,parentid:0,elderbrotherid:0}];
    test("Test filter 4", ()=>{expect(StateProvider.filterAndSortLeafs(leafs_4, 0)).toEqual(
        [{id:1,parentid:0,elderbrotherid:0}])});


    let leafs_5 = [{id:1,parentid:0,elderbrotherid:0}];
    test("Test filter 5", ()=>{expect(StateProvider.filterAndSortLeafs(leafs_5, 1)).toEqual(
        [])});


}


function testEdit()
{
    let store=StateProvider.addRoot([],0,0);
    let leafs_root=store.leafs;

    let leafs_hasachild=StateProvider.addChild(leafs_root,1).leafs;
    leafs_hasachild=StateProvider.addChild(leafs_hasachild,2).leafs;
    let valueadded=StateProvider.edit(leafs_hasachild,{id:2,parentid:1,elderbrotherid:0,value:"some data"},1)
    test("Edit : Value added", ()=>{expect(valueadded).toEqual(
        {focusId:2, leafs:[{id:1,parentid:0,elderbrotherid:0},
                {id:2,parentid:1,elderbrotherid:0, value:"some data"},
                {id:3,parentid:2,elderbrotherid:0}]}
        )});
    test("Integrity Check after edit", ()=>{expect(StateProvider.IsIntegrityCheckOK(valueadded.leafs)).toBe(true)});


    let dnd=StateProvider.edit(leafs_hasachild,{id:3,parentid:1,elderbrotherid:2,value:"One level down"},1)
    test("Edit : Drag and Drop -- One level down", ()=>{expect(dnd).toEqual(
        {focusId:3, leafs:[{id:1,parentid:0,elderbrotherid:0},
                {id:2,parentid:1,elderbrotherid:0},
                {id:3,parentid:1,elderbrotherid:2, value:"One level down"}]}
    )});
    test("Integrity Check after dnd", ()=>{expect(StateProvider.IsIntegrityCheckOK(dnd.leafs)).toBe(true)});

}

function testIntegrityCheck() {
    let data_1 = [{id:1,parentid:0,elderbrotherid:0},
        {id:2,parentid:1,elderbrotherid:0},
        {id:3,parentid:1,elderbrotherid:2, value:"Test Data"}];

    test("Integrity Check 1", ()=>{expect(StateProvider.IsIntegrityCheckOK(data_1)).toBe(true)});

    let data_2 = [{id:1,parentid:0,elderbrotherid:0},
            {id:2,parentid:4,elderbrotherid:0},
            {id:3,parentid:1,elderbrotherid:2, value:"Test Data"}];

    test("Integrity Check 2", ()=>{expect(StateProvider.IsIntegrityCheckOK(data_2)).toBe(false)});
}

function testGetLeaf() {
    let data = [{id:1,parentid:0,elderbrotherid:0},
        {id:2,parentid:1,elderbrotherid:0},
        {id:3,parentid:1,elderbrotherid:2, value:"Test Data"}];
    test("Get Current id=2", ()=>{expect(StateProvider.getLeaf(data,2)).toEqual({id:2,parentid:1,elderbrotherid:0})});
    test("Get Current id=4", ()=>{expect(StateProvider.getLeaf(data,4)).toEqual(null)});


}

testNewId();
testFilter();
testGetLeaf();
testConvertToDictionary();
testConvertToArray();
testYoungerBrother();
testRoot();
testSibling();
testChild();
testMove();
testEdit();
testIntegrityCheck();

