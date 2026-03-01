import React, { useEffect, useRef } from "react";
import dp from "../assets/dp.png";
import { useSelector } from "react-redux";


const SenderMessage = ({ image, message }) => {
  const scroll = useRef();
  const { userData } = useSelector((state) => state.user);
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [message, image]);

  const handleImageScroll = () => {
    if (image) {
      scroll.current?.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <div className="self-end bg-[#1797c2] text-white p-3 rounded-xl shadow w-fit max-w-[60%] ml-auto shadow-gray-300 ">
    
      <div ref={scroll}>
        {image && (
          <img
            src={image}
            alt="profile"
            className="w-[150px] rounded-lg"
            onLoad={handleImageScroll}
          />
        )}
        {message && <span>{message}</span>}
      </div>
    </div>
  );
};

export default SenderMessage;
