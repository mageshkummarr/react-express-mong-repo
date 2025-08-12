// import { Navigate } from 'react-router-dom';
// import { useContext } from 'react';
// import { AuthContext } from '../../context/AuthContext';

// const ProtectedRoute = ({ children }) => {
//   const { auth } = useContext(AuthContext);

//   // Check if user is authenticated (either from context or localStorage)
//   const isAuthenticated = auth || localStorage.getItem('auth') === 'true';

//   console.log('ProtectedRoute check:', { auth, isAuthenticated, path: window.location.pathname });

//   if (!isAuthenticated) {
//     console.log('User not authenticated, redirecting to login');
//     return <Navigate to="/login" replace />;
//   }

//   console.log('User authenticated, rendering children');
//   return children;
// };

// export default ProtectedRoute;
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import Cookies from 'js-cookie';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { auth } = useContext(AuthContext);
  const role = Cookies.get('role');

  if (!auth) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && role !== requiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
