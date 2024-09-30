import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { API_BASE_URL } from '../../config';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

const VendorFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchFeedbacks();
  }, []);

 
  const vendorId = '123456789012345678901234'; 
  const fetchFeedbacks = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/VendorFeedback/vendor/${vendorId}`);
      setFeedbacks(response.data);
    } catch (error) {
      
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">

    <Navbar/>
    <div className="container mt-5">
       
      {/* Alerts */}
      {error && <Alert variant="danger">{error}</Alert>}

      {/* Feedback Table */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Vendor ID</th>
            <th>Customer ID</th>
            <th>Comment</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>
          {feedbacks.length > 0 ? (
            feedbacks.map((fb) => (
              <tr key={fb.id}>
                <td>{fb.vendorId}</td>
                <td>{fb.customerId}</td>
                <td>{fb.comment}</td>
                <td>{fb.rating}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                No feedback found
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
    <Footer/>
    </div>
  );
};

export default VendorFeedback;
