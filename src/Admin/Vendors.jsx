import React from 'react'
import MainDash from './MainDash';
import Sidebar from './Sidebar';
import './Users.css';
import UsersTable from './UsersTable';
import VendorsTable from './VendorsTable';

const Vendors = () => {
  return (
    <div className="App">
      <div className="AppGlass">
        <Sidebar />
        <div className="Table">
         {/* <h1>Users Details</h1> */}
         <VendorsTable/>
        </div>
        
        <div></div>
      </div>
    </div>
  );
}

export default Vendors;