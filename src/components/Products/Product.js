import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Form, Modal, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { API_BASE_URL } from '../../config';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

const App = () => {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({ name: '', price: '', category: '', imageUrl: '' });
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  // Fetch all products from the backend
  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/products`);
      setProducts(response.data);
    } catch (error) {
      setError('Error fetching products');
    }
  };

  // Handle form input change
  const handleInputChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  // Handle creating a new product
  const handleCreateProduct = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/api/products`, product);
      setSuccess('Product created successfully');
      setProducts([...products, response.data]);
      resetForm();
    } catch (error) {
      setError('Error creating product');
    }
  };

  // Handle updating a product
  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API_BASE_URL}/api/products/${selectedProductId}`, product);
      setSuccess('Product updated successfully');
      fetchProducts();
      resetForm();
    } catch (error) {
      setError('Error updating product');
    }
  };

  // Handle deleting a product
  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/api/products/${id}`);
      setSuccess('Product deleted successfully');
      fetchProducts();
    } catch (error) {
      setError('Error deleting product');
    }
  };

  // Open modal for creating a new product
  const handleCreateModal = () => {
    resetForm();
    setEditMode(false);
    setShowModal(true);
  };

  // Open modal for editing a product
  const handleEditModal = (product) => {
    setSelectedProductId(product.id);
    setProduct(product);
    setEditMode(true);
    setShowModal(true);
  };

  // Close the modal
  const handleCloseModal = () => {
    setShowModal(false);
    resetForm();
  };

  // Reset form fields
  const resetForm = () => {
    setProduct({ name: '', price: '', category: '', imageUrl: '' });
    setSelectedProductId(null);
    setError('');
    setSuccess('');
    setShowModal(false);
  };

  return (
    <div>
        <Navbar/>
    <div className="container mt-5">
      {/* Alerts */}
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      {/* Button to open create product modal */}
      <Button variant="primary" className="mb-3" onClick={handleCreateModal} style={{float:"left"}}>
        Create New Product
      </Button>

      {/* Products Table */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Image URL</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((prod) => (
              <tr key={prod.id}>
                <td>{prod.name}</td>
                <td>{prod.price}</td>
                <td>{prod.category}</td>
                <td><img src={prod.imageUrl} alt={prod.name} style={{ width: '100px' }} /></td>
                <td>
                  <Button variant="warning" className="me-2" onClick={() => handleEditModal(prod)}>
                    Edit
                  </Button>
                  <Button variant="danger" onClick={() => handleDeleteProduct(prod.id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">No products found</td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Modal for Creating/Editing Product */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{editMode ? 'Edit Product' : 'Create New Product'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={editMode ? handleUpdateProduct : handleCreateProduct}>
            <Form.Group className="mb-3" controlId="formProductName">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Enter product name"
                value={product.name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formProductPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                name="price"
                placeholder="Enter price"
                value={product.price}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formProductCategory">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                name="category"
                placeholder="Enter category"
                value={product.category}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formProductImageUrl">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                name="imageUrl"
                placeholder="Enter image URL"
                value={product.imageUrl}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              {editMode ? 'Update Product' : 'Create Product'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
    <Footer/>
    </div>
  );
};

export default App;
