import '@/assets/styles/globals.css'
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import connectDB from '@/config/database';
import Authprovider from '@/components/Authprovider';
import { Toaster } from 'react-hot-toast';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GlobalContextProvider } from '@/context/GlobalContext';
import 'photoswipe/dist/photoswipe.css'

export const metadata={
    title:'Property Kings',
    keywords: 'rental,propert,realestate, estate',
    description:'Find the perfect rental property',
};

const Mainlayout = ({children}) => {
    connectDB();
    return ( <Authprovider>
        <GlobalContextProvider>
            <html>
        <body>
            <Navbar/>
            <main>
                <Toaster position="top-center"/>
                {children}
            </main>
            <Footer/>
            <ToastContainer/>
        </body>
    </html> 
        </GlobalContextProvider>
    </Authprovider>);
}
 
export default Mainlayout;


//This is the entry point of Next js application