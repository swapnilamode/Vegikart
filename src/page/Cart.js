import React from "react";
import { useSelector } from "react-redux";
import CartProduct from "../component/CartProduct";
import emptyCart from "../image/empty.gif";
import { loadStripe } from "@stripe/stripe-js";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Cart = () =>
{
    const productCartItems = useSelector((state) => state.product.cartItem)
    // console.log(productCartItems)

    const user = useSelector((state) => state.user)
    // console.log(user)
    const navigate = useNavigate()

    const totalPrice = productCartItems.reduce((acc, curr) => acc + parseInt(curr.total), 0)
    const totalQty = productCartItems.reduce((acc, curr) => acc + parseInt(curr.qty), 0)

    const handlePayment = async () => {
        if (user.email) {
            const stripePromise = await loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
            try {
                const res = await fetch(`${process.env.REACT_APP_SERVER_DOMIN}/checkout-payment-session`, {
                    method: "POST",
                    headers: {
                        "content-type": "application/json",
                    },
                    body: JSON.stringify(productCartItems),
                });
                if (res.statusCode === 500) return;
    
                const data = await res.json();
                console.log("Redirecting to payment Gateway with session:", data);
                toast("Redirecting to payment Gateway...!");
                
                // Use await here to make sure redirectToCheckout completes before proceeding
                await stripePromise.redirectToCheckout({ sessionId: data });
            } catch (error) {
                console.error("Error during payment:", error);
                toast.error("Error during payment. Please try again.");
            }
        } else {
            toast("You have not Logged In...!");
            setTimeout(() => {
                navigate("/login");
            }, 1000);
        }
    };
    
    
    
    return(
        <>
        <div className="p-2 md:mt-6">
        <h2 className="text-lg md:text-2xl font-bold text-slate-600">Your Cart Items</h2>
        { productCartItems[0] ?
        <div className="my-4 flex gap-3"> 
            {/* Display Cart Items */}
            <div className="w-full max-w-3xl"> 
                {
                    productCartItems.map((el) => {
                        return(
                            <CartProduct 
                            key={el._id}
                            id = {el._id}
                            name = {el.name}
                            image = {el.image}
                            category = {el.category}
                            price = {el.price}
                            qty = {el.qty}
                            total = {el.total}
                            />
                        )
                    })
                }
            </div>
            {/* Total Cart Items */}
            <div className="w-full max-w-md ml-auto">
                <h2 className="bg-blue-500 text-white p-2 text-lg">Summary</h2>
                <div className="flex w-full py-2 text-lg border-b">
                    <p>Total Qty :</p>
                    <p className="ml-auto w-32 font-bold">{totalQty}</p>
                </div>
                <div className="flex w-full py-2 text-lg border-b">
                    <p>Total Price :</p>
                    <p className="ml-auto w-32 font-bold"><span className="text-red-500">₹</span>{totalPrice}</p>
                </div>
                <button className="bg-green-500 w-full text-lg font-bold py-2 text-white hover:text-black hover:bg-green-600" onClick={handlePayment}>Payment</button>
            </div>
        </div>
        :
        <>
        <div className="flex w-full justify-center items-center flex-col">
            <img src={emptyCart} className="w-full max-w-sm"/>
            <p className="text-slate-500 text-3xl font-bold ">Empty Cart</p>
        </div>
        </>
        }
        </div>
        </>   
    )
}

export default Cart