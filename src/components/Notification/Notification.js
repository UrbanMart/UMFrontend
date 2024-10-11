import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Table,
  Button,
  Modal,
  Form,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { API_BASE_URL } from "../../config";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";

const NotificationManagement = () => {
  const [notifications, setNotifications] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingNotification, setEditingNotification] = useState(null);
  const [users, setUsers] = useState([]);
  const [newNotification, setNewNotification] = useState({
    userId: "",
    message: "",
    isRead: false,
    type: "",
    relatedOrderId: "",
  });

  const user = JSON.parse(localStorage.getItem("user"));

  const fetchNotifications = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/notifications`);
      setNotifications(response.data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/users`);
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchNotifications();
    fetchUsers();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewNotification((prev) => ({ ...prev, [name]: value }));
  };

  // Add new notification
  const addNotification = async () => {
    try {
      await axios.post(`${API_BASE_URL}/api/notifications`, newNotification);
      setShowModal(false);
      fetchNotifications();
    } catch (error) {
      console.error("Error adding notification:", error);
    }
  };

  // Edit existing notification
  const editNotification = (notification) => {
    setEditingNotification(notification);
    setNewNotification(notification);
    setShowModal(true);
  };

  // Update existing notification
  const updateNotification = async () => {
    try {
      await axios.put(
        `${API_BASE_URL}/api/notifications/${editingNotification.id}`,
        newNotification
      );
      setShowModal(false);
      fetchNotifications();
    } catch (error) {
      console.error("Error updating notification:", error);
    }
  };

  // Delete a notification
  const deleteNotification = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/api/notifications/${id}`);
      fetchNotifications();
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };

  const filteredNotifications = notifications.filter((notification) => {
    if (user.role === "Vendor") {
      return notification.type === "Restock";
    } else if (user.role === "CSR") {
      return (
        notification.type === "Delivery" ||
        notification.type === "OrderCancellation" ||
        notification.type === "CancellationApproval"
      );
    } 
    else {
      return true; 
    }
  });

  // Approve a notification
  const approveNotification = async (id) => {
    try {
      // Send the request to approve the cancellation
      const response = await axios.put(`${API_BASE_URL}/api/Orders/${id}/approve-cancellation`, {});
      
      if (response.status === 200) {
        // Assuming 200 status means success
        alert(`Order ${id} cancellation has been successfully approved.`);
      } else {
        alert(`Approval of order ${id} cancellation encountered an issue.`);
      }
  
      fetchNotifications();
    } catch (error) {
      console.error("Error approving notification:", error);
      alert(`Error approving order ${id} cancellation: ${error.message}`);
    }
  };
  

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <Container className="flex-grow-1">
        <Row className="mt-4">
          <Col className="text-center">
            <Button
              onClick={() => setShowModal(true)}
              style={{ float: "left", marginBottom: "10px" }}
            >
              Add New Notification
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>User ID</th>
                  <th>Message</th>
                  <th>Status</th>
                  <th>Type</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredNotifications.map((notification) => {
                  // Extract the order ID from the message using a regular expression
                  const orderIdMatch =
                    notification.message.match(/order (\w+)/);
                  const orderId = orderIdMatch ? orderIdMatch[1] : null;

                  return (
                    <tr key={notification.id}>
                      <td>{notification.userId}</td>
                      <td>{notification.message}</td>
                      <td>{notification.isRead ? "Read" : "Unread"}</td>
                      <td>{notification.type}</td>
                      <td>
                        {notification.type === "OrderCancellation" &&
                        orderId ? (
                          <Button
                            variant="success"
                            onClick={() => approveNotification(orderId)}
                          >
                            Approve
                          </Button>
                        ) : (
                          <>
                            <Button
                              variant="warning"
                              onClick={() => editNotification(notification)}
                            >
                              Edit
                            </Button>{" "}
                            <Button
                              variant="danger"
                              onClick={() =>
                                deleteNotification(notification.id)
                              }
                            >
                              Delete
                            </Button>
                          </>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Col>
        </Row>

        {/* Modal for Adding/Editing Notification */}
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>
              {editingNotification ? "Edit Notification" : "Add Notification"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>User ID</Form.Label>
                <Form.Control
                  type="text"
                  name="userId"
                  value={newNotification.userId}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Message</Form.Label>
                <Form.Control
                  type="text"
                  name="message"
                  value={newNotification.message}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Status</Form.Label>
                <Form.Check
                  type="checkbox"
                  name="isRead"
                  checked={newNotification.isRead}
                  onChange={(e) =>
                    setNewNotification((prev) => ({
                      ...prev,
                      isRead: e.target.checked,
                    }))
                  }
                  label="Mark as read"
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Type</Form.Label>
                <Form.Control
                  type="text"
                  name="type"
                  value={newNotification.type}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Related Order ID</Form.Label>
                <Form.Control
                  type="text"
                  name="relatedOrderId"
                  value={newNotification.relatedOrderId}
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={
                editingNotification ? updateNotification : addNotification
              }
            >
              {editingNotification ? "Update Notification" : "Add Notification"}
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
      <Footer />
    </div>
  );
};

export default NotificationManagement;
