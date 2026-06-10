import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthLoader } from './components/AuthLoader';
import { GuestRoute } from './components/GuestRoute';
import { ProtectedRoute } from './components/ProtectedRoute';

function App() {
  return (
    <>
      <AuthLoader />
      <Routes>
        <Route element={<GuestRoute />}>
          <Route path="/login" element={<h1>Вхід</h1>} />
          <Route path="/register" element={<h1>Реєстрація</h1>} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<h1>Профіль</h1>} />
        </Route>
        <Route path="*" element={<Navigate to="/profile" replace />} />
      </Routes>
    </>
  );
}

export default App;
