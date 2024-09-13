import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { login } from '../features/auth/authActions';
 // Import the login action

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  // Use the auth state to check if login is in progress
  const { isLogginIn } = useSelector((state) => state.auth);

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login({ email, password })); // Dispatch the login action
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <form action="" className="px-8 pb-6 bg-indigo rounded-lg" onSubmit={handleLogin}>
        <h1 className="md:py-8 py-5 text-3xl text-white">Login</h1>
        <div className="flex flex-col md:gap-8 gap-5 w-full">
          <div className="relative h-11 md:min-w-[400px] min-w-[200px]">
            <input
              placeholder="Email address"
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-2 bg-indigo peer h-full w-full border-b border-gray-500 pt-4 pb-1.5 font-sans text-sm font-normal text-white outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
            />
            <label className="ml-2 pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
              Email address
            </label>
          </div>
          <div className="relative h-11 w-full md:min-w-[400px] min-w-[200px]">
            <input
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-2 bg-indigo peer h-full w-full border-b border-gray-500 pt-4 pb-1.5 font-sans text-sm font-normal text-white outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
            />
            <label className="ml-2 pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
              Password
            </label>
          </div>
          <button
            className="bg-[#FC4747] w-full min-w-[200px] md:py-3 py-2 rounded text-white mt-2"
            disabled={isLogginIn} // Disable button when login is in progress
          >
            {isLogginIn ? 'Logging in...' : 'Login to your account'}
          </button>
          <div className="flex justify-center">
            <span className="text-white">
              Don't have an account? <Link to="/signup" className="text-red-700">Sign Up</Link>
            </span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
