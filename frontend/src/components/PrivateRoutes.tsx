import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export const PrivateRoutes = () => {
  const { userId, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>;
  }
  return userId ? <Outlet /> : <Navigate to="/login" />;
};
