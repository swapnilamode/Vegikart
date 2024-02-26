import React, { useEffect, useRef, useState } from "react";
import bikeIcon from '../image/delivery-bike.png'
import HomeCard from "../component/HomeCard";
import { useSelector } from "react-redux";
import CardFeature from "../component/CardFeature";
import { GrPrevious, GrNext } from "react-icons/gr";
import FilterProduct from "../component/FilterProduct";
import AllProduct from "../component/AllProduct";

const Home = () => {
  const productData = useSelector((state) => state.product.productList)
  const HomeProductCartList = productData.slice(0, 3)
  const HomeProductCartListVegitables = productData.filter(el => el.category === "Vegetables", [])
  const loadingArray = new Array(4).fill(null)
  const loadingArrayFeature = new Array(10).fill(null)

  const slideProductRef = useRef()

  const prevProduct = () => {
    slideProductRef.current.scrollLeft -= 200
  }

  const nextProduct = () => {
    slideProductRef.current.scrollLeft += 200
  }

  const scrollToBottom = () => {
    const section = document.getElementById("orderSection")
    section.scrollIntoView({behavior: "smooth" })
  }

  return (
    <div className="my-10 p-2 md: p-4">
      <div className="md:flex">
        <div className="md:w-1/2">
          <div className="flex gap-3 bg-slate-400 w-36 px-2 items-center rounded-full">
            <p className="text-sm font-medium text-slate-900">Bike Delivery</p>
            <img src={bikeIcon} className="h-7"></img>
          </div>
          <h2 className=" text-4xl md:text-7xl font-bold py-3">The Fastest Delivery At <span className="text-red-600">Your Home</span></h2>
          <button className="font-bold bg-red-500 text-slate-200 px-4 py-2 rounded-md" onClick={scrollToBottom}>Order Now</button>
        </div>
        <div className="md:w-1/2 flex flex-wrap gap-5 p-4 justify-center">
          {HomeProductCartList[0] ? HomeProductCartList.map(el => {
            return (
              <HomeCard
                key={el._id}
                id={el._id}
                image={el.image}
                name={el.name}
                price={el.price}
                category={el.category}
              />
            )
          }) :
            loadingArray.map((el, index) => {
              return (
                <HomeCard key={index + "loading"} loading={"Loading..."} />
              )
            })}
        </div>
      </div>
      <div className="">
        <div className="flex w-full item-center">
          <h2 className="font-bold text-2xl text-slate-600 mb-4">Fresh Vegetables</h2>
          <div className="flex ml-auto gap-4">
            <button onClick={prevProduct} className="bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded"><GrPrevious /></button>
            <button onClick={nextProduct} className="bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded"><GrNext /></button>
          </div>
        </div>
        <div className="flex gap-5 overflow-scroll scrollbar-none scroll-smooth transition-all" ref={slideProductRef}>
          {HomeProductCartListVegitables[0] ? HomeProductCartListVegitables.map(el => {
            return (
              <CardFeature
                key={el._id + "Vegitable"}
                id={el._id}
                image={el.image}
                name={el.name}
                price={el.price}
                category={el.category}
              />
            )
          })
            :
            loadingArrayFeature.map((el, index) => (<CardFeature loading="Loading..." key={index + "loading"} />))
          }
        </div>
      </div>
      <AllProduct heading={"Your Product"} />
      <div id="orderSection" />
    </div>
  )
}

export default Home
