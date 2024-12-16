import React from 'react'

const Register = () => {
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
                    <form className="card-body">
                        <h1 className="text-2xl font-bold">Register</h1>
                        <p className="text-sm">
                            Create a new account and start connecting!
                        </p>
                        <div className="form-control mt-6">
                            <label className="label">
                                <span className="label-text">First Name</span>
                            </label>
                            <input type="text" placeholder="Enter your first name" className="input input-bordered" required />
                            <label className="label">
                                <span className="label-text">Last Name</span>
                            </label>
                            <input type="text" placeholder="Enter your last name" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" placeholder="Enter your email address" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" placeholder="Create a password" className="input input-bordered" required />
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