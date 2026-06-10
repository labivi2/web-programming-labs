import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

export function Header() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header>
      <Link to="/">Auth App</Link>
      <nav>
        {user ? (
          <>
            <span>{user.email}</span>
            <button onClick={handleLogout}>Вийти</button>
          </>
        ) : (
          <>
            <Link to="/login">Увійти</Link>
            <Link to="/register">Зареєструватися</Link>
          </>
        )}
      </nav>
    </header>
  );
}
