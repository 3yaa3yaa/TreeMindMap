export default class Property{
    constructor(focusId=0,
                isReadOnly=Property.readOnlyLevel().canEdit,
                previewMode=Property.previewMode().none)
    {
        this.focusId=focusId;
        this.isReadOnly=isReadOnly;
        this.previewMode=previewMode;
    }

    static readOnlyLevel()
    {
        return {
            canEdit:0,
            softReadOnly:1,
            hardReadOnly:2
        }
    }

    static previewMode()
    {
        return {
            none:0,
            Tree:1,
            List:2,
            Label:3,
            Sentence:4
        }
    }


    static getNewObject(rawdata)
    {
        try{
            return new Property(rawdata.focusId, rawdata.isReadOnly, rawdata.previewMode)
        }catch(e)
        {
            return new Property();
            console.error("failed to generate new property object :" + e.message)
        }
    }



}