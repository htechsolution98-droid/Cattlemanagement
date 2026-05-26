import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axiosInstance from "./api/axiosInstance";

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);

  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axiosInstance.get("/gaushala/Auth/Profile");

        // ROLE CHECK
        if (res.data.role === "Admin") {
          setIsAuth(true);
        } else {
          setIsAuth(false);
        }
      } catch (error) {
        setIsAuth(false);
      }

      setLoading(false);
    };

    checkAuth();
  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (!isAuth) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
