'use server'
import cloudinary from "@/config/cloudinary"
import connectDB from "@/config/database"
import Property from "@/models/Property"
import { getSessionUser } from "@/utils/getSessionuser"
import { revalidatePath } from "next/cache"

async function deleteProperty(propertyId)
{
    const sessionUser= await getSessionUser();
    
    const {userId}= sessionUser

    if(!sessionUser || !sessionUser.userId)
    {
        throw new Error('User ID is required')
    }


    const property = await Property.findById(propertyId)

    if(!property) throw new Error('Property Not found');

    //verify Ownership
    if(property.owner.toString() !== userId)
    {
        throw new Error('Unauthorized')

    }
    
    //extract Public ID from Image URLS

    const publicIDs= property.images.map((imageurl)=>{
        const parts = imageurl.split('/');
        return parts.at(-1).split('.').at(0)
    })

    // delete images from cloudinary

    if(publicIDs.length > 0)
    {
        for(let publicID of publicIDs)
        {
            await cloudinary.uploader.destroy('PropertyPulse/'+ publicID)
        }
    }

    
    await property.deleteOne();

    revalidatePath('/', 'layout')

    

}

export default deleteProperty;