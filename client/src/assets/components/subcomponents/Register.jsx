import React, { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { IoMdEyeOff, IoMdEye } from 'react-icons/io'

// REGEX for validation
const NAME_REGEX = /^[a-zA-Z][a-zA-Z- ]{1,50}$/
const USERNAME_REGEX = /^[a-z0-9-]{5,30}$/;
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/

// Register url for post
const REGISTER_URL = 'http://localhost:5000/register';

const Register = () => {

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        passwordMatch: ''
    });

    const firstNameRef = useRef();
    const errRef = useRef();

    const [firstName, setFirstName] = useState('');
    const [validFirstName, setValidFirstName] = useState(false);
    const [firstnameFocus, setFirstNameFocus] = useState(false);

    const [lastName, setLastName] = useState('');
    const [validLastName, setValidLastName] = useState(false);
    const [lastnameFocus, setLastNameFocus] = useState(false);

    const [username, setUsername] = useState('');
    const [validUsername, setValidUsername] = useState(false);
    const [usernameFocus, setUsernameFocus] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);

    const [matchingPassword, setMatchingPassword] = useState('');
    const [validMatchingPassword, setValidMatchingPassword] = useState(false);
    const [matchingPasswordFocus, setMatchingPasswordFocus] = useState(false);

    // For visible/non visible password icon
    const [passwordType, setPasswordType] = useState('password');
    const [matchingPasswordType, setMatchingPasswordType] = useState('password');

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    const [buttonStatus, setButtonStatus] = useState('Sign Up');

    useEffect(() => {
        firstNameRef.current.focus();
    }, []);

    useEffect(() => {
        setValidFirstName(NAME_REGEX.test(formData.firstName));
    }, [formData.firstName]);

    useEffect(() => {
        setValidLastName(NAME_REGEX.test(formData.lastName));
    }, [formData.lastName]);

    useEffect(() => {
        setValidUsername(USERNAME_REGEX.test(formData.username));
    }, [formData.username]);

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(formData.email));
    }, [formData.email]);

    useEffect(() => {
        const isValid = PASSWORD_REGEX.test(formData.password);
        setValidPassword(isValid);

        const match = formData.password === formData.passwordMatch;
        setValidMatchingPassword(match);
    }, [formData.password, formData.passwordMatch]);

    useEffect(() => {
        setErrMsg('')
    }, [firstName, lastName, email, password, matchingPassword]);


    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
    };


    const handleRegister = async (e) => {
        e.preventDefault();

        try {

            setButtonStatus('Loading...');

            // Validation to prevent submitting empty entries
            const v1 = NAME_REGEX.test(formData.firstName);
            const v2 = NAME_REGEX.test(formData.lastName);
            const v3 = USERNAME_REGEX.test(formData.username);
            const v4 = EMAIL_REGEX.test(formData.email);
            const v5 = PASSWORD_REGEX.test(formData.password);

            if (!v1 || !v2 || !v3 || !v4 || !v5) {
                setErrMsg('Invalid Entry');
                setButtonStatus('Sign Up');
                return;
            }

            const { passwordMatch, ...submitData } = formData;

            const response = await axios.post(REGISTER_URL, submitData, {
                headers: { 'Content-Type': 'application/json' },
            });

            setSuccess(true);
        }
        catch (err) {
            // If no error response
            if (!err?.response) {
                setErrMsg('No Server Response');
                errRef.current.focus();
            } else if (err.response?.status === 409) { // Username or email is taken
                setErrMsg(`${JSON.stringify(err.response.data.message).slice(1, -1)}`);
                errRef.current.focus();
            } else {
                setErrMsg('Registration Failed');
                errRef.current.focus();
            }

            setButtonStatus('Sign Up');
        }
    };

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
                                    <h2 className="text-xl font-bold">Boom! Account created. ✅</h2>
                                    <p className="text-md mt-1">Welcome to DevConnect, {formData.firstName}.</p>
                                    <p className="text-md mt-1">You’re all set to start connecting with developers.</p>
                                    <p className="text-md mt-1"><Link to="/login" className="link link-primary">
                                        Click here to log in
                                    </Link> and get started!</p>
                                </div>
                            </div>
                        </div>

                        :
                        <form className="card-body" onSubmit={handleRegister}>

                            <div className={errMsg ? "alert alert-error animate-fade" : "offscreen"} tabIndex="-1" ref={errRef} aria-live='assertive'>
                                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                <span>{errMsg}</span>
                            </div>

                            <h1 className="text-2xl font-bold">Register</h1>
                            <p className="text-sm">
                                Create a new account and start connecting!
                            </p>

                            {/* First Name Field */}
                            <div className="form-control mt-6">
                                <label className="label">
                                    <span className="label-text">First Name</span>
                                    <span className={validFirstName ? "valid ml-1" : "hide"}><svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></span>
                                    <span className={validFirstName || !formData.firstName ? "hide" : "invalid ml-1"}><svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></span>
                                </label>
                                <input
                                    ref={firstNameRef}
                                    onChange={handleChange}
                                    id='firstName'
                                    autoComplete='given-name'
                                    type="text"
                                    placeholder="Enter your first name"
                                    className="input input-bordered"
                                    required
                                    value={formData.firstName}
                                    aria-invalid={validFirstName ? "false" : "true"}
                                    aria-describedby='firstnamenote'
                                    onFocus={() => setFirstNameFocus(true)}
                                    onBlur={() => setFirstNameFocus(false)}
                                />
                            </div>

                            <div className={firstnameFocus && formData.firstName && !validFirstName ? "alert alert-warning my-2 animate-fade" : "offscreen"} id="firstnamenote">
                                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                                <span>2 to 50 characters.<br />
                                    Letters, spaces, and hyphens (-) allowed.</span>
                            </div>
                            {/* End First Name Field */}

                            {/* Last Name Field */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Last Name</span>
                                    <span className={validLastName ? "valid ml-1" : "hide"}><svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></span>
                                    <span className={validLastName || !formData.lastName ? "hide" : "invalid ml-1"}><svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></span>
                                </label>
                                <input
                                    onChange={handleChange}
                                    id='lastName'
                                    type="text"
                                    autoComplete='family-name'
                                    placeholder="Enter your last name"
                                    className="input input-bordered"
                                    required
                                    value={formData.lastName}
                                    aria-invalid={validLastName ? "false" : "true"}
                                    aria-describedby='lastnamenote'
                                    onFocus={() => setLastNameFocus(true)}
                                    onBlur={() => setLastNameFocus(false)}
                                />
                            </div>

                            <div className={lastnameFocus && formData.lastName && !validLastName ? "alert alert-warning my-2 animate-fade" : "offscreen"} id="lastnamenote">
                                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                                <span>2 to 50 characters.<br />
                                    Letters, spaces, and hyphens (-) allowed.</span>
                            </div>
                            {/* End Last Name Field */}


                            {/* Username field */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Username</span>
                                    <span className={validUsername ? "valid ml-1" : "hide"}><svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></span>
                                    <span className={validUsername || !formData.username ? "hide" : "invalid ml-1"}><svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></span>
                                </label>
                                <input
                                    onChange={handleChange}
                                    id='username'
                                    type="text"
                                    autoComplete='username'
                                    placeholder="Enter your username"
                                    className="input input-bordered"
                                    required
                                    value={formData.username}
                                    aria-invalid={validUsername ? "false" : "true"}
                                    aria-describedby='usernamenote'
                                    onFocus={() => setUsernameFocus(true)}
                                    onBlur={() => setUsernameFocus(false)}
                                />
                            </div>

                            <div className={usernameFocus && formData.username && !validUsername ? "alert alert-warning my-2 animate-fade" : "offscreen"} id="usernamenote">
                                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                                <span>5 to 30 characters.<br />
                                    Letters, numbers, and hyphens (-) allowed.<br />
                                    Lowercase only. <br />
                                    This will also be your page url.</span>
                            </div>
                            {/* End Username Field */}

                            {/* Email field */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                    <span className={validEmail ? "valid ml-1" : "hide"}><svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></span>
                                    <span className={validEmail || !formData.email ? "hide" : "invalid ml-1"}><svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></span>
                                </label>
                                <input
                                    onChange={handleChange}
                                    id='email'
                                    type="email"
                                    autoComplete='email'
                                    placeholder="Enter your email address"
                                    className="input input-bordered"
                                    required
                                    value={formData.email}
                                    aria-invalid={validEmail ? "false" : "true"}
                                    aria-describedby='emailnote'
                                    onFocus={() => setEmailFocus(true)}
                                    onBlur={() => setEmailFocus(false)}
                                />
                            </div>

                            <div className={emailFocus && formData.email && !validEmail ? "alert alert-warning my-2 animate-fade" : "offscreen"} id="emailnote">
                                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                                <span>Email must be valid.<br />
                                    e.g. bwayne@wayneenterprises.com
                                </span>
                            </div>
                            {/* End Email Field */}


                            {/* Password Field */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                    <span className={validPassword ? "valid ml-1" : "hide"}><svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></span>
                                    <span className={validPassword || !formData.password ? "hide" : "invalid ml-1"}><svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></span>
                                </label>
                                <div className='relative'>
                                    <input
                                        onChange={handleChange}
                                        id='password'
                                        type={passwordType}
                                        autoComplete='current-password'
                                        placeholder="Create a password"
                                        className="input input-bordered w-full"
                                        required
                                        value={formData.password}
                                        aria-invalid={validPassword ? "false" : "true"}
                                        aria-describedby='passwordnote'
                                        onFocus={() => setPasswordFocus(true)}
                                        onBlur={() => setPasswordFocus(false)}
                                    />
                                    {
                                        passwordType === "password"
                                            ?
                                            <IoMdEyeOff className='absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer' onClick={(e) => setPasswordType('text')} />
                                            :
                                            <IoMdEye className='absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer' onClick={(e) => setPasswordType('password')} />
                                    }
                                </div>
                            </div>

                            <div className={passwordFocus && formData.password && !validPassword ? "alert alert-warning my-2 animate-fade" : "offscreen"} id="passwordnote">
                                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                                <span>8 to 24 characters.<br />
                                    Must include:<br />
                                    &bull; Uppercase letter<br />
                                    &bull; Lowercase letter<br />
                                    &bull; Number <br />
                                    &bull; Special Character.<br />
                                    Allowed special characters:<br /><span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                                </span>
                            </div>
                            {/* End Password Field */}

                            {/* Match Password Field */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Confirm Password</span>
                                    <span className={validMatchingPassword && formData.passwordMatch && validPassword ? "valid ml-1" : "hide"}><svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></span>
                                    <span className={validMatchingPassword && validPassword || !formData.passwordMatch ? "hide" : "invalid ml-1"}><svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></span>
                                </label>
                                <div className='relative'>
                                    <input
                                        onChange={handleChange}
                                        id='passwordMatch'
                                        type={matchingPasswordType}
                                        autoComplete='off'
                                        placeholder="Match your password"
                                        className="input input-bordered w-full"
                                        required
                                        value={formData.passwordMatch}
                                        aria-invalid={validMatchingPassword ? "false" : "true"}
                                        aria-describedby='matchingpasswordnote'
                                        onFocus={() => setMatchingPasswordFocus(true)}
                                        onBlur={() => setMatchingPasswordFocus(false)}
                                    />
                                    {
                                        matchingPasswordType === "password"
                                            ?
                                            <IoMdEyeOff className='absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer' onClick={(e) => setMatchingPasswordType('text')} />
                                            :
                                            <IoMdEye className='absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer' onClick={(e) => setMatchingPasswordType('password')} />
                                    }
                                </div>
                            </div>

                            <div className={matchingPasswordFocus && !validMatchingPassword ? "alert alert-warning my-2 animate-fade" : "offscreen"} id="matchingpasswordnote">
                                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                                <span>Must match the first password entry.</span>
                            </div>
                            {/* End Match Password Field */}

                            <div className="form-control mt-6">
                                <button
                                    disabled={
                                        !validFirstName ||
                                        !validLastName ||
                                        !validEmail ||
                                        !formData.password ||
                                        !formData.passwordMatch ||
                                        !validMatchingPassword
                                    }
                                    className="btn btn-primary">{buttonStatus}</button>
                                <label className="label mt-2">
                                    <Link to="/login" className="label-text-alt link link-hover">Already a member? Login here!</Link>
                                </label>
                            </div>
                        </form>
                    }
                </div>
            </div>
        </div>
    )
}

export default Register