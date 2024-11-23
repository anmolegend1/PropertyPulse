'use client'

import { useState } from "react";
import { toast } from "react-toastify";
import markMessageAsRead from "@/app/actions/markemessageAsRead";
import deleteMessage from "@/app/actions/deletemessage";
import { useGlobalContext } from "@/context/GlobalContext";


const MessageCard = ({message}) => {

    const {setUnreadCount} = useGlobalContext();

    const [isRead, setIsRead] = useState(message.read);
    const [isDelete, setIsDeleted] = useState(false);

    const handleReadclick = async () => {    
        const read = await markMessageAsRead(message._id);
        setIsRead(read)
        setUnreadCount((prevCount)=>{
            read ? prevCount - 1 : prevCount + 1
        })
        toast.success(`${read ? 'Marked as Read' : 'Marked as New'}`);
    }

    const handleDeleteclick = async () => {    
        await deleteMessage(message._id);
        setIsDeleted(true);
        setUnreadCount((prevCount)=>{
            isRead ? prevCount : prevCount - 1
        })
        toast.success('Message Deleted');
    }

    if(isDelete) return <p>Deleted Message</p>

    return ( <div className="relative bg-white p-4 rounded-md shadow-md border border-gray-200" >
    {
        !isRead &&
        <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full" >New</div>
    }
    <h2 className="text-xl mb-4">
        <span className="font-bold" > Property Inquiry</span>{' '}{message.property.name}
    </h2>
    <p className="text-gray-700">{message.message}</p>

    <ul className="mt-4" >
        <li>
            <strong>Reply Email:</strong>{' '}
            <a href={`mailto:${message.email}`} className="text-blue-500">{message.email}  </a>
        </li>
        <li>
            <strong>Reply Phone:</strong>{' '}
            <a href={`tel:${message.phone}`} className="text-blue-500">{message.phone}  </a>
        </li>
        <li>
            <strong>Recieved:</strong>{' '}
           {new Date(message.createdAt).toLocaleString()}
        </li>
    </ul>
    <button className="mt-4 mr-3 bg-blue-500 text-white py-1 px-3 rounded-md" onClick={handleReadclick} > {isRead ? 'Mark as New' : 'Mark as Read' }</button>
    <button className="mt-4 mr-3 bg-red-500 text-white py-1 px-3 rounded-md" onClick={handleDeleteclick}> Delete</button>
    
    </div> );
}           
 
export default MessageCard;