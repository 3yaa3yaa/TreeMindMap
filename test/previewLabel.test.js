import PreviewLabels from "../src/PreviewLabels";
import LeafData from "../src/LeafData";
import React from 'react';
import { shallow, mount, render } from 'enzyme';


describe('A suite', function() {

    it('should calculate numbers properly', function(){

        const sel = id => `[testkey="${id}"]`;
        let data0= new LeafData(0,"first level:\n=sum()",[]);
        let data1= new LeafData(1,"second level:\n=count()",[]);
        let data2= new LeafData(2,"third level:\n#10.5",[]);
        let data3= new LeafData(3,"fourth level:\n#20.5",[]);
        let data4= new LeafData(4,"fifth level:\n#30.5",[]);

        data0.children.push(data1);
        data1.children.push(data2);
        data2.children.push(data3);
        data3.children.push(data4);

        const wrapper=mount(<PreviewLabels leafdata={data0}/>);
        expect(wrapper.exists(sel('hasnodata'))).toEqual(true);
    });


    it('should recognize label exists properly', function(){
        let data0= new LeafData(0,"first level",[]);
        let data1= new LeafData(1,"second level",[]);
        let data2= new LeafData(2,"third level:\n#label1",[]);
        let data3= new LeafData(3,"fourth level:\n#label2",[]);
        let data4= new LeafData(4,"fifth level:\n#label3",[]);

        data0.children.push(data1);
        data1.children.push(data2);
        data2.children.push(data3);
        data3.children.push(data4);


        const sel = id => `[testkey="${id}"]`;
        const wrapper=mount(<PreviewLabels leafdata={data0}/>);
        //console.log(wrapper.debug());

        expect(wrapper.exists(sel('hasnodata'))).toEqual(false);
        expect(wrapper.find(sel('val-0')).at(0).text()).toEqual(expect.stringContaining("label1"));
        //expect(wrapper.exists(sel('val-0-0'))).toEqual(true);
        expect(wrapper.find(sel('val-0')).find('.description').text()).toEqual('third level:\nlabel1');


        expect(wrapper.find(sel('val-1')).at(0).text()).toEqual(expect.stringContaining("label2"));
        expect(wrapper.find(sel('val-1')).find('.description').text()).toEqual('fourth level:\nlabel2');


        expect(wrapper.find(sel('val-2')).at(0).text()).toEqual(expect.stringContaining("label3"));
        expect(wrapper.find(sel('val-2')).find('.description').text()).toEqual('fifth level:\nlabel3');

        expect(wrapper.exists(sel('val-3'))).toEqual(false);

    });

    it('should calculate label values properly', function(){
        let data0= new LeafData(0,"first level:\n=sum(label)",[]);
        let data1= new LeafData(1,"second level:\n=count(label)",[]);
        let data2= new LeafData(2,"third level:\n#label:10.5",[]);
        let data3= new LeafData(3,"fourth level:\n#label:20.5",[]);
        let data4= new LeafData(4,"fifth level:\n#label:30.5",[]);

        data0.children.push(data1);
        data1.children.push(data2);
        data2.children.push(data3);
        data3.children.push(data4);


        const sel = id => `[testkey="${id}"]`;
        const wrapper=mount(<PreviewLabels leafdata={data0}/>);
        //console.log(wrapper.debug());
        expect(wrapper.exists(sel('hasnodata'))).toEqual(false);
        expect(wrapper.find(sel('val-0')).at(0).text()).toEqual(expect.stringContaining("label"));

        expect(wrapper.find(sel('val-0')).find('.description').at(0).text()).toEqual('third level:\nlabel:10.5');
        expect(wrapper.find(sel('val-0')).find('.description').at(1).text()).toEqual('fourth level:\nlabel:20.5');
        expect(wrapper.find(sel('val-0')).find('.description').at(2).text()).toEqual('fifth level:\nlabel:30.5');

        expect(wrapper.exists(sel('val-1'))).toEqual(false);

    });

});


