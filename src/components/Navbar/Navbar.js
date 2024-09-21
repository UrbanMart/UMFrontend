import React from 'react';
import logo from '../../Assets/logo.png'
import "../../components/Navbar/Navbar.css"
import { Link, useNavigate } from 'react-router-dom'; 

function Navbar() {

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user'); 
    navigate('/');  
  };

  return (
    <nav className="navbar navbar-light navbar-expand" style={{ backgroundColor: '#e3f2fd',boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
      <div className="container-fluid">
        <a className="navbar-brand" href="#" style={{ marginLeft:'100px'}}>
          <Link to="/">
          <img src={logo} style={{width:"200px",boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'}}/>
          </Link>
        </a>
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link"  href="#" style={{fontSize:"large",fontWeight: "bold", marginRight:'30px'}}>
              PRODUCTS
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#" style={{fontSize:"large",fontWeight: "bold", marginRight:'30px'}}>
              INVENTORY
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#" style={{fontSize:"large",fontWeight: "bold", marginRight:'30px'}}>
              ORDERS
            </a>
          </li>
          {user ? (
            <>
              <li className="nav-item">
                <span className="nav-link" style={{ fontSize: "large", fontWeight: "bold", marginRight: '30px' }}>
                  {`Hello, ${user.name}`} {/* Display username */}
                </span>
              </li>
              <li className="nav-item">
                <button
                  className="nav-link btn"
                  style={{ fontSize: "large", fontWeight: "bold", marginRight: '100px' }}
                  onClick={handleLogout}
                >
                  LOGOUT
                </button>
              </li>
            </>
          ) : (
            <li className="nav-item">
              <Link to="/login" className="nav-link" style={{ fontSize: "large", fontWeight: "bold", marginRight: '100px' }}>
                LOGIN
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
