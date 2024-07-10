import React, { useContext } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const ProtectedRoute = () => {
  const location = useLocation();

   let userName=JSON.parse(localStorage.getItem('userName'))
   if(!userName){
       return <Navigate to="/login" state={{ from: location }} />;
   }

  return <Outlet />;
};

export default ProtectedRoute;
