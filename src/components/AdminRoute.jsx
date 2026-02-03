import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function AdminRoute({ children }) {
  const role = Cookies.get("role");
  if (role !== "admin") return <Navigate to="/" />; // redirect non-admins
  return children;
}
