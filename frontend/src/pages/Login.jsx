import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../main";
import { useDispatch } from "react-redux";
import { setSelectedUser, setUserData } from "../redux/userSlice";
import { useSelector } from "react-redux";
const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const dispatch = useDispatch();



  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   try {
  //     const result = await axios.post(
  //       `${API_URL}/auth/login`,
  //       { email, password },
  //       { withCredentials: true },
  //     );
  //     dispatch(setUserData(result.data));
  //     navigate("/")
  //   } catch (err) {
  //     console.error(err);
  //     setError(err.response.data.message || "An error occurred during login.");
  //     setLoading(false);
  //     setPassword("");
      
  //   }
  // };

  const handleLogin = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError("");

  try {
    const result = await axios.post(
      `${API_URL}/auth/login`,
      { email, password },
      { withCredentials: true }
    );

    dispatch(setUserData(result.data));
    dispatch(setSelectedUser(null))
    setLoading(false);
    navigate("/");
  } catch (err) {
    console.error(err);

    setError(err.response?.data?.message || "Invalid email or password");
    setLoading(false);
    setPassword("");
  }
};

  return (
    <div className="w-full h-[100vh] bg-slate-200 flex justify-center items-center">
      <div className="w-full max-w-[500px] h-[600px] bg-white shadow-gray-400 shadow-lg rounded-lg flex flex-col gap-[10px]">
        <div className="w-full h-[200px] bg-[#20c7ff] rounded-b-[30%] shadow-gray-400 shadow-lg flex justify-center items-center">
          <h1 className="text-gray-600 font-bold text-[30px]">
            Login to <span className="text-white">Only4U</span>
          </h1>
        </div>

        <form
          className="w-full flex flex-col gap-[20px] p-[50px]"
          onSubmit={handleLogin}
        >
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
            className="w-full p-[10px] bg-[#20c7ff] text-white rounded-lg hover:bg-[#1da1db] transition duration-200 shadow-gray-600 shadow-md"
            disabled={loading}
          >
            {loading ? "Loading..." : "Login"}
          </button>

          <p
            className="text-center cursor-pointer text-gray-500"
            onClick={() => navigate("/signup")}
          >
            Want to create a new account?{" "}
            <span className="text-[#20c7ff]">Sign up</span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
