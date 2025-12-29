import React from "react";

import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.tsx";
import { JSX } from "react";

// PROTECT ROUTES FROM GUESTS
const GuestProtectedRoute = ({
  children,
  route,
}: {
  children: JSX.Element;
  route: string;
}) => {
  const { user, isLoading } = useAuth();

  // Wait for user data to be loaded
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Check if the user is null (not authenticated)
  if (user === null) {
    return <Navigate to={"/" + route} />;
  }

  return children;
};

export default GuestProtectedRoute;
