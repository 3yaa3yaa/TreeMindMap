import Deserializer from '../src/Deserializer'
import LeafData from "../src/LeafData";

describe('A suite', function() {


    it('should deserialize properly', function(){
        let test ="{\"root\":{\"id\":0,\"description\":\"\",\"children\":[{\"id\":1,\"description\":\"\",\"children\":[{\"id\":2,\"description\":\"\",\"children\":[],\"imgs\":[],\"color\":\"silver\"},{\"id\":3,\"description\":\"\",\"children\":[],\"imgs\":[],\"color\":\"silver\"}],\"imgs\":[],\"color\":\"silver\"}],\"imgs\":[],\"color\":\"silver\"},\"focusId\":3}"
        let expected0=new LeafData(0);
        let expected1=new LeafData(1);
        let expected2=new LeafData(2);
        let expected3=new LeafData(3);
        expected0.children.push(expected1);
        expected1.children.push(expected2);
        expected1.children.push(expected3);

        let deserialized= new Deserializer(test);

        expect(deserialized.data.root instanceof LeafData).toBe(true);
        expect(deserialized.data.root).toEqual(expected0);
    })

});
