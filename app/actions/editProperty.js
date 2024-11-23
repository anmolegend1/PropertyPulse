'use server'
import connectDB from "@/config/database"
import Property from "@/models/Property"
import { getSessionUser } from "@/utils/getSessionuser"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

async function updateProperty(propertyId,formData)
{
    await connectDB();
    const sessionuser = await getSessionUser();

    if(!sessionuser || !sessionuser.userId)
    {
        throw new Error('User ID is required')
    }

    const {userId} = sessionuser;

    const existingProperty = await Property.findById(propertyId);

    //verify ownership
    if(existingProperty.owner.toString() !== userId)
    {
        throw new Error('Unauthorized: Current User does not own this property to update it.');
    }

    if(!existingProperty)
    {
        throw new Error('Property Not found')
    }
    const propertydata = {
        owner: userId,
        type: formData.get('type'),
        name: formData.get('name'),
        description: formData.get('description'),
        location: {
            street: formData.get('location.street'),
            city: formData.get('location.city'),
            state: formData.get('location.state'),
            zipcode: formData.get('location.zipcode')
        },
        beds: formData.get('beds'),
        baths: formData.get('baths'),
        square_feet: formData.get('square_feet'),
        type: formData.get('type'),
        amenities: formData.getAll('amenities'),
        rates:{
            nightly: formData.get('rates.nightly'),
            weekly: formData.get('rates.weekly'),
            monthly: formData.get('rates.monthly')
        },
        seller_info:{
            name: formData.get('seller_info.name'),
            email: formData.get('seller_info.email'),
            phone: formData.get('seller_info.phone'),

        },
       
    }

    const updatedProperty = await Property.findByIdAndUpdate(propertyId,propertydata,{new: true});

    revalidatePath('/','layout');

    redirect(`/properties/${updatedProperty._id}`); 
}

export default updateProperty