import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  return user ? <>{children}</> : <Navigate to="/login" />;
}