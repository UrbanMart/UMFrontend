import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Table, Button, Modal, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { API_BASE_URL } from '../../config';
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';
import './Order.css';


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
  const [products, setProducts] = useState([]);

  // Fetch all orders
  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/Orders`);
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/products`);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  // Mark an item as delivered
  const markItemAsDelivered = async (orderId, productId, vendorId) => {
    try {
      await axios.patch(`${API_BASE_URL}/api/Orders/${orderId}/markitemasdelivered/${productId}/${vendorId}`);
      fetchOrders(); // Refresh the order list after marking as delivered
      setShowModal(false); // Close the modal
    } catch (error) {
      console.error('Error marking item as delivered:', error);
    }
  };

  useEffect(() => {
    fetchOrders();
    fetchProducts();
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

    // Calculate total price based on quantity and unit price
    const quantity = updatedItems[index].quantity;
    const unitPrice = updatedItems[index].unitPrice;
    updatedItems[index].totalPrice = quantity * unitPrice;

    setNewOrder((prev) => ({ ...prev, orderItems: updatedItems }));
  };

  // Add new order
  const addOrder = async () => {
    try {
      await axios.post(`${API_BASE_URL}/api/Orders`, newOrder);
      setShowModal(false);
      fetchOrders();
      resetForm();
    } catch (error) {
      console.error('Error adding order:', error);
    }
  };

  // Edit existing order
  const editOrder = (order) => {
    // Format the orderDate to YYYY-MM-DD
    const formattedOrderDate = new Date(order.orderDate).toISOString().split('T')[0];
  
    // Set the formatted orderDate in the newOrder object
    setEditingOrder(order);
    setNewOrder({
      ...order,
      orderDate: formattedOrderDate, // Set the formatted date
    });
    setShowModal(true);
  };
  

  // Update existing order
  const updateOrder = async () => {
    try {
      await axios.put(`${API_BASE_URL}/api/Orders/${editingOrder.id}`, newOrder);
      setShowModal(false);
      fetchOrders();
      resetForm();
    } catch (error) {
      console.error('Error updating order:', error);
    }
  };

  // Delete an order
  const deleteOrder = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/api/Orders/${id}`);
      fetchOrders();
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  // Reset form fields
  const resetForm = () => {
    setNewOrder({
      customerName: '',
      orderDate: '',
      totalAmount: '',
      status: '',
      orderItems: [{ productId: '', productName: '', quantity: 0, unitPrice: 0, totalPrice: 0 }],
    });
    setEditingOrder(null);
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <Container className="flex-grow-1 container">
        <Row className="mt-4">
          <Col className="text-center">
            <Button onClick={() => setShowModal(true)} style={{ float: 'left' }} className="btn">
              Add New Order
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <Table striped bordered hover className="table">
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
                        disabled={order.status === 'Dispatched' || order.status === 'Delivered' || order.status === 'Cancelled'}
                      >
                        Edit
                      </Button>{' '}
                      <Button
                        variant="danger"
                        onClick={() => deleteOrder(order.id)}
                        disabled={order.status === 'Dispatched' || order.status === 'Delivered' || order.status === 'Cancelled'}
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
        <Modal show={showModal} onHide={() => setShowModal(false)} onExited={resetForm}>
          <Modal.Header closeButton className="modal-header">
            <Modal.Title>{editingOrder ? 'Edit Order' : 'Add Order'}</Modal.Title>
          </Modal.Header>
          <Modal.Body className="modal-body">
            <Form>
              <Form.Group>
                <Form.Label>Customer Name</Form.Label>
                <Form.Control
                  type="text"
                  name="customerName"
                  value={newOrder.customerName}
                  onChange={handleInputChange}
                  placeholder="Enter customer's name"
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
                  placeholder="Enter total amount"
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Status</Form.Label>
                <Form.Control
                  as="select"
                  name="status"
                  value={newOrder.status}
                  onChange={handleInputChange}
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
                <div key={index} className="order-item">
                  <h5>Item {index + 1}</h5>
                  <Form.Group>
                    <Form.Label>Product Name</Form.Label>
                    <Form.Select
                      name="productId"
                      value={item.productId}
                      onChange={(e) => handleOrderItemChange(index, e)}
                    >
                      <option value="">Select a product</option>
                      {products.map((product) => (
                        <option key={product.id} value={product.id}>
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
                      readOnly
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Status</Form.Label>
                    <Form.Control
                      type="text"
                      name="status"
                      value={item.status}
                      readOnly
                    />
                  </Form.Group>

                  <div className="d-flex align-items-center mt-2">
                    <Button
                      variant="danger"
                      onClick={() => {
                        const updatedItems = newOrder.orderItems.filter((_, i) => i !== index);
                        setNewOrder((prev) => ({ ...prev, orderItems: updatedItems }));
                      }}
                    >
                      Remove Item
                    </Button>

                    <div className="mx-3"></div>

                    <Button
                      variant="success"
                      onClick={() => markItemAsDelivered(editingOrder.id, item.productId, item.vendorId)}
                    >
                      Mark as Delivered
                    </Button>
                  </div>
                </div>
              ))}

              <Button
                variant="primary"
                className="add-item-btn"
                onClick={() =>
                  setNewOrder((prev) => ({
                    ...prev,
                    orderItems: [...prev.orderItems, { productId: '', productName: '', quantity: 0, unitPrice: 0, totalPrice: 0 }],
                  }))
                }
              >
                Add Order Item
              </Button>
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
