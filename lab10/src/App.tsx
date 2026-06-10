import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthLoader } from './components/AuthLoader';
import { GuestRoute } from './components/GuestRoute';
import { Header } from './components/Header';
import { ProtectedRoute } from './components/ProtectedRoute';
import { LoginPage } from './pages/LoginPage';
import { ProfilePage } from './pages/ProfilePage';
import { RegisterPage } from './pages/RegisterPage';

function App() {
  return (
    <>
      <AuthLoader />
      <Header />
      <Routes>
        <Route element={<GuestRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
        <Route path="*" element={<Navigate to="/profile" replace />} />
      </Routes>
    </>
  );
}

export default App;
