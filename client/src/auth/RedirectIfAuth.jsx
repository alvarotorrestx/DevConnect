import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "./useAuth";

const RedirectIfAuth = () => {
    const { auth } = useAuth();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/dashboard';

    return (
        auth?.accessToken
            ? <Navigate to={from} replace />
            : <Outlet />
    );
};

export default RedirectIfAuth;
