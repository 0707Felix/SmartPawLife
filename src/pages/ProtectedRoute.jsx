import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const token = document.cookie.replace(
    /(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/,
    "$1"
  );

  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
