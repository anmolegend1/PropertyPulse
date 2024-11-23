'use server'


import connectDB from "@/config/database"
import User from "@/models/User"
import { getSessionUser } from "@/utils/getSessionuser"
import { revalidatePath } from "next/cache"

async function bookmarkProperty(propertyId) {
    await connectDB();  

    const sessionUser = await getSessionUser();

    if(!sessionUser || !sessionUser.userId) {
        throw new Error('User ID is required')
    }

    const { userId } = sessionUser;

    const user = await User.findById(userId);

    let isBookmarked = user.bookmark.includes(propertyId);

    
    let message;

    if(isBookmarked) {

        //if already bookmarked, remove bookmark

        user.bookmark.pull(propertyId);

        message = 'Property removed from bookmarks.';

        isBookmarked = false;
    }
     else {

        //if not bookmarked, add bookmark

        user.bookmark.push(propertyId);

        message = 'Property added to bookmarks.';

        isBookmarked = true;
    }

    await user.save();

    revalidatePath('/property/saved','page');

    return { message, isBookmarked };
    
}

export default bookmarkProperty