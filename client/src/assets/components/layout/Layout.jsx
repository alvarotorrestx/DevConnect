import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import useAuth from "../../../auth/useAuth";

const Layout = () => {
    const { auth } = useAuth();

    return (
        <>
            {auth?.accessToken && <NavBar avatar={auth?.avatar} username={auth?.username} notifications={auth?.notifications} />}
            <Outlet />
        </>
    );
};

export default Layout;
