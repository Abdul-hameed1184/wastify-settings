import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Loader from "../Component/Loader";
import { IDecodeToken } from "./models/decodedtoken.interface";

const ProtectedRoutes: React.FC = () => {
  const [authState, setAuthState] = useState<{
    loading: boolean;
    loggedIn: boolean;
    redirectTo?: string;
  }>({
    loading: true,
    loggedIn: false,
  });

  useEffect(() => {
    const token = sessionStorage.getItem("SESSION_AUTH_TOKEN");

    if (!token) {
      setAuthState({
        loading: false,
        loggedIn: false,
        redirectTo: "/login",
      });
      return;
    }

    try {
      const decoded:IDecodeToken = jwtDecode<IDecodeToken>(token);
      console.log(decoded)
      const isExpired =   decoded.exp ? decoded.exp < Math.floor(Date.now() / 1000) : false;
      console.log(isExpired)

      if (isExpired) {
        sessionStorage.clear();

        const redirect =
          decoded.role === 2
            ? "/admin-login"
            : "/login";

        setAuthState({
          loading: false,
          loggedIn: false,
          redirectTo: redirect,
        });
        return;
      }

      // ✅ VALID TOKEN
      setAuthState({
        loading: false,
        loggedIn: true,
      });
    } catch {
      sessionStorage.clear();
      setAuthState({
        loading: false,
        loggedIn: false,
        redirectTo: "/login",
      });
    }
  }, []);

  if (authState.loading) {
    return <Loader />;
  }

  if (!authState.loggedIn) {
    return <Navigate to={authState.redirectTo ?? "/login"} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
