import LeafData from "./LeafData";

export default class Deserializer
{
    constructor(text)
    {
        this.text=text;
        this.data=this.convertIntialData(this.text);
    }

    convertIntialData(givenData)
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
                return {root: this.convertToLeafData(parsedData.root), focusId:parsedData.focusId};
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

}