import PropertyEditForm from "@/components/PropertyEditForm";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import { convertToSerializeobject } from "@/utils/convertoObject";



const PropertyEditPage = async ({params}) => {

    connectDB();

    const PropertyDoc = await Property.findById(params.id).lean();

    const property = convertToSerializeobject(PropertyDoc);

    if(!property)
    {
        return(
            <h1 className='text-center text-2xl font-bold mt-10'>Property Not Found</h1>
        )
    }



    return (<section>
        <div className="container m-auto max-w-2xl py-24">
            <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
                
                <PropertyEditForm property={property} />
            </div>
        </div>
    </section> );
}
 
export default PropertyEditPage;