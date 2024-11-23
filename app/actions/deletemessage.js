'use server'

import connectDB from "@/config/database"
import Message from "@/models/Messages"
import { getSessionUser } from "@/utils/getSessionuser"
import { revalidatePath } from "next/cache"



async function deleteMessage(messageId)
{   
    connectDB()
    
    const sessionUser= await getSessionUser();
    
    const {userId}= sessionUser

    if(!sessionUser || !sessionUser.userId)
    {
        throw new Error('User ID is required')
    }


    const message = await Message.findById(messageId)

    if(message.recipient.toString() !== userId) throw new Error('Unauthorized');

    await message.deleteOne();

    revalidatePath('/', 'layout')

    

}

export default deleteMessage;