import Link from "next/link";
import PropertyCard from "@/components/PropertyCard";
import Propertysearchform from "@/components/PropertySearchForm";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import { convertToSerializeobject } from "@/utils/convertoObject";
import { FaArrowAltCircleLeft } from "react-icons/fa";



const SeearchResults = async ({ searchParams: { location, propertyType }}) => {
    
    await connectDB();

    const locationpattern = new RegExp(location, 'i')

    let query = {
        $or:[
            {name: locationpattern},
            {description: locationpattern},
            {'location.street': locationpattern},
            {'location.city': locationpattern},
            {'location.state': locationpattern},
            {'location.zipcode': locationpattern},
        ]
    };
    if(propertyType && propertyType !== "All")
    {
        const typepattern = new RegExp(propertyType, 'i')
        query.type = typepattern;
    }

    const propertiesQueryResults = await Property.find(query).lean();

    const properties = convertToSerializeobject(propertiesQueryResults);



    return (
        <>
        <section className="bg-blue-700 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
            <Propertysearchform/>
        </div>
        </section>
        <section className="px-4 py-6">
            <div className="container-xl lg:container m-auto px-4 py-6">
                <Link href='/properties' className="flex items-center text-blue-500 hover:text-blue-600">
                <FaArrowAltCircleLeft className="mr-2 mb-1"/> 
                Back to Properties</Link>
                <h1 className="text-2xl mb-4">Search Results</h1>
                {
                    properties.length === 0 ? (
                        <p>No Properties Found</p>
                    ):(
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {
                                properties.map((property) => (
                                    <PropertyCard key={property._id} property={property}/>
                                ))
                            }
                        </div>
                    )
                }
            </div>
        </section>
        </>
    );
}
 
export default SeearchResults;