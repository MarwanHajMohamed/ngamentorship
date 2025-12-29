import React from "react";

import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.tsx";
import { JSX } from "react";

// PROTECT ROUTES FROM LOGGED IN USERS
const UserProtectedRoute = ({
  children,
  route,
}: {
  children: JSX.Element;
  route: string;
}) => {
  const { user } = useAuth();

  if (user) {
    return <Navigate to={"/" + route} />;
  }

  return children;
};

export default UserProtectedRoute;
