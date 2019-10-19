import LeafData from "./LeafData";
import Property from "./Property";

export default class Deserializer
{
    constructor(text)
    {
        this.text=text;
        this.data=this.convertInitialData(this.text);
    }

    convertInitialData(givenData)
    {
        if (givenData==null)
        {
            return null;
        }
        else
        {
            if(typeof(givenData)=="string")
            {
                let parsedData=JSON.parse(givenData);
                let root;
                let property;
                if("root" in parsedData)
                {
                    root=this.convertToLeafData(parsedData.root);
                }
                else
                {
                    root=new LeafData();
                }
                if("property" in parsedData)
                {
                    property=this.convertToProperty(parsedData.property);
                }
                else
                {
                    property=new Property();
                }

                return {root: root, property: property};
            }
            else
            {
                return null
            }
        }
    }

    convertToLeafData(data)
    {
        let out=new LeafData(data.id, data.description, [], data.imgs, data.color);

        for(let child of data.children)
        {
            out.children.push(this.convertToLeafData(child));
        }
        return out;
    }

    convertToProperty(data)
    {
        return Property.getNewObject(data);
    }
}