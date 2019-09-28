import LeafData from "../src/LeafData";
import StateProvider from "../src/StateProvider";

describe('A suite', function() {

    it('should add root properly', function(){
        let tested = StateProvider.addRoot(null, 0, 0)
        expect(tested.root).toEqual(new LeafData(0,"",[]));
    })

    it('should add children properly', function(){
        let tested = StateProvider.addRoot(null, 0, 0)
        tested=StateProvider.addChild(tested.root,0);

        let expected1=new LeafData(0,"",[]);
        let expected2=new LeafData(1,"",[]);
        expected1.children.push(expected2);
        expect(tested.root).toEqual(expected1);
    })



});
