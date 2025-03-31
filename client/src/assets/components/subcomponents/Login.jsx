import React, { useContext, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { IoMdEyeOff, IoMdEye } from 'react-icons/io'
import AuthContext from '../../context/AuthContext';

// Login url for post
const LOGIN_URL = 'http://localhost:5000/auth';

const Login = () => {

    const { setAuth } = useContext(AuthContext)

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        login: '',
        password: '',
    });

    const errRef = useRef();

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

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
            });

            const accessToken = response?.data?.accessToken;
            const role = response?.data?.role;

            setAuth({ login, password, role, accessToken });
            setSuccess(true);
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
                    {success ?
                        <div className="card-body w-full mx-auto animate-fade">
                            <div className="flex items-center space-x-3 flex-col lg:flex-row">
                                <div className="valid">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div className='mt-4 lg:mt-0'>
                                    <h2 className="text-xl font-bold">{formData.login} successfully logged in. ✅</h2>
                                    <p className="text-md mt-1">Welcome back to DevConnect!</p>
                                    <p className="text-md mt-1">You’re all set to start connecting with developers.</p>
                                    <p className="text-md mt-1"><Link to="/dashboard" className="link link-primary">
                                        Go to Dashboard
                                    </Link></p>
                                </div>
                            </div>
                        </div>
                        :
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
                                    onChange={handleChange}
                                    id='login'
                                    type="text"
                                    autoComplete="off"
                                    placeholder="Enter your username or email address"
                                    className="input input-bordered"
                                    required
                                // value={formData.email}
                                // aria-invalid={validEmail ? "false" : "true"}
                                // aria-describedby='emailnote'
                                // onFocus={() => setEmailFocus(true)}
                                // onBlur={() => setEmailFocus(false)}
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
                                    // value={formData.password}
                                    // aria-invalid={validPassword ? "false" : "true"}
                                    // aria-describedby='passwordnote'
                                    // onFocus={() => setPasswordFocus(true)}
                                    // onBlur={() => setPasswordFocus(false)}
                                    />
                                    {
                                        passwordType === "password"
                                            ?
                                            <IoMdEyeOff className='absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer' onClick={(e) => setPasswordType('text')} />
                                            :
                                            <IoMdEye className='absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer' onClick={(e) => setPasswordType('password')} />
                                    }
                                </div>
                                <label className="label">
                                    <Link to="/register" className="label-text-alt link link-hover">Forgot your password? Click here!</Link>
                                </label>
                            </div>
                            {/* End Password Field */}


                            {/* Options Fields */}
                            <div className="form-control mt-4">
                                <label className="fieldset-label flex justify-start items-center">
                                    <input type="checkbox" defaultChecked className="checkbox checkbox-sm checkbox-primary" />
                                    <span className='ml-2 text-sm'>Keep me logged in for 15 days</span>
                                </label>
                            </div>
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
                    }
                </div>
            </div>
        </div>
    )
}

export default Login