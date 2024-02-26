import React, { useState } from "react";
import loginSignupimage from "../image/login-animation.gif"
import { BiShow } from "react-icons/bi";
import { BiHide } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { imagetobase64 } from "../utility/imagetobase64";
import toast, { Toaster } from 'react-hot-toast';

const Signup = () => {
    const navigate = useNavigate()
    const [showpassword, setshowpassword] = useState(false)
    const [showconfirmpassword, setshowconfirmpassword] = useState(false)
    const handleshowpassword = () => {
        setshowpassword(prev => !prev)
    }

    const handleshowconfirmpassword = () => {
        setshowconfirmpassword(prev => !prev)
    }

    const [data, setdata] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmpassword: "",
        image: ""
    })

    // console.log(data)
    const handleOnChange = (e) => {
        const{name, value} = e.target
        setdata((prev)=> {
            return {
                ...prev,
                [name] : value
            }        
        })
    }

    const handleuploadimage = async(e) => {
        const data = await imagetobase64(e.target.files[0])
        // console.log(data)
        setdata((prev) => {
            return{
                ...prev,
                image : data
            }
        })
    }
    console.log(process.env.REACT_APP_SERVER_DOMIN)
    const handleSubmit = async(e) => {
        e.preventDefault();
        const{firstName, email, password, confirmpassword} = data
        if(firstName && email && password && confirmpassword){
            if(password === confirmpassword){
                const fetchdata = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/signup`,{
                    method : "POST",
                    headers : {
                        "Content-type":"application/json"
                    },
                    body : JSON.stringify(data)
                })
                const dataRes = await fetchdata.json()
                // console.log(dataRes)
                
                // alert(dataRes.message)
                toast(dataRes.message)
                if(dataRes.alert){
                    navigate("/login")
                }
                
            }else{
                toast("Check password and Confirm password is equal or not..!")
            }
        }else{
            toast("Please enter required feilds..!")
        }
      }
    return (
        <div className="p-3 md:py-8">
            <div className="w-full max-w-sm bg-white m-auto flex-col p-4">
                {/* <h1 className="text-center">Sign Up</h1> */}
                <div className="w-20 overflow-hidden rounded-full drop shadow-xl m-auto relative cursor-pointer" >
                    <img src={data.image ? data.image : loginSignupimage} className="w-full" />
                    <label htmlFor="profileimage">
                    <div className="absolute bottom-0 bg-slate-500 w-full p-1 h-1/3 text-center cursor-pointer bg-opacity-50 bg-transparent">
                        <p className="text-sm text-white">Upload</p>
                    </div>
                    <input type="file" id="profileimage" accept="image/*" className="hidden" onChange={handleuploadimage}/>
                    </label>
                    
                </div>

                <form className="w-full py-4">
                    <label htmlFor="firstName">First Name</label>
                    <input type={"text"} id="firstName" name="firstName" className="mt-1 mb-2 w-full bg-slate-200 p-1 px-2 py-2 rounded focus-within:outline-blue-300" value={data.firstName} onChange={handleOnChange} placeholder="Enter your first name"></input>
                    
                    <label htmlFor="lastName">Last Name</label>
                    <input type={"text"} id="lastName" name="lastName" className="mt-1 mb-2 w-full bg-slate-200 p-1 px-2 py-2 rounded focus-within:outline-blue-300" value={data.lastName} onChange={handleOnChange} placeholder="Enter your last name"></input>
                    
                    <label htmlFor="email">Email ID</label>
                    <input type={"email"} id="email" name="email" className="mt-1 mb-2 w-full bg-slate-200 p-1 px-2 py-2 rounded focus-within:outline-blue-300" value={data.email} onChange={handleOnChange} placeholder="Enter your email id"></input>

                    <label htmlFor="password">Password</label>
                    <div className="flex px-2 py-1 bg-slate-200 rounded mt-1 mb-2 focus-within:outline-none focus-within:outline-blue-300">
                        <input type={showpassword ? "text" : "password"} id="password" name="password" className=" w-full bg-slate-200 border-none outline-none" value={data.password} onChange={handleOnChange} placeholder="Enter your password"></input>
                        <span className="mt-1 flex text-xl cursor-pointer" onClick={handleshowpassword}>{showpassword ? <BiShow /> : <BiHide />}</span>
                    </div>

                    <label htmlFor="confirmpassword">Confirm Password</label>
                    <div className="flex px-2 py-1 bg-slate-200 rounded mt-1 mb-2 focus-within:outline-none focus-within:outline-blue-300">
                        <input type={showconfirmpassword ? "text" : "password"} id="confirmpassword" name="confirmpassword" className=" w-full bg-slate-200 border-none outline-none" value={data.confirmpassword} onChange={handleOnChange} placeholder="Enter your password again"></input>
                        <span className="mt-1 flex text-xl cursor-pointer" onClick={handleshowconfirmpassword}>{showconfirmpassword ? <BiShow /> : <BiHide />}</span>
                    </div>
                    <div className="flex justify-center py-4 h-15">
                        <button className="max w-[100px] border-2 border-solid border-slate-600 rounded-full bg-green-500 text-white hover:bg-yellow-500 text-xl font-medium cursor-pointer"onClick={handleSubmit}>Sign Up</button>
                    </div>

                </form>
                <p className="text-left text-sm -mt-2">Already have an account ?{""} <Link to={"/login"} className="text-red-500 underline">Login</Link></p>
            </div>
        </div>

    )
}

export default Signup