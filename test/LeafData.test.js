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


    it('should calculate correctly', function(){
        let data0= new LeafData(0,"#10",[]);
        let data1= new LeafData(1,"abc#10",[]);
        let data2= new LeafData(2,"abc#10 def",[]);
        let data3= new LeafData(3,"abc#10.5",[]);

        data0.children.push(data1);
        data1.children.push(data2);
        data2.children.push(data3);

        expect(data0.sumLabelsOfChildren()).toEqual(40.5);
        expect(data1.sumLabelsOfChildren()).toEqual(30.5);
        expect(data2.sumLabelsOfChildren()).toEqual(20.5);
        expect(data3.sumLabelsOfChildren()).toEqual(10.5);

        expect(data0.countLabelsOfChildren()).toEqual(4);
        expect(data1.countLabelsOfChildren()).toEqual(3);
        expect(data2.countLabelsOfChildren()).toEqual(2);
        expect(data3.countLabelsOfChildren()).toEqual(1);


        expect(data0.getLabelFieldsOfChildren()).toEqual([]);
    })

    it('should calculate multiple tags correctly', function(){
        let data0= new LeafData(0,"#10 #10",[]);
        let data1= new LeafData(1,"abc#10 #10",[]);
        let data2= new LeafData(2,"abc#10 def #10",[]);
        let data3= new LeafData(3,"abc#10.5 #10",[]);

        data0.children.push(data1);
        data1.children.push(data2);
        data2.children.push(data3);


        expect(data0.sumLabelsOfChildren()).toEqual(80.5);
        expect(data1.sumLabelsOfChildren()).toEqual(60.5);
        expect(data2.sumLabelsOfChildren()).toEqual(40.5);
        expect(data3.sumLabelsOfChildren()).toEqual(20.5);

        expect(data0.countLabelsOfChildren()).toEqual(8);
        expect(data1.countLabelsOfChildren()).toEqual(6);
        expect(data2.countLabelsOfChildren()).toEqual(4);
        expect(data3.countLabelsOfChildren()).toEqual(2);

        expect(data0.getLabelFieldsOfChildren()).toEqual([]);
    })

    it('should calculate label values correctly', function(){
        let data0= new LeafData(0,"#test:10",[]);
        let data1= new LeafData(1,"abc#test:10",[]);
        let data2= new LeafData(2,"abc#test:10",[]);
        let data3= new LeafData(3,"abc#test:10.5",[]);
        let data4= new LeafData(4,"#test",[]);

        data0.children.push(data1);
        data1.children.push(data2);
        data2.children.push(data3);
        data3.children.push(data4);
;
        expect(data0.sumLabelsOfChildren("test")).toEqual(40.5);
        expect(data1.sumLabelsOfChildren("test")).toEqual(30.5);
        expect(data2.sumLabelsOfChildren("test")).toEqual(20.5);
        expect(data3.sumLabelsOfChildren("test")).toEqual(10.5);
        expect(data4.sumLabelsOfChildren("test")).toEqual(0);

        expect(data0.countLabelsOfChildren("test")).toEqual(4);
        expect(data1.countLabelsOfChildren("test")).toEqual(3);
        expect(data2.countLabelsOfChildren("test")).toEqual(2);
        expect(data3.countLabelsOfChildren("test")).toEqual(1);
        expect(data4.countLabelsOfChildren("test")).toEqual(0);


        expect(data0.getLabelFieldsOfChildren()).toEqual(["test"]);
    })


    it('should returns proper fields', function(){
        let data0= new LeafData(0,"#test1:10 #test2:100",[]);
        let data1= new LeafData(1,"abc#test1:10 #test2:100",[]);
        let data2= new LeafData(2,"abc#test1:10 #test2:100",[]);
        let data3= new LeafData(3,"abc#test1:10.5 #test2:100.5",[]);
        let data4= new LeafData(4,"#test3",[]);

        data0.children.push(data1);
        data1.children.push(data2);
        data2.children.push(data3);
        data3.children.push(data4);

        expect(data0.sumLabelsOfChildren("test1")).toEqual(40.5);
        expect(data1.sumLabelsOfChildren("test1")).toEqual(30.5);
        expect(data2.sumLabelsOfChildren("test1")).toEqual(20.5);
        expect(data3.sumLabelsOfChildren("test1")).toEqual(10.5);
        expect(data4.sumLabelsOfChildren("test1")).toEqual(0);

        expect(data0.sumLabelsOfChildren("test2")).toEqual(400.5);
        expect(data1.sumLabelsOfChildren("test2")).toEqual(300.5);
        expect(data2.sumLabelsOfChildren("test2")).toEqual(200.5);
        expect(data3.sumLabelsOfChildren("test2")).toEqual(100.5);
        expect(data4.sumLabelsOfChildren("test2")).toEqual(0);


        expect(data0.countLabelsOfChildren("test1")).toEqual(4);
        expect(data1.countLabelsOfChildren("test1")).toEqual(3);
        expect(data2.countLabelsOfChildren("test1")).toEqual(2);
        expect(data3.countLabelsOfChildren("test1")).toEqual(1);
        expect(data4.countLabelsOfChildren("test1")).toEqual(0);

        expect(data0.countLabelsOfChildren("test2")).toEqual(4);
        expect(data1.countLabelsOfChildren("test2")).toEqual(3);
        expect(data2.countLabelsOfChildren("test2")).toEqual(2);
        expect(data3.countLabelsOfChildren("test2")).toEqual(1);
        expect(data4.countLabelsOfChildren("test2")).toEqual(0);

        expect(data0.getLabelFieldsOfChildren()).toEqual(["test1","test2","test3"]);

        expect(data0.getLabelValue("test1")).toEqual(["10"]);
        expect(data0.getLabelValue("test2")).toEqual(["100"]);
        expect(data3.getLabelValue("test1")).toEqual(["10.5"]);
        expect(data3.getLabelValue("test2")).toEqual(["100.5"]);
        expect(data4.getLabelValue("test1")).toEqual([]);
        expect(data4.getLabelValue("test2")).toEqual([]);
        expect(data4.getLabelValue("test3")).toEqual([]);


        expect(data0.labelExists("test1")).toEqual(true);
        expect(data0.labelExists("test2")).toEqual(true);
        expect(data0.labelExists("test3")).toEqual(false);
        expect(data1.labelExists("test1")).toEqual(true);
        expect(data1.labelExists("test2")).toEqual(true);
        expect(data1.labelExists("test3")).toEqual(false);
        expect(data2.labelExists("test1")).toEqual(true);
        expect(data2.labelExists("test2")).toEqual(true);
        expect(data2.labelExists("test3")).toEqual(false);
        expect(data3.labelExists("test1")).toEqual(true);
        expect(data3.labelExists("test2")).toEqual(true);
        expect(data3.labelExists("test3")).toEqual(false);
        expect(data4.labelExists("test1")).toEqual(false);
        expect(data4.labelExists("test2")).toEqual(false);
        expect(data4.labelExists("test3")).toEqual(true);

    })






});
