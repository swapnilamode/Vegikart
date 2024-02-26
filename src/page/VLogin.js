
import React, { useState } from "react";
import loginSignupimage from "../image/login-animation.gif"
import { BiShow } from "react-icons/bi";
import { BiHide } from "react-icons/bi";
import { Link } from "react-router-dom";
import{toast} from "react-hot-toast";
import{useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginRedux } from "../redux/userSlice";

const VLogin = () =>
{
    const [showpassword, setshowpassword] = useState(false)

    const handleshowpassword = () => {
        setshowpassword(prev => !prev)
    }

    const [data, setdata] = useState({
        email: "",
        password: ""
    });

    const navigate = useNavigate();
    
    const vendorData = useSelector (state => state.vendor)
    // console.log(userData)

    const dispatch = useDispatch()

    const handleOnChange = (e) => {
        const{name, value} = e.target
        setdata((prev)=> {
            return {
                ...prev,
                [name] : value
            }        
        })
    }
    const handleSubmit = async(e) => {
        e.preventDefault();
        const{email, password} = data
        if(email && password){
                // alert("Sucessfully Signed..!")
                const fetchdata = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/vlogin`,{
                    method : "POST",
                    headers : {
                        "Content-type":"application/json"
                    },
                    body : JSON.stringify(data)
                })
                const dataRes = await fetchdata.json()
                // console.log(dataRes)
                
                toast(dataRes.message)
                if(dataRes.alert){
                    dispatch(loginRedux(dataRes))
                    setTimeout(() => {
                        navigate("/")
                    }, 1000);
                }
                
        }else{
            alert("Invalid Email ID or Password..!")
        }
      }
    return(
        <div className="p-3 md:py-8">
            <div className="w-full max-w-sm bg-white m-auto flex-col p-4">
                {/* <h1 className="text-center">Sign Up</h1> */}
                <div className="w-20 overflow-hidden rounded-full drop shadow-xl m-auto" >
                    <img src={loginSignupimage} className="w-full" />
                </div>

                <form className="w-full py-4">
                    
                    <label htmlFor="email">Email ID</label>
                    <input type={"email"} id="email" name="email" className="mt-1 mb-2 w-full bg-slate-200 p-1 px-2 py-2 rounded focus-within:outline-blue-300" value={data.email} onChange={handleOnChange} placeholder="Enter your email id"></input>

                    <label htmlFor="password">Password</label>
                    <div className="flex px-2 py-1 bg-slate-200 rounded mt-1 mb-2 focus-within:outline-none focus-within:outline-blue-300">
                        <input type={showpassword ? "text" : "password"} id="password" name="password" className=" w-full bg-slate-200 border-none outline-none" value={data.password} onChange={handleOnChange} placeholder="Enter your password"></input>
                        <span className="mt-1 flex text-xl cursor-pointer" onClick={handleshowpassword}>{showpassword ? <BiShow /> : <BiHide />}</span>
                    </div>

                    <div className="flex justify-center py-4 h-15">
                        <button className="max w-[100px] border-2 border-solid border-slate-600 rounded-full bg-green-500 text-white hover:bg-yellow-500 text-xl font-medium cursor-pointer"onClick={handleSubmit}>Login</button>
                    </div>

                </form>
                <p className="text-left text-sm -mt-2">Don't have an account ? {""} <Link to={"/vsignup"} className="text-red-500 underline">Vendor Sign Up</Link></p>
            </div>
        </div>

    )
    
}
export default VLogin