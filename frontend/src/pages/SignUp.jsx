import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../main";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";
import { useSelector } from "react-redux";

const SignUp = () => {
  let navigate = useNavigate();
  let [showPassword, setShowPassword] = useState(false);
  let [username, setUsername] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [loading, setLoading] = useState(false);
  let [error, setError] = useState(false);
  let dispatch = useDispatch();
 


  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let result = await axios.post(
        `${API_URL}/auth/signup`,
        {
          username,
          email,
          password,
        },
        { withCredentials: true },
      );
      // Dispatch the setUserData action with the user data
      dispatch(setUserData(result.data));
      navigate("/profile");
      setLoading(false);
      setError("");
    } catch (err) {
      console.error(err);
      setLoading(false);
      setError(
        err.response.data.message || "An error occurred during sign up.",
      );
      setPassword("");
      setError("");
    }
  };
  return (
    <div className="w-full h-[100vh] bg-slate-200 flex justify-center items-center">
      <div className="w-full max-w-[500px] h-[600px] bg-white shadow-gray-400 shadow-lg rounded-lg flex flex-col gap-[10px">
        <div className="w-full h-[200px] bg-[#20c7ff] rounded-b-[30%] shadow-gray-400 shadow-lg flex justify-center items-center">
          <h1 className="text-gray-600 font-bold text-[30px]">
            Welcome to <span className="text-white">Only4U</span>
          </h1>
        </div>
        <form
          className="w-full flex flex-col gap-[20px] p-[50px]"
          onSubmit={handleSignUp}
        >
          <input
            type="text"
            placeholder="Username"
            className="w-full p-[10px] border border-gray-300 rounded-lg focus:outline-none focus:border-[#20c7ff] shadow-gray-600 shadow-md"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-[10px] border border-gray-300 rounded-lg focus:outline-none focus:border-[#20c7ff] shadow-gray-600 shadow-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full p-[10px] border border-gray-300 rounded-lg focus:outline-none focus:border-[#20c7ff] shadow-gray-600 shadow-md"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className="absolute right-3 top-3 cursor-pointer text-sky-500 font-semibold"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "hide" : "show"}
            </span>
          </div>

          {error && <p className="text-red-500 text-center">{error}</p>}
          <button
            className="w-full p-[10px] bg-[#20c7ff] text-white rounded-lg hover:bg-[#1da1db] transition duration-200  shadow-gray-600 shadow-md"
            disabled={loading}
          >
            {loading ? "Loading..." : "Sign Up"}
          </button>
          <p
            className="text-center cursor-pointer text-gray-500"
            onClick={() => navigate("/login")}
          >
            Already have an account?{" "}
            <span className="text-[#20c7ff]">Log in</span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
