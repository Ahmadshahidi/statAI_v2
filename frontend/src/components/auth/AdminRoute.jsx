import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import LoadingScreen from '../ui/LoadingScreen';

function AdminRoute() {
  const { loading, isAdmin } = useAuth();

  // Show loading screen while checking authentication
  if (loading) {
    return <LoadingScreen />;
  }

  // Redirect to home if not an admin
  if (!isAdmin) {
    return <Navigate to="/\" replace />;
  }

  // Render the admin content
  return <Outlet />;
}

export default AdminRoute;