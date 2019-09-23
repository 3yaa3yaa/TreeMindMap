import StateProvider from '../src/StateProvider';


describe('A suite', function() {


    it('should convert properly', function(){
        let data1={id:0,some:"data"};
        let data2={id:1,some:"data2"};
        let convert = StateProvider.convertToDictionary([data1,data2])
        expect(convert).toEqual({0:data1,1:data2})
    })


    it('should convert properly', function(){
        let data1={id:0,some:"data"}
        let data2={id:1,some:"data2"};
        let convert = StateProvider.convertToArray({0:data1,1:data2})
        expect(convert).toEqual([data1,data2])
    })

    it('should calculate root leafs properly', function() {
        let store=StateProvider.addRoot([],0,0);
        let leafs_root=store.leafs;
        expect(leafs_root).toEqual([{id:1,parentid:0,elderbrotherid:0,title:""}]);
    })


    it('should sibling', function() {
        let store=StateProvider.addRoot([],0,0);
        let leafs_root=store.leafs;

        let leafs_hasasibling=StateProvider.addSibling(leafs_root,1).leafs;
        leafs_hasasibling=StateProvider.addSibling(leafs_hasasibling,2).leafs;
        expect(leafs_hasasibling).toEqual(
            [{id:1,parentid:0,elderbrotherid:0,title:""},
                {id:2,parentid:0,elderbrotherid:1,title:""},
                {id:3,parentid:0,elderbrotherid:2,title:""}]);
    })


    it('should display siblings', function() {
        let store=StateProvider.addRoot([],0,0);
        let leafs_root=store.leafs;
        let leafs_hasasibling=StateProvider.addSibling(leafs_root,1).leafs;
        leafs_hasasibling=StateProvider.addSibling(leafs_hasasibling,2).leafs;

        expect(leafs_hasasibling[1]).toEqual(
            {id:2,parentid:0,elderbrotherid:1,title:""});

        expect(leafs_hasasibling[2]).toEqual(
            {id:3,parentid:0,elderbrotherid:2,title:""});


        let tobeTested=StateProvider.getYoungerBrother(leafs_hasasibling,leafs_hasasibling[1])
        expect(tobeTested).toEqual(
            {id:3,parentid:0,elderbrotherid:2,title:""});
    })


    it('should process key operation', function() {
        let store=StateProvider.addRoot([],0,0);//1
        let leafs_root=store.leafs;
        let leafs=StateProvider.addSibling(leafs_root,1).leafs;//2
        leafs=StateProvider.addSibling(leafs,2).leafs;//3
        leafs=StateProvider.addSibling(leafs,3).leafs;//4
        leafs=StateProvider.addSibling(leafs,4).leafs;//5
        leafs=StateProvider.addChild(leafs,5).leafs;//6
        leafs=StateProvider.addSibling(leafs,6).leafs;//7

        expect(StateProvider.getLeaf(leafs,1)).toEqual(
            {id:1,parentid:0,elderbrotherid:0,title:""});

        expect(StateProvider.getYoungerBrother(leafs,
            StateProvider.getLeaf(leafs,1))).toEqual(
            {id:2,parentid:0,elderbrotherid:1,title:""});
        expect(StateProvider.whereToMove().DOWN).toEqual("DOWN");
        expect(StateProvider.whereToMove().UP).toEqual("UP");
        expect(StateProvider.whereToMove().LEVELUP).toEqual("LEVELUP");
        expect(StateProvider.whereToMove().LEVELDOWN).toEqual("LEVELDOWN");


        let movedDown=StateProvider.walk(leafs,1, StateProvider.whereToMove().DOWN);
        expect(movedDown.focusId).toEqual(2);

        let movedDown_2=StateProvider.walk(leafs,5, StateProvider.whereToMove().DOWN);
        expect(movedDown_2.focusId).toEqual(5);


        let movedUp=StateProvider.walk(leafs,6, StateProvider.whereToMove().UP);
        expect(movedUp.focusId).toEqual(6);

        let movedUp_2=StateProvider.walk(leafs,4, StateProvider.whereToMove().UP);
        expect(movedUp_2.focusId).toEqual(3);

        let children=StateProvider.findChildren(leafs, 5)
        expect(children).toEqual([leafs[5], leafs[6]]);
        expect(children.filter((child=>child.elderbrotherid==0))[0]).toEqual(leafs[5]);

        let levelDown=StateProvider.walk(leafs,5, StateProvider.whereToMove().LEVELDOWN);
        expect(levelDown.focusId).toEqual(6);

        let levelDown_2=StateProvider.walk(leafs,6, StateProvider.whereToMove().LEVELDOWN);
        expect(levelDown_2.focusId).toEqual(6);

        let levelUp=StateProvider.walk(leafs,7, StateProvider.whereToMove().LEVELUP);
        expect(levelUp.focusId).toEqual(5);

        let levelUp_2=StateProvider.walk(leafs,4, StateProvider.whereToMove().LEVELUP);
        expect(levelUp_2.focusId).toEqual(4);

    })

    it('should display chilren', function() {
        let store=StateProvider.addRoot([],0,0);
        let leafs_root=store.leafs;

        let leafs_hasachild=StateProvider.addChild(leafs_root,1).leafs;
        leafs_hasachild=StateProvider.addChild(leafs_hasachild,2).leafs;
        expect(leafs_hasachild).toEqual(
            [{id:1,parentid:0,elderbrotherid:0,title:""},
                {id:2,parentid:1,elderbrotherid:0,title:""},
                {id:3,parentid:2,elderbrotherid:0,title:""}]);
    })

    it('should calculaute new id', function() {
        let leafs = [{id:1,parentid:0,elderbrotherid:0,title:""},
            {id:2,parentid:1,elderbrotherid:0,title:""},
            {id:3,parentid:2,elderbrotherid:0,title:""},
            {id:4,parentid:2,elderbrotherid:3,title:""},
            {id:5,parentid:2,elderbrotherid:4,title:""},
            {id:6,parentid:2,elderbrotherid:5,title:""}];

        expect(StateProvider.getNewId(leafs)).toBe(7);

        let leafs_2 = null;

        expect(StateProvider.getNewId(leafs_2)).toBe(1);

    })

    it('should filter', function() {
        let leafs = [{id:1,parentid:0,elderbrotherid:0,title:""},
            {id:2,parentid:1,elderbrotherid:0,title:""},
            {id:3,parentid:2,elderbrotherid:0,title:""},
            {id:4,parentid:2,elderbrotherid:3,title:""},
            {id:5,parentid:2,elderbrotherid:4,title:""},
            {id:6,parentid:2,elderbrotherid:5,title:""}];

        expect(StateProvider.filterAndSortLeafs(leafs, 2)).toEqual(
            [{id:3,parentid:2,elderbrotherid:0,title:""},
                {id:4,parentid:2,elderbrotherid:3,title:""},
                {id:5,parentid:2,elderbrotherid:4,title:""},
                {id:6,parentid:2,elderbrotherid:5,title:""}]);


        let leafs_sort = [{id:1,parentid:0,elderbrotherid:0,title:""},
            {id:2,parentid:1,elderbrotherid:0,title:""},
            {id:6,parentid:2,elderbrotherid:5,title:""},
            {id:5,parentid:2,elderbrotherid:4,title:""},
            {id:4,parentid:2,elderbrotherid:3,title:""},
            {id:3,parentid:2,elderbrotherid:0,title:""}];

        expect(StateProvider.filterAndSortLeafs(leafs_sort, 2)).toEqual(
            [{id:3,parentid:2,elderbrotherid:0,title:""},
                {id:4,parentid:2,elderbrotherid:3,title:""},
                {id:5,parentid:2,elderbrotherid:4,title:""},
                {id:6,parentid:2,elderbrotherid:5,title:""}]);

        let leafs_3 = null;
        expect(StateProvider.filterAndSortLeafs(leafs_3, 0)).toBe(null);


        let leafs_4 = [{id:1,parentid:0,elderbrotherid:0,title:""}];
        expect(StateProvider.filterAndSortLeafs(leafs_4, 0)).toEqual(
            [{id:1,parentid:0,elderbrotherid:0,title:""}]);


        let leafs_5 = [{id:1,parentid:0,elderbrotherid:0,title:""}];
        expect(StateProvider.filterAndSortLeafs(leafs_5, 1)).toEqual(
            []);
    })


    it('should be integral', function() {
        let store=StateProvider.addRoot([],0,0);
        let leafs_root=store.leafs;

        let leafs_hasachild=StateProvider.addChild(leafs_root,1).leafs;
        leafs_hasachild=StateProvider.addChild(leafs_hasachild,2).leafs;
        let valueadded=StateProvider.edit(leafs_hasachild,{id:2,parentid:1,elderbrotherid:0,value:"some data",title:""},1)
        expect(valueadded).toEqual(
            {focusId:2, leafs:[{id:1,parentid:0,elderbrotherid:0,title:""},
                    {id:2,parentid:1,elderbrotherid:0, value:"some data",title:""},
                    {id:3,parentid:2,elderbrotherid:0,title:""}]}
        );
        expect(StateProvider.IsIntegrityCheckOK(valueadded)).toBe(true);


        let dnd=StateProvider.edit(leafs_hasachild,{id:3,parentid:1,elderbrotherid:2,value:"One level down",title:""},1)
        expect(dnd).toEqual(
            {focusId:3, leafs:[{id:1,parentid:0,elderbrotherid:0,title:""},
                    {id:2,parentid:1,elderbrotherid:0,title:""},
                    {id:3,parentid:1,elderbrotherid:2, value:"One level down",title:""}]}
        );
        expect(StateProvider.IsIntegrityCheckOK(dnd)).toBe(true);

    })

    it('should be integral2', function(){
        let data_1 = [{id:1,parentid:0,elderbrotherid:0,title:""},
            {id:2,parentid:1,elderbrotherid:0,title:""},
            {id:3,parentid:1,elderbrotherid:2, value:"Test Data",title:""}];

        expect(StateProvider.IsIntegrityCheckOK({focusId:"0", leafs: data_1})).toBe(true);

        let data_2 = [{id:1,parentid:0,elderbrotherid:0,title:""},
            {id:2,parentid:4,elderbrotherid:0,title:""},
            {id:3,parentid:1,elderbrotherid:2, value:"Test Data",title:""}];

        expect(StateProvider.IsIntegrityCheckOK({focusId:"0", leafs: data_2})).toBe(false);
    })



    it('should display data well', function(){
        let data = [{id:1,parentid:0,elderbrotherid:0,title:""},
            {id:2,parentid:1,elderbrotherid:0,title:""},
            {id:3,parentid:1,elderbrotherid:2, value:"Test Data",title:""}];
        expect(StateProvider.getLeaf(data,2)).toEqual({id:2,parentid:1,elderbrotherid:0,title:""});
        expect(StateProvider.getLeaf(data,4)).toEqual(null);

    })

    it('should display sum function for numeric', function() {
        let data = [{id:1,parentid:0,elderbrotherid:0,title:""},
            {id:2,parentid:1,elderbrotherid:0,title:"#1"},
            {id:3,parentid:1,elderbrotherid:2,title:"this is #2 value"},
            {id:4,parentid:2,elderbrotherid:0,title:"this is #5 value"}];

        expect(StateProvider.getAllChildren(data[0],data)).toEqual([data[1],data[2],data[3]])
        expect(StateProvider.sumLabelsOfChildren(data[0], data, "")).toEqual(8)
    })

    it('should display sum function for numeric', function() {
        let data = [{id:1,parentid:0,elderbrotherid:0,title:""},
            {id:2,parentid:1,elderbrotherid:0,title:"#1"},
            {id:3,parentid:1,elderbrotherid:2,title:"this is #val:2 value"},
            {id:4,parentid:2,elderbrotherid:0,title:"this is #5 value"},
            {id:5,parentid:2,elderbrotherid:0,title:"this is #val:5 value"},
            {id:6,parentid:2,elderbrotherid:1,title:"this is #val:6 value"}];

        expect(StateProvider.sumLabelsOfChildren(data[0], data, "")).toEqual(6)
        expect(StateProvider.sumLabelsOfChildren(data[0], data, "val")).toEqual(13)
        expect(StateProvider.countLabelsOfChildren(data[0], data, "")).toEqual(2)
        expect(StateProvider.countLabelsOfChildren(data[0], data, "val")).toEqual(3)
    })



});
