import Link from "next/link";

const Infobox = ({heading,backgroundColor='bg-gray-100',textColor='text-gray-800',children, buttonInfo}) => {
    return (
        <div className={`${backgroundColor} p-6 rounded-lg shadow-md`}>
              <h2 className={`text-2xl font-bold ${textColor}`}>{heading}</h2>
              <p className={`${textColor} mt-2 mb-4`}>
               {children}
              </p>
              <Link
                href={buttonInfo.link}
                className={`inline-block ${buttonInfo.backgroundColor} text-white rounded-lg px-4 py-2 hover:bg-gray-700`}
              >
                {buttonInfo.text}
              </Link>
            </div>
    );
}
 
export default Infobox;