
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const PrivateRoute = () => {
  const location = useLocation();

   let isAdmin=JSON.parse(localStorage.getItem('isAdmin'))
   let userName=JSON.parse(localStorage.getItem('userName'))

   if(!userName){
    return <Navigate to="/login" />;
    }
   if(!isAdmin){
       return <Navigate to="/Profile" />;
   }

  return <Outlet />;
};

export default PrivateRoute;