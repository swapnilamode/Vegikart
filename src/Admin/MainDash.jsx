import React from "react";
import Cards from "./Cards";
import Table from "./Table";
import "./MainDash.css";
// import { Routes, Route } from "react-router-dom";
// import Orders from "./Orders";
// import Users from "./Users";
// import AddProducts from "./AddProducts";
// import Analytics from "./Analytics";
// import Dashboard from "../page/Dashboard";


 const MainDash = () => {
  
   return (
     <div className="MainDash">
       {/* <h1>All Products</h1> */}
       {/* <Cards/> */}
       <Table/>
     </div>
   );
 };

 export default MainDash;