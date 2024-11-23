export function convertToSerializeobject(leanDocument)
{
    for(const key in leanDocument){
        if(leanDocument[key].toJSON && leanDocument[key].toString)
        {
            leanDocument[key]= leanDocument[key].toString();
        }
    }
    return leanDocument;
}