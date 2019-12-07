import PreviewSentence from "../src/PreviewSentence";
import LeafData from "../src/LeafData";
import React from 'react';
import { shallow, mount, render } from 'enzyme';


describe('A suite', function() {

    it('should display header properly', function(){
        let data0= new LeafData(0,"data0",[]);
        let data1= new LeafData(1,"h1.data1",[]);
        let data2= new LeafData(2,"data2",[]);
        let data3= new LeafData(3,"data3h1.",[]);
        let data4= new LeafData(4,"h3.data4",[]);
        let data5= new LeafData(5,"data5",[]);
        let data6= new LeafData(6,"data6",[]);
        let data7= new LeafData(7,"data7",[]);

        data0.children.push(data1);
            data1.children.push(data3);
        data0.children.push(data2);
            data2.children.push(data4);
                data4.children.push(data7);
                data4.children.push(data5);
                    data5.children.push(data6);

        const wrapper=mount(<PreviewSentence leafdata={data0}/>);
        //console.log(wrapper.debug());
        expect(wrapper.find('h1').at(0).text()).toBe("data0");
            expect(wrapper.find('h2').at(0).text()).toBe("data1");
            expect(wrapper.find('h2').at(1).text()).toBe("data2");
                expect(wrapper.find('h3').at(0).text()).toBe("data4");
                    expect(wrapper.find('h4').at(0).text()).toBe("data5");
    });


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

        const wrapper=mount(<PreviewSentence leafdata={data0}/>);
        //console.log(wrapper.debug());
        expect(wrapper.find('.PreviewSentence-Paragraph .description').at(0).text()).toEqual(expect.stringContaining("61.5"));
        expect(wrapper.find('.PreviewSentence-Paragraph .description').at(1).text()).toEqual(expect.stringContaining("3"));
        expect(wrapper.find('.PreviewSentence-Paragraph .description').at(2).text()).toEqual(expect.stringContaining("10.5"));
        expect(wrapper.find('.PreviewSentence-Paragraph .description').at(3).text()).toEqual(expect.stringContaining("20.5"));
        expect(wrapper.find('.PreviewSentence-Paragraph .description').at(4).text()).toEqual(expect.stringContaining("30.5"));
    });



    it('should calculate labels properly', function(){
        let data0= new LeafData(0,"first level:\n=sum(label)",[]);
        let data1= new LeafData(1,"second level:\n=count(label)",[]);
        let data2= new LeafData(2,"third level:\n#label:10.5",[]);
        let data3= new LeafData(3,"fourth level:\n#label:20.5",[]);
        let data4= new LeafData(4,"fifth level:\n#label:30.5",[]);

        data0.children.push(data1);
        data1.children.push(data2);
        data2.children.push(data3);
        data3.children.push(data4);

        const wrapper=mount(<PreviewSentence leafdata={data0}/>);
        //console.log(wrapper.debug());
        expect(wrapper.find('.PreviewSentence-Paragraph .description').at(0).text()).toEqual(expect.stringContaining("61.5"));
        expect(wrapper.find('.PreviewSentence-Paragraph .description').at(1).text()).toEqual(expect.stringContaining("3"));
        expect(wrapper.find('.PreviewSentence-Paragraph .description').at(2).text()).toEqual(expect.stringContaining("10.5"));
        expect(wrapper.find('.PreviewSentence-Paragraph .description').at(3).text()).toEqual(expect.stringContaining("20.5"));
        expect(wrapper.find('.PreviewSentence-Paragraph .description').at(4).text()).toEqual(expect.stringContaining("30.5"));
    });

});


