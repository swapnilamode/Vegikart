import React, { useState } from "react";
import { BiCloudUpload } from "react-icons/bi";
import { imagetobase64 } from "../utility/imagetobase64";
import toast from "react-hot-toast";

const Newproduct = () =>
{
    const [data, setData] = useState({
        name : "",
        category : "",
        image : "",
        qty: "",
        price : "",
        description : ""
    })

    const handleOnChange = (e) => {
        const {name, value} = e.target

        setData((prev) => {
            return {
                ...prev,
                [name] : value  
            }
        })
    }

    const uploadImage = async(e) => {
        const data = await imagetobase64(e.target.files[0])
        // console.log(data)
        setData((prev) => {
            return{
                ...prev,
                image : data
            }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(data)

        const {name, image, category, qty, price} = data

        if(name && image && category && qty && price){
            const fetchdata = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/uploadProduct`, {
                method : "POST",
                headers : {
                    "content-type" : "application/json"
                },
                body : JSON.stringify(data)
            })

            const fetchRes = await fetchdata.json()
            console.log(fetchRes)
            toast(fetchRes.message)

            setData(() => {
                return {
                    name : "",
                    category : "",
                    image : "",
                    qty : "",
                    price : "",
                    description : ""
                }
            })
            }else{
                toast("Please fill all the Fields")
            }
        }
       
     return(
        <div className="p-10">
            <form className="m-auto w-full max-w-md shadow flex flex-col p-3 bg-white"onSubmit={handleSubmit}>
                <label htmlFor="name">Name</label>
                <input type="text" name="name" className="bg-slate-200 p-1 my-1" onChange={handleOnChange} value={data.name}></input>

                <label htmlFor="category">Category</label>
                <select className="bg-slate-200 p-1 my-1" id="category" name="category" onChange={handleOnChange} value={data.category}>
                    <option>Select</option>
                    <option>Fruits</option>
                    <option>Vegetables</option>
                    <option>Rice</option>
                </select>

                <label htmlFor="image">Image
                <div className="h-60 w-full bg-slate-200 my-1 rounded flex items-center justify-center cursor-pointer">
                    {
                        data.image ? <img src={data.image}className="h-full w-full"></img> : <span className="text-5xl"><BiCloudUpload /></span>
                    }
                    <input type="file" accept="image/*" id="image" onChange={uploadImage} className="hidden"></input>
                </div>
                </label>

                <label htmlFor="qty">Quantity in Kg</label>
                <input type="text" name="qty" className="bg-slate-200 p-1 my-1" onChange={handleOnChange} value={data.qty}></input>

                <label htmlFor="price">Price per Kg</label>
                <input type="text" name="price" className="bg-slate-200 p-1 my-1" onChange={handleOnChange} value={data.price}></input>

                <label htmlFor="description">Description</label>
                <textarea rows={2} className="bg-slate-200 p-1 my-1 resize-none" name="description" onChange={handleOnChange} value={data.description}></textarea>

                <button className="bg-red-500 hover:bg-red-600 text-white text-lg font-medium drop-shadow my-2">Save</button>

            </form>
        </div>
    )
}

export default Newproduct