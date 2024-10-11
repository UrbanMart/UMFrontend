import './App.css';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import ProductsPage from './components/Products/Product';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductInventory from './components/Inventory/Inventory';
import OrderManagement from './components/Orders/Order';
import UserManagement from './components/User/User';
import NotificationManagement from './components/Notification/Notification';
import VendorFeedback from './components/Feedback/Feedback';
import PrivateRoute from './PrivateRoute'; // Import PrivateRoute

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Protected Routes */}
          <Route path="/product" element={<PrivateRoute element={<ProductsPage />} />} />
          <Route path="/inventory" element={<PrivateRoute element={<ProductInventory />} />} />
          <Route path="/order" element={<PrivateRoute element={<OrderManagement />} />} />
          <Route path="/user" element={<PrivateRoute element={<UserManagement />} />} />
          <Route path="/notification" element={<PrivateRoute element={<NotificationManagement />} />} />
          <Route path="/feedback" element={<PrivateRoute element={<VendorFeedback />} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
