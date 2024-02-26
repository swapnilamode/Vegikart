import React from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import { deleteCartItem, increaseQty, decreaseQty } from "../redux/productSlice";

const CartProduct = ({id, name,image, category, qty,price,total}) =>
{
    const dispatch = useDispatch()
    return(
        <div className="bg-slate-200 p-2 flex gap-4 rounded border border-slate-300">
            <div className="p-3 bg-white rounded overflow-hidden">
                <img src={image} className="h-28 w-40 object-cover"/>
            </div>
                <div className="flex flex-col gap-1 w-full">
                <div className="flex justify-between">
                <h3 className="font-semibold text-slate-600 capitalize text-lg md:text-xl">{name}</h3>
                <div className="cursor-pointer hover:text-red-500" onClick={() => dispatch(deleteCartItem(id))}>
                <MdDelete />
                </div>
                </div>
                <p className=" text-slate-500 font-medium">{category}</p>
                <p className=" font-bold md:text-base"><span className="text-red-500">₹</span><span>{price}</span></p>
                <div className="flex justify-between">
                <div className="flex gap-3 items-center">
                <button className=" bg-slate-300 py-2 mt-2 p-2 rounded hover:bg-slate-400" onClick={() => dispatch(increaseQty(id))}><FaPlus/></button>
                <p className="font-semibold p-2">{qty}</p>
                <button className=" bg-slate-300 py-2 mt-2 p-2 rounded hover:bg-slate-400"onClick={() => dispatch(decreaseQty(id))}><FaMinus/></button>
                </div>
                    <div className="flex items-center gap-2 font-bold">
                        <p>Total : </p>
                        <p><span className="text-red-500">₹</span>{total}</p>
                    </div>
                </div>
                </div>
        </div>
    )
}

export default CartProduct