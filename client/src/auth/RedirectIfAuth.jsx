import { Navigate, Outlet } from "react-router-dom";
import useAuth from "./useAuth";

const RedirectIfAuth = () => {
    const { auth } = useAuth();

    return (
        auth?.accessToken
            ? <Navigate to="/dashboard" replace />
            : <Outlet />
    );
};

export default RedirectIfAuth;
