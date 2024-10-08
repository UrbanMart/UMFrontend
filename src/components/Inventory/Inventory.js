import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Table, Button, Modal, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { API_BASE_URL } from '../../config';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import './Inventory.css'; 

const App = () => {
  const [inventories, setInventories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingInventory, setEditingInventory] = useState(null);
  const [newInventory, setNewInventory] = useState({
    name: '',
    quantity: '',
    reorderLevel: '',
    vendorId: ''
  });
  const [products, setProducts] = useState([]);
  const [vendors, setVendors] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));

  const fetchInventories = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/ProductInventory`);
      setInventories(response.data);
    } catch (error) {
      console.error('Error fetching inventories:', error);
    }
  };

  useEffect(() => {
    fetchInventories();
    fetchProducts();
    fetchVendors();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/products`);
      setProducts(response.data);
    } catch (error) {
      
    }
  };

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewInventory((prev) => ({ ...prev, [name]: value }));
  };

  // Add a new inventory item
  const addInventory = async () => {
    try {
      await axios.post(`${API_BASE_URL}/api/ProductInventory`, newInventory);
      setShowModal(false);
      fetchInventories(); // Refresh the inventory list
    } catch (error) {
      console.error('Error adding inventory:', error);
    }
  };

  // Edit an inventory item
  const editInventory = (inventory) => {
    setEditingInventory(inventory);
    setNewInventory(inventory);
    setShowModal(true);
  };

  // Update an inventory item
  const updateInventory = async () => {
    try {
      await axios.put(`${API_BASE_URL}/api/ProductInventory/${editingInventory.id}`, newInventory);
      setShowModal(false);
      fetchInventories(); // Refresh the inventory list
    } catch (error) {
      console.error('Error updating inventory:', error);
    }
  };

  // Delete an inventory item
  const deleteInventory = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/api/ProductInventory/${id}`);
      fetchInventories(); 
    } catch (error) {
      console.error('Error deleting inventory:', error);
    }
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


  return (
    <div className="app-container">
      <Navbar/>
     
      <Container className="flex-grow-1">
        <Row>

          <Col className="text-center my-4">
            <Button onClick={() => setShowModal(true)} style={{ float: "left" }}>
              Add New Inventory
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Quantity</th>
                  <th>Reorder Level</th>
                  <th>Vendor ID</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {inventories.map((inventory) => (
                  <tr key={inventory.id}>
                    <td>{inventory.name}</td>
                    <td>{inventory.quantity}</td>
                    <td>{inventory.reorderLevel}</td>
                    <td>{inventory.vendorId}</td>
                    <td>
                      <Button variant="warning" onClick={() => editInventory(inventory)}>
                        Edit
                      </Button>{' '}
                      <Button variant="danger" onClick={() => deleteInventory(inventory.id)}>
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>

        {/* Modal for Adding/Editing Inventory */}
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>{editingInventory ? 'Edit Inventory' : 'Add Inventory'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
            <Form.Group>
              <Form.Label>Product Name</Form.Label>
              <Form.Select
                name="name"
                value={newInventory.name}
                onChange={handleInputChange}
              >
                {products.map((product) => (
                  <option key={product.id} value={product.name}>
                    {product.name}
                  </option>
                ))}
              </Form.Select>
              </Form.Group>
              <Form.Group>
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  type="number"
                  name="quantity"
                  value={newInventory.quantity}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Reorder Level</Form.Label>
                <Form.Control
                  type="number"
                  name="reorderLevel"
                  value={newInventory.reorderLevel}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Vendor ID</Form.Label>
                <Form.Select
                  type="text"
                  name="vendorId"
                  value={newInventory.vendorId}
                  onChange={handleInputChange}
                >
                   {vendors.map((vendor) => (
                   <option key={vendor.id} value={vendor.id}>
                   {vendor.name}
                 </option>
                ))}
                </Form.Select>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={editingInventory ? updateInventory : addInventory}
            >
              {editingInventory ? 'Update Inventory' : 'Add Inventory'}
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
     
      <Footer />
    </div>
  );
};

export default App;
