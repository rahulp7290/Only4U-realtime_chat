// import React from "react";
// import { Navigate, Routes } from "react-router-dom";
// import { Route } from "react-router-dom";
// import Login from "./pages/Login.jsx";
// import SignUp from "./pages/SignUp.jsx";
// import Profile from "./pages/Profile.jsx";
// import Home from "./pages/Home.jsx";
// import getCurrentUser from "./hooks/getCurrentUser.jsx";
// import { useSelector } from "react-redux";
// import getOtherUsers from "./hooks/getOtherUsers.jsx";

// const App = () => {
//   getCurrentUser();
//   getOtherUsers();
//   let { userData } = useSelector((state) => state.user);
//   return (
//     <Routes>
//       <Route
//         path="/login"
//         element={!userData ? <Login /> : <Navigate to="/" />}
//       />
//       <Route
//         path="/signup"
//         element={!userData ? <SignUp /> : <Navigate to="/profile" />}
//       />
//       <Route
//         path="/profile"
//         element={userData ? <Profile /> : <Navigate to="/login" />}
//       />
//       <Route
//         path="/"
//         element={userData ? <Home /> : <Navigate to="/signup" />}
//       />
//     </Routes>
//   );
// };

// export default App;

import React, { useEffect } from "react";
import { Navigate, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";
import Profile from "./pages/Profile.jsx";
import Home from "./pages/Home.jsx";
import getCurrentUser from "./hooks/getCurrentUser.jsx";
import getOtherUsers from "./hooks/getOtherUsers.jsx";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import { useDispatch } from "react-redux";
import { setSocket, setOnlineUsers } from "./redux/userSlice.js";

const serverUrl = "http://localhost:8000"; // ✅ define server URL

const App = () => {
  getCurrentUser();
  getOtherUsers();
  let { userData, socket, onlineUsers } = useSelector((state) => state.user);
  let dispatch = useDispatch();

  useEffect(() => {
    if (userData) {
      const socketio = io(`${serverUrl}`, {
        query: {
          userId: userData?._id, // ✅ pass user ID in query
        },
      });
      dispatch(setSocket(socketio)); // save socket in Redux

      socketio.on("getOnlineUsers", (users) => {
        dispatch(setOnlineUsers(users)); // update online users in Redux
      });

      return () => socketio.close();
    } else {
      if (socket) {
        socket.close();
        dispatch(setSocket(null)); // clear socket from Redux
      }
      }
  }, [userData]); // re-run when userData changes
  return (
    <Routes>
      <Route
        path="/login"
        element={!userData ? <Login /> : <Navigate to="/" />}
      />

      <Route
        path="/signup"
        element={!userData ? <SignUp /> : <Navigate to="/" />}
      />

      <Route
        path="/profile"
        element={userData ? <Profile /> : <Navigate to="/login" />}
      />

      <Route
        path="/"
        element={userData ? <Home /> : <Navigate to="/signup" />}
      />
    </Routes>
  );
};

export default App;
