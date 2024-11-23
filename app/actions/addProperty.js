'use server'
import cloudinary from "@/config/cloudinary"
import connectDB from "@/config/database"
import Property from "@/models/Property"
import { getSessionUser } from "@/utils/getSessionuser"
import { revalidatePath } from "next/cache"




async function addProperty(formData) {

    await connectDB();
    const sessionuser = await getSessionUser();

    if(!sessionuser || !sessionuser.userId)
    {
        throw new Error('User ID is required')
    }

    const {userId} = sessionuser;

    //access all your values from amenities and images
    const amenities = formData.getAll('amenities')
    const images = formData
        .getAll('images')
        .filter((image)=>image.name !== '')


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
        amenities,
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
    const imageurls=[];
    for(const imageFile of images)
    {
        const imagebuffer = await imageFile.arrayBuffer();
        const imageArray = Array.from(new Uint8Array(imagebuffer));
        const imageData = Buffer.from(imageArray);

        //convert to base64
        const imageBase64 = imageData.toString('base64');

        //make request to cloudinary
        const result = await cloudinary.uploader.upload(`data:image/png;base64,${imageBase64}`,
            {
                folder: 'PropertyPulse'
            }
        )

        imageurls.push(result.secure_url);
    }
    propertydata.images = imageurls;

    const newproperty = new Property(propertydata)
    await newproperty.save();

    revalidatePath('/','layout');

}

export default addProperty