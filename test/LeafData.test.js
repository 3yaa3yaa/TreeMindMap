import LeafData from "../src/LeafData";

describe('A suite', function() {

    it('should collect tree data properly', function(){
        let data0= new LeafData(0,"data0",[]);
        let data1= new LeafData(1,"data1",[]);
        let data2= new LeafData(2,"data2",[]);
        let data3= new LeafData(3,"data3",[]);
        let data4= new LeafData(4,"data4",[]);
        let data5= new LeafData(5,"data5",[]);
        let data6= new LeafData(6,"data6",[]);
        let data7= new LeafData(7,"data7",[]);

        data0.children.push(data1);
        data0.children.push(data2);
        data1.children.push(data3);
        data2.children.push(data4);
        data4.children.push(data5);
        data5.children.push(data6);
        data4.children.push(data7);

        expect(data0.getLeaf(0)).toEqual(data0);
        expect(data0.getLeaf(1)).toEqual(data1);
        expect(data0.getLeaf(2)).toEqual(data2);
        expect(data0.getLeaf(3)).toEqual(data3);
        expect(data0.getLeaf(4)).toEqual(data4);
        expect(data0.getLeaf(5)).toEqual(data5);
        expect(data0.getLeaf(6)).toEqual(data6);

        expect(data0.getAllChildren(1)).toEqual([data3]);
        expect(data0.getAllChildren(2).sort((a,b)=>{return a.id-b.id})).toEqual([data4, data5,data6,data7]);
        expect(data0.getAllChildren(0).sort((a,b)=>{return a.id-b.id})).toEqual([data1,data2,data3,data4,data5,data6,data7]);
        expect(data0.getNewId()).toEqual(8);
        expect(data0.getParent(6)).toEqual(data5)
        expect(data0.getSiblings(7)).toEqual([data5,data7])
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
