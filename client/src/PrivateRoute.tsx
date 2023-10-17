import React from 'react';
import { Navigate, useLocation, useNavigation } from "react-router-dom";
import Layout from './components/Layout';
import { setupInterceptors } from './services/client/axiosHelper';
import { isLoggedIn } from './services/lsService';

const PrivateRoute = ({ children }: { children: React.ReactNode}) => {
  const currentUser = isLoggedIn();
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // return <>{children}</>;
  return <Layout>{children}</Layout>;
};

export default PrivateRoute;