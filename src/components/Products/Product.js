import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Form, Modal, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { API_BASE_URL } from '../../config';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

const App = () => {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({ name: '', price: '', category: '', imageUrl: '', isActive: false, vendorId: '' });
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [vendors, setVendors] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    vendorId: '', 
  });

  useEffect(() => {
    fetchProducts();
    fetchVendors();
  }, []);

  const user = JSON.parse(localStorage.getItem('user'));

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
    const { name, value, type, checked } = e.target;
    setProduct({ ...product, [name]: type === 'checkbox' ? checked : value });
  };

  // Handle creating a new product
  const handleCreateProduct = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/api/products`, product);
      setSuccess('Product created successfully');
      setProducts([...products, response.data]); // Add the new product to the state
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
      fetchProducts(); // Re-fetch the products after update
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
      fetchProducts(); // Re-fetch the products after delete
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
    setProduct({
      name: product.name,
      price: product.price,
      category: product.category,
      imageUrl: product.imageUrl,
      isActive: product.isActive,
      vendorId: product.vendorId, // Pre-fill the vendorId
    });
    setEditMode(true);
    setShowModal(true);
  };

  const fetchVendors = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/users`);
      const vendorUsers = response.data.filter((user) => user.role === 'Vendor');
      setVendors(vendorUsers);
    } catch (error) {
      console.error('Error fetching vendors:', error);
    }
  };

  // Close the modal
  const handleCloseModal = () => {
    setShowModal(false);
    resetForm();
  };

  // Handle activation/deactivation by an Administrator
  const handleToggleActive = async (id, isActive) => {
    if (user?.role === 'Administrator') {
      try {
        await axios.patch(`${API_BASE_URL}/api/products/${id}`, { isActive: !isActive });
        setSuccess(`Product ${!isActive ? 'activated' : 'deactivated'} successfully`);
        fetchProducts(); // Re-fetch products to update the status
      } catch (error) {
        setError('Error updating product status');
      }
    } else {
      setError('Only administrators can change product activation status');
    }
  };

  // Reset form fields
  const resetForm = () => {
    setProduct({ name: '', price: '', category: '', imageUrl: '', isActive: false, vendorId: '' });
    setSelectedProductId(null);
    setError('');
    setSuccess('');
    setShowModal(false);
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        {/* Alerts */}
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}

        {/* Button to open create product modal */}
        {user?.role === 'Vendor' && (
          <Button variant="primary" className="mb-3" onClick={handleCreateModal} style={{ float: 'left' }}>
            Create New Product
          </Button>
        )}

        {/* Products Table */}
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Image URL</th>
              <th>Is Active</th>
              <th>Vendor ID</th>
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
                    {prod.isActive ? 'Active' : 'Inactive'}
                    {user?.role === 'Administrator' && (
                      <Button
                        variant={prod.isActive ? 'danger' : 'success'}
                        className="ms-2"
                        onClick={() => handleToggleActive(prod.id, prod.isActive)}
                      >
                        {prod.isActive ? 'Deactivate' : 'Activate'}
                      </Button>
                    )}
                  </td>
                  <td>{prod.vendorId}</td> {/* Display vendorId */}
                  <td>
                    {user?.role === 'Vendor' && (
                      <>
                        <Button variant="warning" className="me-2" onClick={() => handleEditModal(prod)}>
                          Edit
                        </Button>
                        <Button variant="danger" onClick={() => handleDeleteProduct(prod.id)}>
                          Delete
                        </Button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center">No products found</td>
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

              <Form.Group>
                <Form.Label>Vendor</Form.Label>
                <Form.Control
                  as="select"
                  name="vendorId"
                  value={newProduct.vendorId}
                  onChange={handleInputChange}
                >
                  <option value="">Select Vendor</option>
                  {vendors.map((vendor) => (
                    <option key={vendor.id} value={vendor.id}>
                      {vendor.name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>

              {/* Only administrators can see this checkbox */}
              {user?.role === 'Administrator' && (
                <Form.Group className="mb-3" controlId="formProductIsActive">
                  <Form.Check
                    type="checkbox"
                    name="isActive"
                    label="Is Active"
                    checked={product.isActive}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              )}

              <Button variant="primary" type="submit">
                {editMode ? 'Update Product' : 'Create Product'}
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
      <Footer />
    </div>
  );
};

export default App;
