import React from "react";
import {useDispatch} from "react-redux";
import { Link } from "react-router-dom";
import {addCartItem} from "../redux/productSlice";

const CardFeature = ({name,image,price,category,loading,id}) => {
    const dispatch = useDispatch()
    const handleAddCartProduct = (e) => {
        e.stopPropagation();
        dispatch(addCartItem({
            _id : id,
            name : name,
            price : price,
            category : category,
            image : image
        }))
    }
    return (
        <div className="w-full min-w-[280px] max-w-[200px] bg-white hover:shadow-lg drop-shadow-lg py-5 px-5 cursor-pointer flex-col">
            {
                image ? <>
                <Link to={`/menu/${id}`} onClick={() => window.scrollTo({top:"0", behavior : "smooth"})}>
                <div className="h-29 flex flex-col justify-center item-center">
                <img src={image} className="h-full"></img>
                </div>
                <h3 className="font-semibold text-slate-600 capitalize text-lg mt-4 whitespace-nowrap overflow-hidden">{name}</h3>
                    <p className=" text-slate-500 font-medium">{category}
                </p>
                <p className="font-bold">
                    <span className="text-red-500 font-medium">₹</span>
                    <span>{price}</span>
                </p>
                </Link>
                <button className="w-full bg-yellow-500 py-1 mt-2 p-2 rounded hover:bg-yellow-600"onClick={handleAddCartProduct}>Add Cart</button>
                
                </>
              :
                (<div className="min-h-[250px] flex justify-center items-center">
                    <p>{loading}</p>
                </div>
                
            )}
            

        </div>
    )
}

export default CardFeature