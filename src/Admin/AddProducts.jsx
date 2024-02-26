import React from 'react'
import Newproduct from '../page/Newproduct'
import MainDash from './MainDash';
import Sidebar from './Sidebar';
import './AddProducts.css';
const AddProducts = () => {
  return (
    <div className="App">
      <div className="AppGlass">
        <Sidebar />
        <div className='text'>
        <Newproduct/>
        </div>
      </div>
    </div>
  );
}

export default AddProducts;