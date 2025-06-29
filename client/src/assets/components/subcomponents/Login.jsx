import { useRef, useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { IoMdEyeOff, IoMdEye } from "react-icons/io";
import axios from "../../../api/axios";
import { FaTimesCircle } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import useAuth from "../../../auth/useAuth";
import useRefreshToken from '../../../auth/useRefreshToken'

// Toast imports
import ErrorToast from "../toast/ErrorToast";
import { useErrorToast } from "../toast/useErrorToast";
import SuccessToast from "../toast/SuccessToast";
import { useSuccessToast } from "../toast/useSuccessToast";

const LOGIN_URL = "/auth";

const Login = () => {
  const { setAuth, persist, setPersist } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const refresh = useRefreshToken();
  const from = location.state?.from?.pathname || "/dashboard";

  const [formData, setFormData] = useState({
    login: "",
    password: "",
  });

  const loginRef = useRef();
  useEffect(() => {
    loginRef.current.focus();
  }, []);

  const [passwordType, setPasswordType] = useState("password");
  const [buttonStatus, setButtonStatus] = useState("Login");

  // Toast hooks with renamed variables to avoid conflict
  const {
    message: errorMessage,
    show: showErrorToast,
    showError,
  } = useErrorToast();

  const {
    message: successMessage,
    show: showSuccessToast,
    showSuccess,
  } = useSuccessToast();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setButtonStatus("Loading...");

    const v1 = formData.login.trim() !== "";
    const v2 = formData.password.trim() !== "";

    if (!v1 || !v2) {
      showError("Invalid Entry");
      setButtonStatus("Login");
      return;
    }

    try {
      const response = await axios.post(
        LOGIN_URL,
        {
          ...formData,
          persist,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      const accessToken = response?.data?.accessToken;
      const username = response?.data?.user.username;
      const role = response?.data?.user.role;

      
      showSuccess("Login Successful");
      setTimeout(async () => {
        setAuth({ login: formData.login, username, role, accessToken });
        await refresh();
        navigate(from, { replace: true });
      }, 1500);
    } catch (err) {
      if (!err?.response) {
        showError("No Server Response");
      } else if (err.response?.status === 401 || err.response?.status === 400) {
        showError(`${JSON.stringify(err.response.data.message).slice(1, -1)}`);
      } else {
        showError("Login Failed");
      }
      setButtonStatus("Login");
    }
  };

  const togglePersist = () => setPersist((prev) => !prev);

  useEffect(() => {
    localStorage.setItem("persist", persist);
  }, [persist]);

  return (
    <div className="hero bg-base-200 min-h-[calc(100vh-48px)] overflow-hidden">
      <div className="hero-content w-full max-w-[725px] lg:max-w-[1000px] flex-col lg:flex-row justify-around">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">DevConnect</h1>
          <p className="py-6 lg:mr-10">
            The Platform for Developers to Connect and Grow.
          </p>
        </div>

        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-md mt-4 lg:mt-0">
          <form className="card-body" onSubmit={handleLogin}>
            <h1 className="text-2xl font-bold">Login</h1>
            <p className="text-sm">Welcome back! Login to start connecting!</p>

            {/* Username or Email field */}
            <div className="form-control mt-6">
              <label className="label">
                <span className="label-text">Username or Email</span>
              </label>
              <input
                ref={loginRef}
                onChange={handleChange}
                id="login"
                type="text"
                autoComplete="off"
                placeholder="Enter your username or email address"
                className="input input-bordered"
                required
                value={formData.login}
              />
            </div>

            {/* Password Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <div className="relative">
                <input
                  onChange={handleChange}
                  id="password"
                  type={passwordType}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  className="input input-bordered w-full"
                  required
                  value={formData.password}
                />
                {passwordType === "password" ? (
                  <IoMdEyeOff
                    className="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer"
                    onClick={() => setPasswordType("text")}
                  />
                ) : (
                  <IoMdEye
                    className="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer"
                    onClick={() => setPasswordType("password")}
                  />
                )}
              </div>
            </div>

            {/* Keep me logged in */}
            <div className="form-control mt-4">
              <label className="fieldset-label flex justify-start items-center">
                <input
                  type="checkbox"
                  className="checkbox checkbox-sm checkbox-primary"
                  onChange={togglePersist}
                  checked={persist}
                />
                <span className="ml-2 text-sm">
                  Keep me logged in for 15 days
                </span>
              </label>
            </div>

            {/* Login Button */}
            <div className="form-control mt-6">
              <button
                className="btn btn-primary"
                disabled={buttonStatus === "Loading..."}
              >
                {buttonStatus}
              </button>
              <label className="label mt-2">
                <Link to="/register" className="label-text-alt link link-hover">
                  Not a member yet? Register here!
                </Link>
              </label>
            </div>
          </form>
        </div>
      </div>

      {/* Toasts line no 84  success msg can edit if you want AI*/}
      <SuccessToast
        message={successMessage}
        show={showSuccessToast}
        status="success"
        icon={<FaCheckCircle className="text-[--tertiary] text-2xl" />}
      />
      <ErrorToast
        message={errorMessage}
        show={showErrorToast}
        status="error"
        icon={<FaTimesCircle className="text-red-600 text-2xl" />}
        iconBgColor="bg-red-700"
      />
    </div>
  );
};

export default Login;