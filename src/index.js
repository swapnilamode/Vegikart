import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { createBrowserRouter, createRoutesFromElements,Route, RouterProvider } from 'react-router-dom';

import Menu from './page/Menu';
import About from './page/About';
import Contact from './page/Contact';
import Home from './page/Home';
import Newproduct from './page/Newproduct';
import Login from './page/login';
import Signup from './page/Signup';
import { Store } from 'redux';
import { Provider } from 'react-redux';
import { store } from './redux/index';
import Cart from './page/Cart';
import Success from './page/Success';
import Cancel from './page/Cancel';
import Dashboard from './page/Dashboard';
import Orders from './Vendor/Orders'
import Users from './Vendor/Users'
import Analytics from './Vendor/Analytics'
import AddProducts from './Vendor/AddProducts';
import AdminDashboard from './page/AdminDashboard';
import Vendors from './Admin/Vendors';
import VLogin from './page/VLogin';
import VSignup from './page/VSignup';
import AOrders from './Admin/AOrders';
import ADUsers from './Admin/ADUsers';





const router = createBrowserRouter(
  createRoutesFromElements (
    <Route path = '/' element = {<App/>}>
      <Route index element = {<Home/>}/>
      {/* <Route path='menu' element = {<Menu/>}/> */}
      <Route path='menu/:filterby' element = {<Menu/>}/>
      <Route path='about' element = {<About/>}/>
      <Route path='contact' element = {<Contact/>}/>
      <Route path='login' element = {<Login/>}/>
      <Route path='vlogin' element = {<VLogin/>}/>
      <Route path='newproduct' element = {<Newproduct/>}/>
      <Route path='dashboard' element = {<Dashboard/>}/>
      <Route path='adminDashboard' element = {<AdminDashboard/>}/>
      <Route path='signup' element = {<Signup/>}/>
      <Route path='vsignup' element = {<VSignup/>}/>
      <Route path='cart' element = {<Cart/>}/>
      <Route path='success' element = {<Success/>}/>
      <Route path='cancel' element = {<Cancel/>}/>
      <Route path="/orders" element={<Orders />} />
      <Route path="/users" element={<Users />} />
      <Route path="/ausers" element={<ADUsers/>} />
      <Route path="/aorders" element={<AOrders/>} />
      <Route path="/vendors" element={<Vendors/>} />
      <Route path="/addProducts" element={<AddProducts />} />
      {/* <Route path="/analytics" element={<Analytics />} /> */}
      
    </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store = {store}>
  <RouterProvider router={router}/>
  </Provider>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
