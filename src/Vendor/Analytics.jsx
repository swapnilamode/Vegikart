import React from 'react'
import MainDash from './MainDash';
import Sidebar from './Sidebar';
import './Analytics.css';
import Cards from './Cards';
const Analytics = () => {
  return (
    <div className="App">
      <div className="AppGlass">
        <Sidebar />
        <div className="Cards">
         {/* <h1>Analytics </h1> */}
          <Cards/>
        </div>
        
        <div></div>
      </div>
    </div>
  );
}

export default Analytics;