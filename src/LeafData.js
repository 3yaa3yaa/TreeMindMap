export default class LeafData{
    constructor(id, description, children)
    {
        this.id=0;
        this.description="";
        this.children=[];

        this.id=id;
        this.description=description;
        this.children=children;
    }
    
    getLeaf(id)
    {
        if(this.id===id)
        {
            return this;
        }
        else
        {
            for(let leaf of this.children)
            {
                let child=leaf.getLeaf(id)
                if(child!=null)
                {
                    return child;
                }
            }
        }
        return null;
    }

    getParent(id)
    {
        if(this.children.find(l => l.id===id) != undefined)
        {
            return this;
        }
        else
        {
            for(let l of this.children)
            {
                let parent=l.getParent(id);
                if(parent!=null)
                {
                    return parent;
                }
            }
        }
        return null;
    }


    getSiblings(id)
    {
        if(this.children.find(l => l.id===id) != undefined)
        {
            return this.children;
        }
        else
        {
            for(let l of this.children)
            {
                let brothers=l.getSiblings(id);
                if(brothers.length>0)
                {
                    return child;
                }
            }
        }
        return [];
    }

    getElderBrother(id)
    {
        let brothers=this.getSiblings(id);
        let elderbrother=null;
        for(let brother of brothers)
        {
            if(brother.id===id){return elderbrother};
            elderbrother=brother;
        }
        return null;
    }

    isLastRecord(id)
    {
        if(this.getYoungerBrother(id)===null)
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    getYoungerBrother(id)
    {
        let brothers=this.getSiblings(id);
        let wasMe=false;
        for(let brother of brothers)
        {
            if(wasMe){return brother};
            if(brother.id===id){wasMe=true};
        }
        return null;
    }



    getChildren( id)
    {
        let l = this.getLeaf(id);
        if(l===null)
        {
            return [];
        }
        else
        {
            return l.children;
        }
    }



    getAllChildren( id)
    {
        let out=[];
        let children = this.getChildren( id)
        if(children!=null)
        {
            for(let child of children)
            {
                out.push(child);
                let grandchildren=this.getAllChildren(child.id);
                if(grandchildren.length>0)
                {
                    out=out.concat(grandchildren)
                }
            }
        }
        return out;
    }

    filterAndSortLeafs(leafs, parentid)
    {
        let out=[];
        if(Array.isArray(leafs) && leafs.length>0)
        {
            let bigbrother = leafs.filter((leaf)=>{return (leaf.parentid==parentid && leaf.elderbrotherid==0)})[0];
            StateProvider.recursivelyGetSiblings(leafs, bigbrother, out);
            return out;
        }
        else
        {
            return null;
        }
    }

    getNewId()
    {
        return this.getLatestId()+1;
    }

    getLatestId()
    {
        let children=this.getAllChildren(this.id)
        if(children.length>0)
        {
            return children.sort((a,b)=>{return b-a})[0].id;
        }
        else
        {
            return 0;
        }
    }




    sumLabelsOfChildren(id, label)
    {
        let children=this.getAllChildren( id)
        let array=[];
        if(children===null){return array};

        for(let child of children)
        {
            let regexp;
            if(label==="")
            {regexp= new RegExp('#([^ ]+)( |$)','g')}
            else
            {regexp= new RegExp('#' + label+ ':([^ ]+)( |$)','g')};

            array=array.concat([...child.description.matchAll(regexp)].map(item=>{return item[1]}));
        }

        let reducer=(acc, cur)=>{
            if(isFinite(cur))
            {
                return acc+parseFloat(cur);
            }
            else
            {
                return acc+0;
            }
        };
        return array.reduce(reducer,0);
    }

     countLabelsOfChildren(id, label)
    {
        let children=this.getAllChildren(id)
        let array=[];
        if(children!=null)
        {
            for(let child of children)
            {
                let regexp;
                if(label==="")
                {regexp= new RegExp('#([^ ]+)( |$)','g')}
                else
                {regexp= new RegExp('#'+ label+':([^ ]+)( |$)','g')};

                array=array.concat([...child.description.matchAll(regexp)].map(item=>{return item[1]}).filter((item)=>{return isFinite(item)}));
            }
        }
        return array.length;
    }




}