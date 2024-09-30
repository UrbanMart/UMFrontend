import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Table, Button, Modal, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { API_BASE_URL } from '../../config';
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const [newOrder, setNewOrder] = useState({
    customerName: '',
    orderDate: '',
    totalAmount: '',
    status: '',
    orderItems: [{ productId: '', productName: '', quantity: 0, unitPrice: 0, totalPrice: 0 }],
  });

  // Fetch all orders
  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/Orders`);
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewOrder((prev) => ({ ...prev, [name]: value }));
  };

  // Handle order items changes
  const handleOrderItemChange = (index, e) => {
    const { name, value } = e.target;
    const updatedItems = [...newOrder.orderItems];
    updatedItems[index] = { ...updatedItems[index], [name]: value };
    setNewOrder((prev) => ({ ...prev, orderItems: updatedItems }));
  };

  // Add new order
  const addOrder = async () => {
    try {
      await axios.post(`${API_BASE_URL}/api/Orders`, newOrder);
      setShowModal(false);
      fetchOrders();
    } catch (error) {
      console.error('Error adding order:', error);
    }
  };

  // Edit existing order
  const editOrder = (order) => {
    // Prevent editing if the order is already dispatched
    if (order.status === 'Dispatched' || order.status === 'Delivered') {
      alert('This order cannot be edited because it has already been dispatched.');
      return;
    }
    setEditingOrder(order);
    setNewOrder(order);
    setShowModal(true);
  };

  // Update existing order
  const updateOrder = async () => {
    if (newOrder.status === 'Dispatched' || newOrder.status === 'Delivered') {
      alert('Order cannot be updated as it has already been dispatched or delivered.');
      return;
    }
    try {
      await axios.put(`${API_BASE_URL}/api/Orders/${editingOrder.id}`, newOrder);
      setShowModal(false);
      fetchOrders();
    } catch (error) {
      console.error('Error updating order:', error);
    }
  };

  // Delete an order
  const deleteOrder = async (id, status) => {
    if (status === 'Dispatched' || status === 'Delivered') {
      alert('Order cannot be deleted as it has already been dispatched or delivered.');
      return;
    }
    try {
      await axios.delete(`${API_BASE_URL}/api/Orders/${id}`);
      fetchOrders();
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };
  

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <Container className="flex-grow-1">
        <Row className="mt-4">
          <Col className="text-center">
            <Button onClick={() => setShowModal(true)} style={{ float: 'left' }}>
              Add New Order
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Customer Name</th>
                  <th>Order Date</th>
                  <th>Total Amount</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.customerName}</td>
                    <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                    <td>{order.totalAmount}</td>
                    <td>{order.status}</td>
                    <td>
                      <Button
                        variant="warning"
                        onClick={() => editOrder(order)}
                        disabled={order.status === 'Dispatched' || order.status === 'Delivered'}
                      >
                        Edit
                      </Button>{' '}
                      <Button
                        variant="danger"
                        onClick={() => deleteOrder(order.id, order.status)}
                        disabled={order.status === 'Dispatched' || order.status === 'Delivered'}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>

        {/* Modal for Adding/Editing Order */}
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>{editingOrder ? 'Edit Order' : 'Add Order'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>Customer Name</Form.Label>
                <Form.Control
                  type="text"
                  name="customerName"
                  value={newOrder.customerName}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Order Date</Form.Label>
                <Form.Control
                  type="date"
                  name="orderDate"
                  value={newOrder.orderDate}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Total Amount</Form.Label>
                <Form.Control
                  type="number"
                  name="totalAmount"
                  value={newOrder.totalAmount}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Status</Form.Label>
                <Form.Control
                  as="select"
                  name="status"
                  value={newOrder.status}
                  onChange={handleInputChange}
                  disabled={editingOrder && editingOrder.status === 'Dispatched'}
                >
                  <option value="Processing">Processing</option>
                  <option value="Dispatched">Dispatched</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </Form.Control>
              </Form.Group>

              {/* Order Items */}
              <Form.Label>Order Items</Form.Label>
              {newOrder.orderItems.map((item, index) => (
                <div key={index}>
                  <Form.Group>
                    <Form.Label>Product Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="productName"
                      value={item.productName}
                      onChange={(e) => handleOrderItemChange(index, e)}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control
                      type="number"
                      name="quantity"
                      value={item.quantity}
                      onChange={(e) => handleOrderItemChange(index, e)}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Unit Price</Form.Label>
                    <Form.Control
                      type="number"
                      name="unitPrice"
                      value={item.unitPrice}
                      onChange={(e) => handleOrderItemChange(index, e)}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Total Price</Form.Label>
                    <Form.Control
                      type="number"
                      name="totalPrice"
                      value={item.totalPrice}
                      onChange={(e) => handleOrderItemChange(index, e)}
                    />
                  </Form.Group>
                </div>
              ))}
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={editingOrder ? updateOrder : addOrder}>
              {editingOrder ? 'Update Order' : 'Add Order'}
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
      <Footer />
    </div>
  );
};

export default OrderManagement;
