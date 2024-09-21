import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { API_BASE_URL } from '../../config';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import './Login.css'; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [success, setSuccess] = useState('');
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${API_BASE_URL}/api/users/login`, {
        email,
        password,
      });

      if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
        setSuccess('Login successful!');
        navigate('/');
      }
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="login-page-container">
      <Navbar />
      <div className="content-wrap">
        <h2 className="my-4">Login</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}
        <Form onSubmit={handleLogin}>
          <Form.Group controlId="formEmail" className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formPassword" className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form>
        <div className="mt-3">
          <p>
            Don't have an account? <Link to="/register">Register here</Link>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
