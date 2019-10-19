export default class Property{
    constructor(focusId=0, isReadOnly=false)
    {
        this.focusId=focusId;
        this.isReadOnly=isReadOnly;
    }

    static getNewObject(rawdata)
    {
        try{
            return new Property(rawdata.focusId, rawdata.isReadOnly)
        }catch(e)
        {
            console.error("failed to generate new property object :" + e.message)
        }
    }



}