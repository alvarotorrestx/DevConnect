import { useNavigate } from "react-router-dom";
import useAuth from "../../auth/useAuth";

const Dashboard = () => {
    const { setAuth } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        setAuth({});
        navigate("/login");
    };
    
    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center">
            <h1 className="text-4xl font-bold mb-4">Welcome to the Dashboard</h1>
            <p className="mb-6 text-lg">You're logged in successfully 🎉</p>
            <button
                onClick={handleLogout}
                className="btn px-4 py-2 rounded hover:btn-primary"
            >
                Logout
            </button>
        </div>
    );
};

export default Dashboard;
