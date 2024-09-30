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
          height: 'auto', // Adjust height as needed
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
          {/* First Row of Cards */}
          <div className="row text-center">
            {/* Card 1: Product Details */}
            <div className="col-md-4 mb-4">
              <Link to="/product" style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="card border-light shadow-sm" style={cardStyle}>
                  <img src="https://plus.unsplash.com/premium_photo-1671198905435-20f8d166efb2?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3" className="card-img-top" alt="Feature One"/>
                  <div className="card-body">
                    <h4 className="card-title">Product Details</h4>
                    <p className="card-text">Manage your product listings, update product details, and oversee product categorization.</p>
                  </div>
                </div>
              </Link>
            </div>
            {/* Card 2: Inventory Details */}
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
            {/* Card 3: Order Details */}
            <div className="col-md-4 mb-4">
              <Link to="/order" style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="card border-light shadow-sm" style={cardStyle}>
                  <img src="https://img.freepik.com/premium-photo/beautiful-womens-clothing-store-new-summer-products_943281-27240.jpg" className="card-img-top" alt="Feature Three"/>
                  <div className="card-body">
                    <h4 className="card-title">Order Details</h4>
                    <p className="card-text">Oversee orders and handle returns and exchanges to ensure smooth order fulfillment.</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          {/* Second Row of Cards (Centered) */}
          <div className="row justify-content-center text-center">
            {/* Card 4: User Management */}
            <div className="col-md-4 mb-4">
              <Link to="/user" style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="card border-light shadow-sm" style={cardStyle}>
                  <img src="https://milgrasp.com/img/sections/features/user_management2.jpg" className="card-img-top" alt="User Management"/>
                  <div className="card-body">
                    <h4 className="card-title">User Management</h4>
                    <p className="card-text">Manage user roles, permissions, and access rights to ensure secure user management.</p>
                  </div>
                </div>
              </Link>
            </div>
            {/* Card 5: Notification Management */}
            <div className="col-md-4 mb-4">
              <Link to="/notification" style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="card border-light shadow-sm" style={cardStyle}>
                  <img src="https://www.koombea.com/wp-content/uploads/2023/01/push-notification-as-a-service-banner@2x-800x445.webp" className="card-img-top" alt="Notification Management"/>
                  <div className="card-body">
                    <h4 className="card-title">Notification Management</h4>
                    <p className="card-text">Configure and manage notifications to stay updated with important alerts and messages.</p>
                  </div>
                </div>
              </Link>
            </div>
            <div className="col-md-4 mb-4">
              <Link to="/feedback" style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="card border-light shadow-sm" style={cardStyle}>
                  <img src="https://actiosoftware.com/wp-content/uploads/2024/02/resposta-do-smiley-do-cliente-do-feedback-da-avaliacao-1.jpg" className="card-img-top" alt="Notification Management"/>
                  <div className="card-body">
                    <h4 className="card-title">Feedback Management</h4>
                    <p className="card-text">Configure and manage feedback to stay updated with user feedbacks.</p>
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
