import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element }) => {
  const user = JSON.parse(localStorage.getItem('user')); // Check for user in localStorage

  // If no user is found, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If user is found, render the passed element
  return element;
};

export default PrivateRoute;
