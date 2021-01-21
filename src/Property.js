export default class Property{
    constructor(focusId=0,
                isReadOnly=Property.readOnlyLevel().canEdit,
                previewMode=Property.previewMode().none,
                initialTreeHash="")
    {
        this.focusId=focusId;
        this.isReadOnly=isReadOnly;
        this.previewMode=previewMode;
        this.initialTreeHash=initialTreeHash;
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
            return new Property(rawdata.focusId, rawdata.isReadOnly, rawdata.previewMode, rawdata.initialTreeHash)
        }catch(e)
        {
            return new Property();
            console.error("failed to generate new property object :" + e.message)
        }
    }



}