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

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} /> 
          <Route path="/product" element={<ProductsPage />} /> 
          <Route path="/inventory" element={<ProductInventory />} /> 
          <Route path="/order" element={<OrderManagement />} /> 
          <Route path="/user" element={<UserManagement />} /> 
          <Route path="/notification" element={<NotificationManagement />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
