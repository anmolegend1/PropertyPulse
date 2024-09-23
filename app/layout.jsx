import '@/assets/styles/globals.css'

export const metadata={
    title:'Property Kings',
    keywords: 'rental,propert,realestate, estate',
    description:'Find the perfect rental property',
};

const Mainlayout = ({children}) => {
 
    return ( <html>
        <body>
            <main>
                {children}
            </main>
        </body>
    </html> );
}
 
export default Mainlayout;


//This is the entry point of Next js application