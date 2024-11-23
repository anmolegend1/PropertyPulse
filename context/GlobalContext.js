'use client'

import { createContext , useContext , useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import getUnreadMessageCount from "@/app/actions/getUnreadMessageCount";

//Create Context
const GlobalContext = createContext();

//Create Context Provider
export const GlobalContextProvider = ({children}) => {
    const [unreadCount, setUnreadCount] = useState(0);

    useEffect(() => {
        const fetchUnreadMessageCount = async () => {
          const count = await getUnreadMessageCount();
          setUnreadCount(count);
        };
    
        fetchUnreadMessageCount();
      }, []);

    return (
    <GlobalContext.Provider value={{unreadCount , setUnreadCount}} >{children}</GlobalContext.Provider>)
}

export function useGlobalContext() {
    return useContext(GlobalContext);
}