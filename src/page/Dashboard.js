import './Dashboard.css';
import Sidebar from '../Vendor/Sidebar';
import MainDash from '../Vendor/MainDash';

function Dashboard() {
  return (
    <div className="App">
      <div className="AppGlass">
        <Sidebar />
        <MainDash />
        
        <div></div>
      </div>
    </div>
  );
}
export default Dashboard;