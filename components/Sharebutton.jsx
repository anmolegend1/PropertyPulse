'use client'
import { FacebookShareButton, TwitterShareButton, EmailShareButton, WhatsappShareButton , FacebookIcon, TwitterIcon , EmailIcon, WhatsappIcon  } from "react-share";


const Sharebutton = ({property}) => {

    const shareUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/properties/${property._id}`

    return ( 
        <>
          <h3 className="text-xl font-bold text-center pt-2">
            Share This Property :
          </h3>
          <div className="flex gap-3 justify-center pb-5">
            <FacebookShareButton url={shareUrl} quote={property.name} >
              <FacebookIcon size={40} round={true}/>
            </FacebookShareButton>
            <TwitterShareButton url={shareUrl} title={property.name} >
              <TwitterIcon size={40} round={true}/>
            </TwitterShareButton>
            <EmailShareButton url={shareUrl} subject={property.name} body={`Check out this property: ${shareUrl}`} >
              <EmailIcon size={40} round={true}/>
            </EmailShareButton>
            <WhatsappShareButton url={shareUrl} title={property.name} >
              <WhatsappIcon size={40} round={true}/>
            </WhatsappShareButton>
          </div>
        </>
    );
}
 
export default Sharebutton;   