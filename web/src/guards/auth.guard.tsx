import { FC, ReactNode } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Navigate, useLocation } from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactNode;
  redirectPath?: string;
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({ 
  children, 
  redirectPath = "/login" 
}) => {
  const location = useLocation();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace state={{ from: location }} />;
  }

  return <>{children}</>;
};

export const PublicRoute: FC<ProtectedRouteProps> = ({
  children,
  redirectPath = "/",
}) => {
  const location = useLocation();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  if (isAuthenticated) {
    return <Navigate to={redirectPath} replace state={{ from: location }} />;
  }

  return <>{children}</>;
}