import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import useAuth from "./useAuth";
import useAxiosPrivate from "./useAxiosPrivate";

const RequireAuth = ({ allowedRoles }) => {
    const { auth, setAuth } = useAuth();
    const location = useLocation();
    const axiosPrivate = useAxiosPrivate();

    const [isVerified, setIsVerified] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const verifyToken = async () => {
            try {
                const res = await axiosPrivate.get('/auth/verify');
                setIsVerified(true);
            } catch (err) {
                setAuth({});
            } finally {
                setIsLoading(false);
            }
        };

        verifyToken();
    }, []);

    if (isLoading) return <p>Loading...</p>;

    return (
        auth?.role && allowedRoles.includes(auth.role)
            ? <Outlet />
            : auth?.role
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/login" state={{ from: location }} replace />
    );
};

export default RequireAuth;
