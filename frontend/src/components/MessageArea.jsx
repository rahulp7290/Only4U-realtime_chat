import React, { use, useEffect } from "react";
import { useRef } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { IoSend } from "react-icons/io5";
import dp from "../assets/dp.png";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedUser } from "../redux/userSlice";
import { RiEmojiStickerLine } from "react-icons/ri";
import { FaRegImages } from "react-icons/fa6";
import { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import SenderMessage from "./SenderMessage";
import ReceiverMessage from "./ReceiverMessage";
import axios from "axios";
import { API_URL } from "../main";
import { setMessages } from "../redux/messageSlice";

const MessageArea = () => {
  const { selectedUser, userData, socket, onlineUsers } = useSelector(
    (state) => state.user,
  );
  const dispatch = useDispatch();
  const [showPicker, setShowPicker] = useState(false);
  const [input, setInput] = useState("");
  const [frontendImage, setFrontendImage] = useState("");
  const [backendImage, setBackendImage] = useState("");
  const image = useRef();
  const { messages } = useSelector((state) => state.message);

  const isOnline = onlineUsers?.includes(selectedUser?._id);

  const handleImage = (e) => {
    let file = e.target.files[0];
    setBackendImage(file);
    setFrontendImage(URL.createObjectURL(file));
  };
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (input.length === 0 && !backendImage) {
      return alert("Please enter a message or select an image");
    }
    try {
      let formData = new FormData();
      formData.append("message", input);
      if (backendImage) {
        formData.append("image", backendImage);
      }

      let result = await axios.post(
        `${API_URL}/message/send/${selectedUser._id}`,
        formData,
        { withCredentials: true },
      );
      dispatch(setMessages([...messages, result.data]));
      setInput("");
      setFrontendImage("");
      setBackendImage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
    ``;
  };
  const onEmojiClick = (emojiData, event) => {
    setInput((prevInput) => prevInput + emojiData.emoji);
    setShowPicker(false);
  };

  useEffect(() => {
    socket.on("newMessage", (message) => {
      dispatch(setMessages([...messages, message]));
    });
    return () => socket.off("newMessage");
  }, [messages, setMessages]);
  return (
    <div
      className={`lg:w-[70%] w-full h-screen bg-slate-100 border-l-2 border-gray-300 flex flex-col
      ${selectedUser ? "flex" : "hidden lg:flex"}`}
    >
      <div className="relative w-full bg-[#1797c2] rounded-b-[40px] shadow-lg p-4 flex items-center">
        {/* BACK BUTTON */}
        {selectedUser && (
          <IoIosArrowRoundBack
            className="absolute left-3 top-4 w-[40px] h-[40px] text-white cursor-pointer"
            onClick={() => dispatch(setSelectedUser(null))}
          />
        )}

        {selectedUser ? (
          <div className="flex items-center gap-3 ml-12">
            <img
              src={selectedUser?.image || dp}
              alt="profile"
              className="w-12 h-12 rounded-full object-cover ring-2 ring-white"
            />
            <div className="text-white">
              <h2 className="font-semibold text-lg">{selectedUser?.name}</h2>
              <p
                className={`text-sm font-medium ${
                  isOnline ? "text-green-300" : "text-gray-300"
                }`}
              >
                {isOnline ? "Online" : "Offline"}
              </p>
            </div>
          </div>
        ) : (
          <h2 className="mx-auto text-white text-xl font-semibold">
            Welcome to Only4u 💙
          </h2>
        )}
      </div>

      {/* MESSAGES */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3">
        {!selectedUser && (
          <p className="text-center text-gray-500 mt-10">
            Select a user to start chatting
          </p>
        )}

        {selectedUser && (
          <>
            {messages &&
              messages.map((mess) =>
                mess.sender == userData._id ? (
                  <SenderMessage image={mess.image} message={mess.message} />
                ) : (
                  <ReceiverMessage image={mess.image} message={mess.message} />
                ),
              )}
          </>
        )}
      </div>

      {selectedUser && (
        <div className="relative p-4 bg-white border-t flex items-center gap-3">
          {showPicker && (
            <div className="absolute bottom-14 left-2 z-50">
              <EmojiPicker
                width={350}
                height={300}
                className="shadow-lg"
                onEmojiClick={onEmojiClick}
              />
            </div>
          )}

          {/* <img src= {frontendImage} alt="" className="w-[80px] h-[80px] rounded-lg object-cover" /> */}

          {frontendImage && (
            <div
              className="absolute bottom-24 left-2 sm:left-4 bg-white p-2 rounded-2xl shadow-xl border
                  w-[160px] sm:w-[200px] md:w-[240px]"
            >
              <div className="relative">
                <img
                  src={frontendImage}
                  alt="preview"
                  className="w-full h-[120px] sm:h-[160px] md:h-[180px]
                   object-cover rounded-xl"
                />

                {/* Remove image button */}
                <button
                  onClick={() => {
                    setFrontendImage("");
                    setBackendImage("");
                  }}
                  className="absolute top-1 right-1 sm:top-2 sm:right-2
                   bg-black/60 text-white
                   w-6 h-6 sm:w-7 sm:h-7
                   rounded-full flex items-center justify-center
                   text-xs sm:text-sm"
                >
                  ✕
                </button>
              </div>
            </div>
          )}

          <div onClick={() => setShowPicker((prev) => !prev)}>
            <RiEmojiStickerLine className="text-gray-500 text-2xl cursor-pointer z-100" />
          </div>

          <input
            type="file"
            accept="image/*"
            ref={image}
            hidden
            onChange={handleImage}
          />
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 border rounded-full px-4 py-2 outline-none focus:ring-2 focus:ring-[#1797c2]"
            onChange={(e) => setInput(e.target.value)}
            value={input}
          />
          <div onClick={() => image.current.click()}>
            <FaRegImages className="text-gray-500 text-2xl cursor-pointer" />
          </div>

          {(input.length > 0 || backendImage) && (
            <button
              className="bg-[#1797c2] text-white p-3 rounded-full hover:bg-[#0f7ea5]"
              onClick={handleSendMessage}
            >
              <IoSend />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default MessageArea;

// import React, { useEffect, useRef, useState } from "react";
// import { IoIosArrowRoundBack } from "react-icons/io";
// import { IoSend } from "react-icons/io5";
// import dp from "../assets/dp.png";
// import { useSelector, useDispatch } from "react-redux";
// import { setSelectedUser } from "../redux/userSlice";
// import { RiEmojiStickerLine } from "react-icons/ri";
// import { FaRegImages } from "react-icons/fa6";
// import EmojiPicker from "emoji-picker-react";
// import SenderMessage from "./SenderMessage";
// import ReceiverMessage from "./ReceiverMessage";
// import axios from "axios";
// import { API_URL } from "../main";
// import { setMessages } from "../redux/messageSlice";
// import landing from "../assets/landing.png";

// const MessageArea = () => {
//   const { selectedUser, userData, socket, onlineUsers } = useSelector(
//     (state) => state.user,
//   );
//   const { messages } = useSelector((state) => state.message);

//   const dispatch = useDispatch();
//   const [showPicker, setShowPicker] = useState(false);
//   const [input, setInput] = useState("");
//   const [frontendImage, setFrontendImage] = useState("");
//   const [backendImage, setBackendImage] = useState("");
//   const imageRef = useRef();

//   const isOnline = onlineUsers?.includes(selectedUser?._id);

//   const handleImage = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     setBackendImage(file);
//     setFrontendImage(URL.createObjectURL(file));
//   };

//   const handleSendMessage = async (e) => {
//     e.preventDefault();
//     if (!input && !backendImage) return;

//     try {
//       let formData = new FormData();
//       formData.append("message", input);
//       if (backendImage) formData.append("image", backendImage);

//       const res = await axios.post(
//         `${API_URL}/message/send/${selectedUser._id}`,
//         formData,
//         { withCredentials: true },
//       );

//       dispatch(setMessages([...messages, res.data]));
//       setInput("");
//       setFrontendImage("");
//       setBackendImage("");
//     } catch (error) {
//       console.error("Send failed:", error);
//     }
//   };

//   const onEmojiClick = (emojiData) => {
//     setInput((prev) => prev + emojiData.emoji);
//     setShowPicker(false);
//   };

//   useEffect(() => {
//     socket.on("newMessage", (message) => {
//       dispatch(setMessages([...messages, message]));
//     });

//     return () => socket.off("newMessage");
//   }, [messages, dispatch, socket]);

//   return (
//     <div
//       className={`lg:w-[70%] w-full h-screen bg-slate-100 flex flex-col
//       ${selectedUser ? "flex" : "hidden lg:flex"}`}
//     >
//       {/* HEADER */}
//       <div className="relative w-full bg-gradient-to-r from-sky-500 to-cyan-500 rounded-b-[40px] shadow-md p-4 flex items-center">
//         {selectedUser && (
//           <IoIosArrowRoundBack
//             className="absolute left-3 top-4 w-10 h-10 text-white cursor-pointer hover:scale-110 transition"
//             onClick={() => dispatch(setSelectedUser(null))}
//           />
//         )}

//         {selectedUser ? (
//           <div className="flex items-center gap-3 ml-12">
//             <img
//               src={selectedUser?.image || dp}
//               alt="profile"
//               className="w-12 h-12 rounded-full object-cover ring-2 ring-white"
//             />
//             <div className="text-white">
//               <h2 className="font-semibold text-lg">{selectedUser?.name}</h2>
//               <p
//                 className={`text-sm ${
//                   isOnline ? "text-green-200" : "text-gray-200"
//                 }`}
//               >
//                 {isOnline ? "Online" : "Offline"}
//               </p>
//             </div>
//           </div>
//         ) : (
//           <h2 className="mx-auto text-3xl font-black text-white tracking-widest drop-shadow-lg">
//             Welcome to Only4U 💙
//           </h2>
//         )}
//       </div>
//       {/* MESSAGES */}
//       <div className="flex-1 p-4 overflow-y-auto space-y-3">
//         {/* {!selectedUser && (
//           <p className="text-center text-gray-500 mt-10">
//             Select a user to start chatting
//           </p>
//         )} */}

//         {!selectedUser && (
//           <div className="relative w-full h-full">
//             <img
//               src={landing}
//               alt="chat"
//               className="w-full h-full object-cover"
//             />
//           </div>
//         )}

//         {selectedUser &&
//           messages.map((mess) =>
//             mess.sender === userData._id ? (
//               <SenderMessage
//                 key={mess._id}
//                 image={mess.image}
//                 message={mess.message}
//               />
//             ) : (
//               <ReceiverMessage
//                 key={mess._id}
//                 image={mess.image}
//                 message={mess.message}
//               />
//             ),
//           )}
//       </div>

//       {/* INPUT AREA */}
//       {selectedUser && (
//         <div className="relative p-4 bg-white border-t flex items-center gap-3">
//           {showPicker && (
//             <div className="absolute bottom-16 left-2 z-50 shadow-xl">
//               <EmojiPicker
//                 width={320}
//                 height={300}
//                 onEmojiClick={onEmojiClick}
//               />
//             </div>
//           )}

//           {frontendImage && (
//             <div className="absolute bottom-20 left-3 bg-white p-2 rounded-xl shadow-lg border w-48">
//               <div className="relative">
//                 <img
//                   src={frontendImage}
//                   alt="preview"
//                   className="w-full h-32 object-cover rounded-lg"
//                 />
//                 <button
//                   onClick={() => {
//                     setFrontendImage("");
//                     setBackendImage("");
//                   }}
//                   className="absolute top-1 right-1 bg-black/60 text-white w-6 h-6 rounded-full text-xs"
//                 >
//                   ✕
//                 </button>
//               </div>
//             </div>
//           )}

//           <RiEmojiStickerLine
//             className="text-gray-500 text-2xl cursor-pointer hover:text-sky-500 transition"
//             onClick={() => setShowPicker((prev) => !prev)}
//           />

//           <input
//             type="file"
//             accept="image/*"
//             hidden
//             ref={imageRef}
//             onChange={handleImage}
//           />

//           <input
//             type="text"
//             placeholder="Type a message..."
//             className="flex-1 border rounded-full px-4 py-2 outline-none focus:ring-2 focus:ring-sky-400"
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//           />

//           <FaRegImages
//             className="text-gray-500 text-2xl cursor-pointer hover:text-sky-500 transition"
//             onClick={() => imageRef.current.click()}
//           />

//           {(input || backendImage) && (
//             <button
//               onClick={handleSendMessage}
//               className="bg-sky-500 text-white p-3 rounded-full hover:bg-sky-600 transition"
//             >
//               <IoSend />
//             </button>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default MessageArea;
