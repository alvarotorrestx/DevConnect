import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { IoMdEyeOff, IoMdEye } from 'react-icons/io'

const Login = () => {

    const errRef = useRef();

    const [errMsg, setErrMsg] = useState('');

    // For visible/non visible password icon
    const [passwordType, setPasswordType] = useState('password');

    const handleChange = (e) => {

    }

    const handleLogin = (e) => {
        e.preventDefault();
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
                                onChange={handleChange}
                                id='email'
                                type="email"
                                autoComplete='email'
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
                                <span className='ml-2 text-sm'>Remember me</span>
                            </label>
                        </div>
                        {/* End Options Fields */}


                        {/* Login Button */}
                        <div className="form-control mt-6">
                            <button
                                className="btn btn-primary">Login</button>
                            <label className="label mt-2">
                                <Link to="/register" className="label-text-alt link link-hover">Not a member yet? Register here!</Link>
                            </label>
                        </div>
                        {/* End Login Button */}

                    </form>
                </div>
            </div>
        </div >
    )
}

export default Login