import { useEffect, useState } from 'react'
import log from '../image/log.png'

import { Link, useNavigate } from 'react-router-dom'
import { HiOutlineUserCircle } from "react-icons/hi";
import { TfiShoppingCart } from "react-icons/tfi";
import { useDispatch, useSelector } from 'react-redux';
import { logoutRedux } from '../redux/userSlice';
import toast from 'react-hot-toast';

const Header = () => {
    const [showMenu, setshowMenu] = useState(false);
    const navigate = useNavigate();

    const userData = useSelector((state) => state.user)
    console.log(userData)

    const [vendors, setVendors] = useState([]);
    
    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER_DOMIN}/vendors`)
            .then(response => response.json())
            .then(data => setVendors(data))
            .catch(error => console.error('Error fetching products:', error));
    }, []);
    // const vendorData = useSelector((state) => state.vendor)
    // console.log(vendorData)

    const dispatch = useDispatch()

    const handleshowMenu = () => {
        setshowMenu(preve => !preve)
    }

    const handleLogout = () => {
        dispatch(logoutRedux())
        toast("Logged Out Successfully")
        navigate("/")
    }

    const cartItemNumber = useSelector((state) => state.product.cartItem)
    // console.log(process.env.REACT_APP_ADMIN_EMAIL)
    return (

    <header className='fixed shadow-md w-full h-20 px-2 md:px-4 z-50 bg-white'>
        {/* desktop */}

        <div className='flex items-center h-full justify-between'>
            <Link to={""}>
                <div className='border-solid border-slate-600 rounded-full'>
                    {/* <h1>VegiKart</h1> */}
                    <img src={log} className='h-20 w-25 rounded-full' />
                </div>
            </Link>

            <div className='flex items-center gap-4 md:7'>
                <nav className='gap-9 md:gap-6 text-base md:text-lg hidden md:flex'>
                    <Link to={""} className='hover:text-green-500'>Home</Link>
                    <Link to={"menu/65c38bc5c3475344ce61f6a3"} className='hover:text-green-500'>Menu</Link>
                    <Link to={"about"} className='hover:text-green-500'>About</Link>
                    <Link to={"contact"} className='hover:text-green-500'>Contact</Link>
                </nav>
                <div className='text-3xl text-slate-600 ralative cursor-pointer hover:text-green-500'>
                   <Link to={"cart"}><TfiShoppingCart />
                    <div className="absolute top-3 right-13 text-white bg-red-500 h-5 w-5 rounded-full m-0 p-0 text-sm text-center ">{cartItemNumber.length}</div>
                    </Link>
                </div>
                <div className='text-lg text-slate-600'onClick={handleshowMenu}>
                    <div className='text-3xl cursor-pointer w-8 h-8 rounded-full overflow-hidden drop-shadow hover:text-green-500'>
                        {userData.image ? <img src={userData.image} className='h-full w-full' />:<HiOutlineUserCircle />}
                    </div>
                    {showMenu && (<div className='text-lg absolute right-2 bg-white py-2 px-4 shadow drop-shadow-md flex flex-col min-w-[120px]'>
                    {
                            userData.email === process.env.REACT_APP_ADMIN_EMAIL? <Link to={"adminDashboard"} className='cursor-pointer'>Admin DashBoard</Link> : ""
                        } 
                    {userData.email && (
                                <>
                                    {vendors.find((vendor) => vendor.email === userData.email) && (
                                        <Link to={"dashboard"} className='cursor-pointer'>
                                            Dashboard
                                        </Link>
                                    )}
                                    <p className='cursor-pointer' onClick={handleLogout}>
                                        Logout ({userData.firstName})
                                    </p>
                                </>
                            )}
                        {!userData.email && <Link to={"login"} className='cursor-pointer'>Login</Link>}
                        <nav className='text-lg md:text-lg flex flex-col md:hidden'>
                        <Link to={""} className='hover:text-green-500'>Home</Link>
                        <Link to={"menu/65c38bc5c3475344ce61f6a3"} className='hover:text-green-500'>Menu</Link>
                        <Link to={"about"} className='hover:text-green-500'>About</Link>
                        <Link to={"contact"} className='hover:text-green-500'>Contact</Link>
                        </nav>
                    </div>
                    )}
                    
                </div>
            </div>
        </div>

        {/* mobile */}
    </header>
    ) 
}
export default Header