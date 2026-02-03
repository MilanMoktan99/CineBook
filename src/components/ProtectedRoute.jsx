import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function ProtectedRoute({ children }) {
  const uid = Cookies.get("uid");
  if (!uid) return <Navigate to="/login" />;
  return children;
}
