import React from 'react'
import MainDash from './MainDash';
import Sidebar from './Sidebar';
import './Orders.css';
import ProductTable from './Table';
import OrdersTable from './OrdersTable';

const Orders = () => {
  return (
    <div className="App">
      <div className="AppGlass">
        <Sidebar />
        <div className="ProductTable">
         {/* <h1>Orders Details</h1> */}
          <OrdersTable/>
        </div>
        <div></div>
      </div>
    </div>
  );
}

export default Orders;



