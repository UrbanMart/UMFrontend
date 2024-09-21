import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Home/Home.css'; 
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { Link } from 'react-router-dom';

function HomePage() {

    const cardStyle = {
        boxShadow: '0 4px 8px rgba(0.2, 0.2, 0.2, 0.2)', // Customize the shadow as needed
      };
      
  return (
    <div>
      <Navbar/>
      {/* Hero Section */}
      <header 
        className="hero text-white text-center py-5"
        style={{ 
          backgroundImage:`url(${"https://media.burford.co.uk/images/SNY04089.jpg_edit.width-1440_05001m7uKQ0crRoI.jpg"})`, // Replace with the path to your image
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          
          Height: 'auto', // Adjust height as needed
          overflow: 'hidden',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="container">
          <h1 className="display-4" style={{fontWeight:"medium"}}>Welcome to Urban Mart</h1>
          <p className="lead">Discover our features and services</p>
        </div>
      </header>

      {/* Features Section */}
      <section id="features" className="py-5">
        <div className="container">
          <div className="row text-center">
            {/* Card 1 */}
            <div className="col-md-4 mb-4">
            <Link to="/product" style={{ textDecoration: 'none', color: 'inherit' }}>  {/* Wrap the card in a Link */}
                <div className="card border-light shadow-sm" style={cardStyle}>
                  <img src="https://plus.unsplash.com/premium_photo-1671198905435-20f8d166efb2?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dmludGFnZSUyMGNsb3RoaW5nfGVufDB8fDB8fHww" className="card-img-top" alt="Feature One"/>
                  <div className="card-body">
                    <h4 className="card-title">Product Details</h4>
                    <p className="card-text"> Manage your product listings, update product details, and oversee product categorization.</p>
                  </div>
                </div>
              </Link>
            </div>
            {/* Card 2 */}
            <div className="col-md-4 mb-4">
            <Link to="/inventory" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="card border-light shadow-sm" style={cardStyle}>
                <img src="https://www.panaprium.com/cdn/shop/articles/online_thrift_store_vintage_fashion_1000.jpg?v=1638333789" className="card-img-top" alt="Feature Two"/>
                <div className="card-body">
                  <h4 className="card-title">Inventory Details</h4>
                  <p className="card-text">Monitor and manage stock levels and generate reports to maintain inventory levels.</p>
                </div>
              </div>
            </Link>
            </div>
            {/* Card 3 */}
            <div className="col-md-4 mb-4">
            <Link to="/order" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="card border-light shadow-sm" style={cardStyle}>
                <img src="https://img.freepik.com/premium-photo/beautiful-womens-clothing-store-new-summer-products_943281-27240.jpg" className="card-img-top" alt="Feature Three"/>
                <div className="card-body">
                  <h4 className="card-title">Order Details</h4>
                  <p className="card-text">Oversee orders and handle returns and exchanges to ensure a order fulfillment process.</p>
                </div>
              </div>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Footer/>
    </div>
  );
}

export default HomePage;
