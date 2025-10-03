import React, { JSX } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../redux/store";

interface PrivateRouteProps {
  element: JSX.Element;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
  const authenticated = useAppSelector(state => state.user.authenticated);
  return authenticated ? element : Navigate({ 'to': '/login' });
};