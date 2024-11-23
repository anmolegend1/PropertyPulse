'use client'

import { useState, useEffect } from "react";
import { setDefaults, fromAddress } from "react-geocode";
import Map, { Marker } from "react-map-gl";
import Image from "next/image";
import pin from '@/assets/images/pin.svg';
import Spinner from "./Spinner";
import 'mapbox-gl/dist/mapbox-gl.css'


const PropertyMap = ({property}) => {

    const [lat,setLat] = useState(null);
    const [lng,setLng] = useState(null);
    const [viewport,setViewport] = useState({
        latitude: 0,
        longitude: 0,
        zoom: 12,
        width: "100%",
        height: "500px",

    });

    const [loading, setLoading] = useState(true);
    const [geocodeerror, setgeocodeerror] = useState(false);

    setDefaults({
        key: process.env.NEXT_PUBLIC_GOOGLE_GEOCODING_API_KEY,
        language: "en",
        region: "in",

    })

    useEffect(() => {
        const fetchCoordinates = async () => {
            try {
                const res= await fromAddress(`${property.location.street}, ${property.location.city}, ${property.location.state}, ${property.location.zipcode}`);
                //check geocode error
                if(res.length === 0){ 
                    setgeocodeerror(true);
                    return
                }
                //set coordinates
              const {lat,lng} = res.results[0].geometry.location;
              setLat(lat);
              setLng(lng);
              setViewport({
                ...viewport,
                latitude: lat,
                longitude: lng,
              })
            }
        
             catch (error) {
                setgeocodeerror(true);
                setLoading(false);
            }
            finally {
                setLoading(false);
            }
        }

        fetchCoordinates();
    }, []);

    if(loading) {
        return <Spinner/>
    }

    if(geocodeerror) {
        return <div className="text-xl">Geocode Error: No location Data Found</div>
    }

    return (
       !loading && (<Map
       mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        mapLib={import('mapbox-gl')}
        initialViewState={{
          longitude: lng,
          latitude: lat,
          zoom: 15
        }}
        style={{width: '100%' , height: 500}}
        mapStyle="mapbox://styles/mapbox/streets-v9">
        <Marker longitude={lng} latitude={lat} anchor="bottom">
            <Image src={pin} alt="location" width={40} height={40} />
        </Marker>
         </Map>
            ));
    
}
 
export default PropertyMap;