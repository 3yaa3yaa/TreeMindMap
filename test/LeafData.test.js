import LeafData from "../src/LeafData";

describe('A suite', function() {

    it('should collect tree data properly', function(){
        let data0= new LeafData(0,"data0",[]);
        let data1= new LeafData(1,"data1",[]);
        let data2= new LeafData(2,"data2",[]);
        let data3= new LeafData(3,"data3",[]);
        let data4= new LeafData(4,"data4",[]);

        data0.children.push(data1);
        data0.children.push(data2);

        expect(data0.getAllChildren(0).sort((a,b)=>{return a.id-b.id})).toEqual([data1,data2]);

        data1.children.push(data3);
        data2.children.push(data4);

        expect(data0.getLeaf(0)).toEqual(data0);
        expect(data0.getLeaf(1)).toEqual(data1);
        expect(data0.getLeaf(2)).toEqual(data2);
        expect(data0.getLeaf(3)).toEqual(data3);
        expect(data0.getLeaf(4)).toEqual(data4);
        expect(data0.getLeaf(5)).toEqual(null);

        expect(data0.getAllChildren(1)).toEqual([data3]);
        expect(data0.getAllChildren(2)).toEqual([data4]);
        expect(data0.getAllChildren(0).sort((a,b)=>{return a.id-b.id})).toEqual([data1,data2,data3,data4]);
    })


    it('should get Parents correctly', function(){
        let data0= new LeafData(0,"data0",[]);
        let data1= new LeafData(1,"data1",[]);
        let data2= new LeafData(2,"data2",[]);
        let data3= new LeafData(3,"data3",[]);
        let data4= new LeafData(4,"data4",[]);

        data0.children.push(data1);
        data0.children.push(data2);
        data1.children.push(data3);
        data2.children.push(data4);

        expect(data0.getParent(1)).toEqual(data0);
        expect(data0.getParent(2)).toEqual(data0);
        expect(data0.getParent(3)).toEqual(data1);
        expect(data0.getParent(4)).toEqual(data2);
    })



});
