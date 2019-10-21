export default class Property{
    constructor(focusId=0, isReadOnly=Property.readOnlyLevel().canEdit)
    {
        this.focusId=focusId;
        this.isReadOnly=isReadOnly;
    }

    static readOnlyLevel()
    {
        return {
            canEdit:0,
            softReadOnly:1,
            hardReadOnly:2
        }
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