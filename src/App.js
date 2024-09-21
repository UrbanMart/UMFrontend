import './App.css';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import ProductsPage from './components/Products/Product';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} /> 
          <Route path="/product" element={<ProductsPage />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
