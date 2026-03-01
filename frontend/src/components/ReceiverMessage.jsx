import React, { useEffect, useRef } from "react";
import dp from "../assets/dp.png";

const ReceiverMessage = ({ image, message }) => {
  const scroll = useRef();
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [message, image]);

  const handleImageScroll = () => {
    if (image) {
      scroll.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

    return (
      <div className="self-start bg-white p-3 rounded-xl shadow w-fit max-w-[60%]">
        
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

export default ReceiverMessage;
