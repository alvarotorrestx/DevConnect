import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "./useAuth";

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();

    return (
        auth?.role && allowedRoles?.includes(auth.role)
            ?
            <Outlet />
            :
            <Navigate to="/login" state={{ from: location }} replace />
    )
}

export default RequireAuth;