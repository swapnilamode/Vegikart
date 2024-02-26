import React from "react";
import { Link } from "react-router-dom";

const HomeCard = ({name, image, category, price,id}) => {
    return (
        <div className="bg-white shadow-lg p-2 rounded min w-[180px] cursor-pointer">
            {
                name ? (<>
                <Link to={`/menu/${id}`} onClick={() => window.scrollTo({top:"0", behavior : "smooth"})}>
                <div className="w-40 min-h-[120px]">
                <img src={image} className="h-full w-full"></img>
                </div>
                <h3 className="font-semibold text-slate-600 text-center capitalize text-lg">{name}</h3>
                <p className="text-center text-slate-500 font-medium">{category}</p>
                <p className="text-center font-bold"><span className="text-red-500">₹</span><span>{price}</span></p>
                </Link>
                </>
            ) : (
                <div className="flex justify-center items-center min-h-full">
                Loading...
                </div>
            )
            
            
        }
        </div>        
    )
}
export default HomeCard