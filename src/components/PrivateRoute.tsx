import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function PrivateRoute() {
  // Mengambil status auth dari Redux store yang dibuat sebelumnya
  const { isAuthenticated } = useSelector((state: any) => state.auth);

  // Jika tidak login, redirect ke /login
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}