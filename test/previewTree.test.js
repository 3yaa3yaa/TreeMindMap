import Tree from "../src/Tree";
import LeafData from "../src/LeafData";
import React from 'react';
import { shallow, mount, render } from 'enzyme';
import Property from "../src/Property";


describe('A suite', function() {


    it('should calculate numbers properly', function(){
        let data0= new LeafData(0,"first level:\n=sum()",[]);
        let data1= new LeafData(1,"second level:\n=count()",[]);
        let data2= new LeafData(2,"third level:\n#10.5",[]);
        let data3= new LeafData(3,"fourth level:\n#20.5",[]);
        let data4= new LeafData(4,"fifth level:\n#30.5",[]);

        data0.children.push(data1);
        data1.children.push(data2);
        data2.children.push(data3);
        data3.children.push(data4);


        let prop=new Property();
        const wrapper=mount(<Tree root={data0} property={prop}/>);

        expect(wrapper.find('.description').at(0).text()).toEqual(expect.stringContaining("61.5"));
        expect(wrapper.find('.description').at(1).text()).toEqual(expect.stringContaining("3"));
        expect(wrapper.find('.description').at(2).text()).toEqual(expect.stringContaining("10.5"));
        expect(wrapper.find('.description').at(3).text()).toEqual(expect.stringContaining("20.5"));
        expect(wrapper.find('.description').at(4).text()).toEqual(expect.stringContaining("30.5"));

        let fs = require("fs");
        fs.writeFileSync("./test/__html__/previewTree.test.multiple.labels.html", wrapper.html());

    });

//
//
//     it('should calculate labels properly', function(){
//         let data0= new LeafData(0,"first level:\n=sum(label)",[]);
//         let data1= new LeafData(1,"second level:\n=count(label)",[]);
//         let data2= new LeafData(2,"third level:\n#label:10.5",[]);
//         let data3= new LeafData(3,"fourth level:\n#label:20.5",[]);
//         let data4= new LeafData(4,"fifth level:\n#label:30.5",[]);
//
//         data0.children.push(data1);
//         data1.children.push(data2);
//         data2.children.push(data3);
//         data3.children.push(data4);
//
//         const wrapper=mount(<PreviewSentence leafdata={data0}/>);
//         //console.log(wrapper.debug());
//         expect(wrapper.find('.PreviewSentence-Paragraph .description').at(0).text()).toEqual(expect.stringContaining("61.5"));
//         expect(wrapper.find('.PreviewSentence-Paragraph .description').at(1).text()).toEqual(expect.stringContaining("3"));
//         expect(wrapper.find('.PreviewSentence-Paragraph .description').at(2).text()).toEqual(expect.stringContaining("10.5"));
//         expect(wrapper.find('.PreviewSentence-Paragraph .description').at(3).text()).toEqual(expect.stringContaining("20.5"));
//         expect(wrapper.find('.PreviewSentence-Paragraph .description').at(4).text()).toEqual(expect.stringContaining("30.5"));
//     });
//
 });


