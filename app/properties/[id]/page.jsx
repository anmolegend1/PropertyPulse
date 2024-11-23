import connectDB from "@/config/database";
import Property from "@/models/Property";
import Propertyheaderimage from "@/components/Propertyheaderimage";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import Propertydetails from "@/components/Propertydetails";
import PropertyImages from "@/components/PropertyImages";
import { convertToSerializeobject } from "@/utils/convertoObject";
import Bookmarkbutton from "@/components/BookmarkButton";
import Sharebutton from "@/components/Sharebutton";
import PropertyContactForm from "@/components/PropertyContactForm";

const Propertypage = async ({params}) => {

    await connectDB();
    const propertydocs = await Property.findById(params.id).lean();
    const property= convertToSerializeobject(propertydocs)

    if(!property)
    {
      return(
        <h1 className='text-center text-2xl font-bold mt-10'>
          Property Not Found
        </h1>
      )
    }

    return ( 
       <>
        <Propertyheaderimage image={property.images[0]}/>   
        <section>
      <div className="container m-auto py-6 px-6">
        <Link
          href="/properties"
          className="text-blue-500 hover:text-blue-600 flex items-center"
        >
        <FaArrowLeft className="mr-2" /> Back to Properties
        </Link>
        </div>
        </section>
        <section className="bg-blue-50">
        <div className="container m-auto py-10 px-6">
        <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
        <Propertydetails property={property} />
        <aside className="space-y-4">
        <Bookmarkbutton property={property} />
        <Sharebutton property={property}/>
        <PropertyContactForm property={property}/>
        </aside>
        </div>
        </div>
        </section>
        <PropertyImages images={property.images} />
       </>         
    );
}
 
export default Propertypage;