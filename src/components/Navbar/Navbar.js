import React from 'react';
import logo from '../../Assets/logo.png'
import "../../components/Navbar/Navbar.css"

function Navbar() {
  return (
    <nav className="navbar navbar-light navbar-expand" style={{ backgroundColor: '#e3f2fd',boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
      <div className="container-fluid">
        <a className="navbar-brand" href="#" style={{ marginLeft:'100px'}}>
          <img src={logo} style={{width:"200px",boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'}}/>
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
          <li className="nav-item">
            <a className="nav-link " href="#" style={{fontSize:"large",fontWeight: "bold", marginRight:'100px'}}>
              LOGIN
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
