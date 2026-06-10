import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

export function GuestRoute() {
  const user = useAuthStore((state) => state.user);
  const isLoading = useAuthStore((state) => state.isLoading);

  if (isLoading) {
    return <p>Завантаження...</p>;
  }

  return user ? <Navigate to="/profile" replace /> : <Outlet />;
}
