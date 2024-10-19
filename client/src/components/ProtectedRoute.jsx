/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import { useLoggedInUser } from "./login/useGetLoggedInUser";

const ProtectedRoute = ({ children }) => {
  const { data: user, isLoading } = useLoggedInUser();

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!user?.user?.isAdmin) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
