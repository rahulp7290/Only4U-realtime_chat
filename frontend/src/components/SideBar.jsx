// import React, { useState, useRef, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import dp from "../assets/dp.png";
// import { IoSearch } from "react-icons/io5";
// import { RiLogoutCircleLine } from "react-icons/ri";
// import axios from "axios";
// import { API_URL } from "../main";
// import {
//   setUserData,
//   setOtherUsers,
//   setSelectedUser,
//   setOnlineUsers
// } from "../redux/userSlice";
// import { useNavigate } from "react-router-dom";

// const SideBar = () => {
//   const { userData, otherUsers, selectedUser, onlineUsers } = useSelector(
//     (state) => state.user,
//   );

//   const [search, setSearch] = useState(false);
//   const [query, setQuery] = useState("");
//   const inputRef = useRef(null);

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const res = await axios.get(`${API_URL}/user/others`, {
//           withCredentials: true,
//         });
//         dispatch(setOtherUsers(res.data));
//       } catch (err) {
//         console.log("Failed to fetch users", err);
//       }
//     };

//     if (userData) fetchUsers();
//   }, [userData, dispatch]);

//   const filteredUsers = otherUsers?.filter((user) =>
//     user?.name?.toLowerCase().includes(query.toLowerCase()),
//   );

//   const handleLogout = async () => {
//     try {
//       await axios.post(`${API_URL}/auth/logout`, {}, { withCredentials: true });
//       dispatch(setUserData(null));
//       dispatch(setOtherUsers([]));
//       navigate("/login");
//     } catch (error) {
//       console.error("Logout failed:", error);
//     }
//   };

//   return (
//     <div
//       className={`lg:w-[30%] w-full h-screen bg-gradient-to-b from-sky-50 to-sky-100 flex flex-col shadow-xl
//       ${selectedUser ? "hidden lg:flex" : "flex"}`}
//     >
//       {/* HEADER */}
//       <div className="w-full bg-gradient-to-r from-sky-400 to-cyan-400 rounded-b-[60px] shadow-xl p-6">
//         <h1 className="text-white font-extrabold text-xl">Only4U</h1>

//         <div className="flex justify-between items-center mt-3">
//           <h2 className="text-white text-lg  font-bold">
//             Hi, {userData?.name || "User"}
//           </h2>

//           <img
//             onClick={() => navigate("/profile")}
//             src={userData?.image || dp}
//             alt="profile"
//             className="w-12 h-12 rounded-full object-cover ring-2 ring-white cursor-pointer"
//           />
//         </div>

//       {/* SEARCH + USER CIRCLES */}
// <div className="flex items-center gap-3 mt-4">
//   {/* Search Button */}
//   {!search && (
//     <button
//       onClick={() => {
//         setSearch(true);
//         setTimeout(() => inputRef.current?.focus(), 100);
//       }}
//       className="w-12 h-12 bg-white rounded-full flex justify-center items-center shadow"
//     >
//       <IoSearch />
//     </button>
//   )}

//   {/* Search Input */}
//   {search && (
//     <div className="flex items-center bg-white h-12 w-[180px] rounded-full shadow px-3">
//       <IoSearch className="text-gray-500" />
//       <input
//         ref={inputRef}
//         type="text"
//         placeholder="Search user..."
//         value={query}
//         onChange={(e) => setQuery(e.target.value)}
//         onBlur={() => {
//           setSearch(false);
//           setQuery("");
//         }}
//         className="w-full h-full px-2 outline-none"
//       />
//     </div>
//   )}

//   {/* USER CIRCLES */}
// {/* USER CIRCLES */}
// <div className="flex gap-3">
//   {otherUsers
//     ?.filter((user) => onlineUsers?.includes(user._id))
//     ?.slice(0, 4)
//     ?.map((user) => (
//       <div
//         key={user._id}
//         onClick={() => dispatch(setSelectedUser(user))}
//         className="relative cursor-pointer"
//       >
//         <img
//           src={user.image || dp}
//           alt="user"
//           className="w-12 h-12 rounded-full border-2 border-white object-cover"
//         />

//         {/* GREEN DOT */}
//         <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
//       </div>
//     ))}
// </div>
// </div>
//       </div>

//       {/* USERS */}
//       <div className="flex-1 overflow-y-auto p-3 mt-2">
//         {filteredUsers?.map((user) => (
//           <div
//             key={user._id}
//             onClick={() => dispatch(setSelectedUser(user))}
//             className="flex items-center p-3 mb-3 bg-white rounded-xl shadow hover:bg-sky-50 cursor-pointer"
//           >
//             <img
//               src={user?.image || dp}
//               alt="profile"
//               className="w-[48px] h-[48px] rounded-full object-cover mr-3"
//             />
//             <div>
//               <h1 className="text-[16px] font-semibold">{user.name}</h1>
//               <p className="text-xs text-gray-500">Tap to chat</p>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* LOGOUT */}
//       <div className="p-4">
//         <button
//           onClick={handleLogout}
//           className="w-full flex items-center justify-center gap-2 bg-white h-12 rounded-full shadow hover:bg-red-50 hover:text-red-600"
//         >
//           <RiLogoutCircleLine />
//           Logout
//         </button>
//       </div>
//     </div>
//   );
// };

// export default SideBar;


import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import dp from "../assets/dp.png";
import { IoSearch } from "react-icons/io5";
import { RiLogoutCircleLine } from "react-icons/ri";
import axios from "axios";
import { API_URL } from "../main";
import {
  setUserData,
  setOtherUsers,
  setSelectedUser,
} from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

const SideBar = () => {
  const { userData, otherUsers, selectedUser, onlineUsers } = useSelector(
    (state) => state.user
  );

  const [search, setSearch] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userName = userData?.name
    ? userData.name.charAt(0).toUpperCase() + userData.name.slice(1)
    : "there";

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${API_URL}/user/others`, {
          withCredentials: true,
        });
        dispatch(setOtherUsers(res.data));
      } catch (err) {
        console.log("Failed to fetch users", err);
      }
    };

    if (userData) fetchUsers();
  }, [userData, dispatch]);

  const filteredUsers = otherUsers?.filter((user) =>
    user?.name?.toLowerCase().includes(query.toLowerCase())
  );

  const handleLogout = async () => {
    try {
      await axios.post(`${API_URL}/auth/logout`, {}, { withCredentials: true });
      dispatch(setUserData(null));
      dispatch(setOtherUsers([]));
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div
      className={`lg:w-[30%] w-full h-screen bg-gradient-to-b from-sky-50 to-sky-100 flex flex-col
      ${selectedUser ? "hidden lg:flex" : "flex"}`}
    >
      {/* HEADER */}
      <div className="w-full bg-gradient-to-r from-sky-500 to-cyan-500 rounded-b-[50px] shadow-lg p-6">
        <h1 className="text-white font-extrabold text-xl tracking-wide">
          Only4U 💬
        </h1>

        <div className="flex justify-between items-center mt-3">
          <h2 className="text-white text-lg font-semibold">
            👋 Hi, {userName}
          </h2>

          <img
            onClick={() => navigate("/profile")}
            src={userData?.image || dp}
            alt="profile"
            className="w-12 h-12 rounded-full object-cover ring-2 ring-white cursor-pointer hover:scale-105 transition"
          />
        </div>

        {/* SEARCH + ONLINE USERS */}
        <div className="flex items-center gap-3 mt-4">
          {!search && (
            <button
              onClick={() => {
                setSearch(true);
                setTimeout(() => inputRef.current?.focus(), 100);
              }}
              className="w-12 h-12 bg-white rounded-full flex justify-center items-center shadow hover:scale-105 transition"
            >
              <IoSearch />
            </button>
          )}

          {search && (
            <div className="flex items-center bg-white h-12 w-[190px] rounded-full shadow px-3 animate-fadeIn">
              <IoSearch className="text-gray-500" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search user..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onBlur={() => {
                  setSearch(false);
                  setQuery("");
                }}
                className="w-full h-full px-2 outline-none bg-transparent"
              />
            </div>
          )}

          {/* ONLINE USERS */}
          <div className="flex gap-3">
            {otherUsers
              ?.filter((user) => onlineUsers?.includes(user._id))
              ?.slice(0, 4)
              ?.map((user) => (
                <div
                  key={user._id}
                  onClick={() => dispatch(setSelectedUser(user))}
                  className="relative cursor-pointer hover:scale-105 transition"
                >
                  <img
                    src={user.image || dp}
                    alt="user"
                    className="w-12 h-12 rounded-full border-2 border-white object-cover shadow"
                  />
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* USERS LIST */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {filteredUsers?.map((user) => (
          <div
            key={user._id}
            onClick={() => dispatch(setSelectedUser(user))}
            className="flex items-center p-3 bg-white rounded-2xl shadow-sm hover:shadow-md hover:bg-sky-50 transition cursor-pointer"
          >
            <img
              {/* src={user?.image || dp} */}
            src={user?.image?.trim() ? user.image : dp}
              alt="profile"
              className="w-12 h-12 rounded-full object-cover mr-3"
            />
            <div className="flex flex-col">
              <h1 className="text-sm font-semibold">{user.name}</h1>
              <p className="text-xs text-gray-500">Tap to chat</p>
            </div>
          </div>
        ))}
      </div>

      {/* LOGOUT */}
      <div className="p-4">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 bg-white h-12 rounded-full shadow hover:bg-red-50 hover:text-red-600 transition"
        >
          <RiLogoutCircleLine />
          Logout
        </button>
      </div>
    </div>
  );
};

export default SideBar;
