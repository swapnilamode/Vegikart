import React from 'react'
import MainDash from './MainDash';
import Sidebar from './Sidebar';
import './Users.css';
import UsersTable from './UsersTable';

const Users = () => {
  return (
    <div className="App">
      <div className="AppGlass">
        <Sidebar />
        <div className="Table">
         {/* <h1>Users Details</h1> */}
         <UsersTable/>
        </div>
        
        <div></div>
      </div>
    </div>
  );
}

export default Users;