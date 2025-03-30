import React, { useState } from 'react'

const Register = () => {

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    }

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) console.log(`User: ${formData.username} successfully registered.`);
            else console.log(`Error registering User: ${formData.username}.\n${response.status}: ${response.statusText}`);
        } 
        catch (err) {
            console.error('Error:', err);
        }
    };

    return (
        <div className="hero bg-base-200 my-20">
            <div className="hero-content w-full max-w-[725px] lg:max-w-[1000px] flex-col lg:flex-row">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Dev Connect</h1>
                    <p className="py-6 lg:mr-10">
                        The Platform for Developers to Connect and Grow.
                    </p>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <form className="card-body" onSubmit={handleRegister}>
                        <h1 className="text-2xl font-bold">Register</h1>
                        <p className="text-sm">
                            Create a new account and start connecting!
                        </p>
                        <div className="form-control mt-6">
                            <label className="label">
                                <span className="label-text">First Name</span>
                            </label>
                            <input onChange={handleChange} id='firstName' autoComplete='given-name' type="text" placeholder="Enter your first name" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Last Name</span>
                            </label>
                            <input onChange={handleChange} id='lastName' type="text" autoComplete='family-name'  placeholder="Enter your last name" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Username</span>
                            </label>
                            <input onChange={handleChange} id='username' type="text" autoComplete='username' placeholder="Enter your username" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input onChange={handleChange} id='email' type="email" autoComplete='email' placeholder="Enter your email address" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input onChange={handleChange} id='password' type="password" autoComplete='current-password' placeholder="Create a password" className="input input-bordered" required />
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Sign Up</button>
                            <label className="label mt-2">
                                <a href="#" className="label-text-alt link link-hover">Already a member? Login here!</a>
                            </label>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register