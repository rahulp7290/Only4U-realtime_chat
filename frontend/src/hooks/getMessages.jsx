// import { useEffect } from "react";
// import axios from "axios";
// import { API_URL } from "../main";
// import { useDispatch } from "react-redux";
// import { useSelector } from "react-redux";
// import { setMessages } from "../redux/messageSlice";



// const getMessage = () => {
//   const dispatch = useDispatch();
//   const { selectedUser, userData } = useSelector((state) => state.user);

//   useEffect(() => {

//     const fetchMessages = async () => {
//       try {
//         const result = await axios.get(
//           `${API_URL}/message/get/${selectedUser._id}`,
//           { withCredentials: true }
//         );

//         // ✅ backend returns array directly
//         dispatch(setMessages(result.data));
//       } catch (error) {
//         console.error("Error fetching messages:", error);
//       }
//     };

//     fetchMessages();
//   }, [selectedUser, userData]);
// };

// export default getMessage;

import { useEffect } from "react";
import axios from "axios";
import { API_URL } from "../main";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../redux/messageSlice";

const getMessage = () => {
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((state) => state.user);

  useEffect(() => {
    // ✅ clear old chat messages when switching user
    dispatch(setMessages([]));

    // ✅ stop if no user selected
    if (!selectedUser?._id) return;

    const fetchMessages = async () => {
      try {
        const result = await axios.get(
          `${API_URL}/message/get/${selectedUser._id}`,
          { withCredentials: true }
        );

        dispatch(setMessages(result.data));
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, [selectedUser, dispatch]);
};

export default getMessage;
