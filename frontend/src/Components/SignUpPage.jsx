import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../features/auth/authActions"; // Import the async signup action

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatpassword, setrepeatpassword] = useState("");

  const dispatch = useDispatch();
  const { isSigningUp } = useSelector((state) => state.auth); // Get isSigningUp status from Redux

  const handleSignUp = (e) => {
    e.preventDefault();
    if (password !== repeatpassword) {
      alert("Passwords do not match");
      return;
    }
    
    // Dispatch signup action from Redux store
    dispatch(signup({ email, password ,repeatpassword}));
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <form
        className="px-8 pb-6 bg-indigo rounded-lg"
        onSubmit={handleSignUp}
      >
        <h1 className="md:py-8 py-5 text-3xl text-white">Sign Up</h1>
        <div className="flex flex-col md:gap-8 gap-5 w-full">
          {/* Email Input */}
          <div className="relative h-11 md:min-w-[400px] min-w-[200px]">
            <input
              placeholder="Email address"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="pl-2 bg-indigo peer h-full w-full border-b border-gray-500 pt-4 pb-1.5 font-sans text-sm font-normal text-white outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
            />
            <label className="ml-2 after:content[''] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none truncate text-[11px] font-normal leading-tight text-gray-500 transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900">
              Email address
            </label>
          </div>

          {/* Password Input */}
          <div className="relative h-11 w-full md:min-w-[400px] min-w-[200px]">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="pl-2 bg-indigo peer h-full w-full border-b border-gray-500 pt-4 pb-1.5 font-sans text-sm font-normal text-white outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
            />
            <label className="ml-2 after:content[''] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none truncate text-[11px] font-normal leading-tight text-gray-500 transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900">
              Password
            </label>
          </div>

          {/* Repeat Password Input */}
          <div className="relative h-11 w-full md:min-w-[400px] min-w-[200px]">
            <input
              type="password"
              id="repeatpassword"
              value={repeatpassword}
              onChange={(e) => setrepeatpassword(e.target.value)}
              placeholder="Repeat password"
              className="pl-2 bg-indigo peer h-full w-full border-b border-gray-500 pt-4 pb-1.5 font-sans text-sm font-normal text-white outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100"
            />
            <label className="ml-2 after:content[''] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none truncate text-[11px] font-normal leading-tight text-gray-500 transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900">
              Repeat password
            </label>
          </div>

          {/* Submit Button */}
          <button
            className="bg-[#FC4747] w-full min-w-[200px] md:py-3 py-2 rounded text-white"
            type="submit"
            disabled={isSigningUp}
          >
            {isSigningUp ? "Creating account..." : "Create an account"}
          </button>

          {/* Login Link */}
          <div className="flex justify-center">
            <span className="text-white">
              Already have an account?{" "}
              <Link to="/login" className="text-red-700">
                Login
              </Link>
            </span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignUpPage;
