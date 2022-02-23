import { useAppContext } from "../context/AppProvider";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user } = useAppContext();

  if (!user) {
    return <Navigate to="/landing" />;
  } else {
    return children;
  }
};

export default ProtectedRoute;
