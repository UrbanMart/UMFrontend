import React from 'react';
import './Footer.css'; // Import the CSS file for styling

function Footer() {
  return (
    <footer className="footer bg-body-tertiary text-center">
      
      
      {/* Copyright */}
      <div className="text-center p-3" style={{ backgroundColor: '#e3f2fd' }}>
        © 2024 Copyright:
        <a className="text-reset fw-bold" >DroxGen.com</a>
      </div>
    </footer>
  );
}

export default Footer;
