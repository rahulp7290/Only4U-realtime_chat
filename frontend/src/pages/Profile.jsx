// import React, { useRef, useState } from "react";
// import dp from "../assets/dp.png";
// import { IoCameraOutline } from "react-icons/io5";
// import { useSelector } from "react-redux";
// import { IoIosArrowRoundBack } from "react-icons/io";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { API_URL } from "../main";

// const Profile = () => {
//   const { userData } = useSelector((state) => state.user);
//   const navigate = useNavigate();

//   const [name, setName] = useState(userData?.name || "");
//   const [image, setImage] = useState(userData?.image || dp);
//   const [backendImage, setBackendImage] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const imageRef = useRef();

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImage(URL.createObjectURL(file)); // preview
//       setBackendImage(file); // backend upload
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     const formData = new FormData();
//     formData.append("name", name);
//     if (backendImage) {
//       formData.append("image", backendImage);
//     }

//     try {
//       await axios.put(`${API_URL}/user/profile`, formData, {
//         withCredentials: true,
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       alert("Profile updated successfully");
//       setLoading(false);
//       navigate("/");
//     } catch (error) {
//       console.error(error);
//       alert("Profile update failed");
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="w-full h-[100vh] bg-slate-200 flex flex-col justify-center items-center">
//       <div className="relative">
//         <div
//           className="fixed top-[20px] left-[20px]"
//           onClick={() => navigate("/")}
//         >
//           <IoIosArrowRoundBack className="w-[50px] h-[50px] text-gray-600 cursor-pointer" />
//         </div>

//         <div className="bg-white rounded-full border-4 border-[#20c7ff] shadow-gray-400 shadow-lg">
//           <div className="w-[200px] h-[200px] rounded-full overflow-hidden">
//             <img
//               src={image}
//               alt="profile"
//               className="w-full h-full rounded-full object-cover"
//             />
//           </div>
//         </div>

//         {/* Camera Button */}
//         <label
//           className="absolute bottom-2 right-2 bg-[#20c7ff] p-2 rounded-full cursor-pointer shadow-md"
//           onClick={() => imageRef.current.click()}
//         >
//           <IoCameraOutline className="text-white text-xl" />
//         </label>

//         <input
//           type="file"
//           accept="image/*"
//           ref={imageRef}
//           className="hidden"
//           onChange={handleImageChange}
//         />
//       </div>

//       <form
//         className="mt-8 w-[300px] flex flex-col gap-4"
//         onSubmit={handleSubmit}
//       >
//         <input
//           type="text"
//           placeholder="Enter your name"
//           className="p-2 border rounded-md"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />

//         <input
//           type="text"
//           value={userData?.username || ""}
//           readOnly
//           className="p-2 border rounded-md text-gray-500"
//         />

//         <input
//           type="email"
//           value={userData?.email || ""}
//           readOnly
//           className="p-2 border rounded-md text-gray-500"
//         />

//         <button
//           type="submit"
//           disabled={loading}
//           className={`p-2 rounded-md text-white ${
//             loading
//               ? "bg-gray-400 cursor-not-allowed"
//               : "bg-[#20c7ff] hover:bg-[#1da1db]"
//           }`}
//         >
//           {loading ? "Saving..." : "Save Profile"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Profile; 

import React, { useRef, useState } from "react";
import dp from "../assets/dp.png";
import { IoCameraOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../main";

const Profile = () => {
  const { userData } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [name, setName] = useState(userData?.name || "");
  const [image, setImage] = useState(userData?.image || dp);
  const [backendImage, setBackendImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const imageRef = useRef();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(URL.createObjectURL(file));
    setBackendImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("name", name);
    if (backendImage) formData.append("image", backendImage);

    try {
      await axios.put(`${API_URL}/user/profile`, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Profile updated successfully ✅");
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Profile update failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen bg-gradient-to-b from-sky-100 to-slate-200 flex flex-col items-center">
      {/* BACK BUTTON */}
      <div
        className="fixed top-4 left-4 z-50"
        onClick={() => navigate("/")}
      >
        <IoIosArrowRoundBack className="w-12 h-12 text-gray-700 cursor-pointer hover:scale-110 transition" />
      </div>

      {/* PROFILE IMAGE */}
      <div className="mt-16 relative">
        <div className="bg-white p-2 rounded-full shadow-lg ring-4 ring-sky-400">
          <div className="w-[180px] h-[180px] rounded-full overflow-hidden">
            <img
              src={image}
              alt="profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* CAMERA BUTTON */}
        <button
          type="button"
          onClick={() => imageRef.current.click()}
          className="absolute bottom-2 right-2 bg-sky-500 p-3 rounded-full shadow-lg hover:bg-sky-600 transition"
        >
          <IoCameraOutline className="text-white text-xl" />
        </button>

        <input
          type="file"
          accept="image/*"
          ref={imageRef}
          hidden
          onChange={handleImageChange}
        />
      </div>

      {/* FORM */}
      <form
        className="mt-8 w-[320px] bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-4"
        onSubmit={handleSubmit}
      >
        <h2 className="text-center text-lg font-semibold text-gray-700">
          Edit Profile
        </h2>

        <input
          type="text"
          placeholder="Enter your name"
          className="p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-400"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          value={userData?.username || ""}
          readOnly
          className="p-3 border rounded-xl bg-gray-100 text-gray-500"
        />

        <input
          type="email"
          value={userData?.email || ""}
          readOnly
          className="p-3 border rounded-xl bg-gray-100 text-gray-500"
        />

        <button
          type="submit"
          disabled={loading}
          className={`p-3 rounded-xl text-white font-semibold transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-sky-500 hover:bg-sky-600"
          }`}
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default Profile;
