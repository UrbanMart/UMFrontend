import React from 'react';
import logo from '../../Assets/logo.png';
import "../../components/Navbar/Navbar.css";
import { NavLink, useNavigate } from 'react-router-dom';

function Navbar() {

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  const linkStyle = {
    fontSize: "large",
    fontWeight: "bold",
    marginRight: '30px',
    textDecoration: 'none'
  };

  const activeLinkStyle = {
    ...linkStyle,
    color: '#007bff', // Active link color
    borderBottom: '2px solid #007bff' // Optional: underline the active link
  };

  return (
    <nav className="navbar navbar-light navbar-expand" style={{ backgroundColor: '#e3f2fd', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <a className="navbar-brand" href="#" style={{ marginLeft: '50px' }}>
          <NavLink to="/">
            <img src={logo} style={{ width: "200px" }} alt="logo" />
          </NavLink>
        </a>
        <ul className="navbar-nav d-flex align-items-center" style={{ marginRight: '50px' }}>
          <li className="nav-item">
            <NavLink
              to="/product"
              className="nav-link"
              style={({ isActive }) => (isActive ? activeLinkStyle : linkStyle)}
            >
              PRODUCTS
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/inventory"
              className="nav-link"
              style={({ isActive }) => (isActive ? activeLinkStyle : linkStyle)}
            >
              INVENTORY
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/order"
              className="nav-link"
              style={({ isActive }) => (isActive ? activeLinkStyle : linkStyle)}
            >
              ORDERS
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/notification"
              className="nav-link"
              style={({ isActive }) => (isActive ? activeLinkStyle : linkStyle)}
            >
              NOTIFICATIONS
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/feedback"
              className="nav-link"
              style={({ isActive }) => (isActive ? activeLinkStyle : linkStyle)}
            >
              FEEDBACKS
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/user"
              className="nav-link"
              style={({ isActive }) => (isActive ? activeLinkStyle : linkStyle)}
            >
              USERS
            </NavLink>
          </li>
          {user ? (
            <>
              <li className="nav-item">
                <span className="nav-link" style={{ fontSize: "large", fontWeight: "bold", marginRight: '30px' }}>
                  {`Hello, ${user.name}`}
                </span>
              </li>
              <li className="nav-item">
                <button
                  className="nav-link btn"
                  style={{ fontSize: "large", fontWeight: "bold" }}
                  onClick={handleLogout}
                >
                  LOGOUT
                </button>
              </li>
            </>
          ) : (
            <li className="nav-item">
              <NavLink to="/login" className="nav-link" style={({ isActive }) => (isActive ? activeLinkStyle : linkStyle)}>
                LOGIN
              </NavLink>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
