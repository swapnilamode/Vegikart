import './AdminDashboard.css';
import Sidebar from '../Admin/Sidebar';
import MainDash from '../Admin/MainDash';

function AdminDashboard() {
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
export default AdminDashboard;