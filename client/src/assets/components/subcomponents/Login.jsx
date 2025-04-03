import React, { useRef, useEffect, useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { IoMdEyeOff, IoMdEye } from 'react-icons/io'
import axios from '../../../api/axios'
import useAuth from '../../../auth/useAuth';


// Login url for post
const LOGIN_URL = '/auth';

const Login = () => {

    const { setAuth } = useAuth();

    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || '/dashboard';

    const [formData, setFormData] = useState({
        login: '',
        password: '',
    });

    const loginRef = useRef();

    useEffect(() => {
        loginRef.current.focus();
    }, []);

    const errRef = useRef();

    const [errMsg, setErrMsg] = useState('');

    // For visible/non visible password icon
    const [passwordType, setPasswordType] = useState('password');

    const [buttonStatus, setButtonStatus] = useState('Login');

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
    }

    const handleLogin = async (e) => {
        e.preventDefault();

        try {

            setButtonStatus('Loading...');

            // Validation to prevent submitting empty entries
            const v1 = formData.login.trim() !== '';
            const v2 = formData.password.trim() !== '';

            if (!v1 || !v2) {
                setErrMsg('Invalid Entry');
                setButtonStatus('Login');
                return;
            }

            const response = await axios.post(LOGIN_URL, formData, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });

            const accessToken = response?.data?.accessToken;
            const role = response?.data?.user.role;

            setAuth({ login: formData.login, role, accessToken });
            
            navigate(from, { replace: true });
        }
        catch (err) {
            // If no error response
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 401 || err.response?.status === 400) { // Invalid credentials / All fields required
                setErrMsg(`${JSON.stringify(err.response.data.message).slice(1, -1)}`);
            } else {
                setErrMsg('Login Failed');
            }

            errRef.current.focus();
            setButtonStatus('Login');
        }
    }

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

                        <div className={errMsg ? "alert alert-error animate-fade" : "offscreen"} tabIndex="-1" ref={errRef} aria-live='assertive'>
                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            <span>{errMsg}</span>
                        </div>

                        <h1 className="text-2xl font-bold">Login</h1>
                        <p className="text-sm">
                            Welcome back! Login to start connecting!
                        </p>

                        {/* Username or Email field */}
                        <div className="form-control mt-6">
                            <label className="label">
                                <span className="label-text">Username or Email</span>
                            </label>
                            <input
                                ref={loginRef}
                                onChange={handleChange}
                                id='login'
                                type="text"
                                autoComplete="off"
                                placeholder="Enter your username or email address"
                                className="input input-bordered"
                                required
                                value={formData.login}
                            />
                        </div>
                        {/* End Username or Email Field */}


                        {/* Password Field */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <div className='relative'>
                                <input
                                    onChange={handleChange}
                                    id='password'
                                    type={passwordType}
                                    autoComplete='current-password'
                                    placeholder="Enter your password"
                                    className="input input-bordered w-full"
                                    required
                                    value={formData.password}
                                />
                                {
                                    passwordType === "password"
                                        ?
                                        <IoMdEyeOff className='absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer' onClick={(e) => setPasswordType('text')} />
                                        :
                                        <IoMdEye className='absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer' onClick={(e) => setPasswordType('password')} />
                                }
                            </div>
                            {/* <label className="label">
                                    <Link to="/register" className="label-text-alt link link-hover">Forgot your password? Click here!</Link>
                                </label> */}
                        </div>
                        {/* End Password Field */}


                        {/* Options Fields */}
                        {/* <div className="form-control mt-4">
                                <label className="fieldset-label flex justify-start items-center">
                                    <input type="checkbox" defaultChecked className="checkbox checkbox-sm checkbox-primary" />
                                    <span className='ml-2 text-sm'>Keep me logged in for 15 days</span>
                                </label>
                            </div> */}
                        {/* End Options Fields */}


                        {/* Login Button */}
                        <div className="form-control mt-6">
                            <button
                                className="btn btn-primary" disabled={buttonStatus === 'Loading...'}>{buttonStatus}</button>
                            <label className="label mt-2">
                                <Link to="/register" className="label-text-alt link link-hover">Not a member yet? Register here!</Link>
                            </label>
                        </div>
                        {/* End Login Button */}

                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login