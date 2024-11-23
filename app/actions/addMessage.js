'use server'

import connectDB from "@/config/database"
import Message from "@/models/Messages"
import { getSessionUser } from "@/utils/getSessionuser"
import { revalidatePath } from "next/cache"


async function addMessage( previousState ,formData) {

    await connectDB();
    const sessionuser = await getSessionUser();

    if(!sessionuser || !sessionuser.userId)
    {
        throw new Error('User ID is required')
    }

    const {userId} = sessionuser;

    const recipient= formData.get('recipient');

    if(userId === recipient)
    {
        return {error: "You cannot send a message to yourself."}
    }

    const newMessage = new Message({
        sender: userId,
        recipient,
        property: formData.get('property'),
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        message: formData.get('message')
    })

    await newMessage.save();

    return {submitted: true};

}

export default addMessage