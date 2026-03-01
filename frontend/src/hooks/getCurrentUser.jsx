import { useEffect } from "react";
import axios from "axios";
import { API_URL } from "../main";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../redux/userSlice";

const useCurrentUser = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await axios.get(
          `${API_URL}/user/profile`,
          { withCredentials: true }
        );

        dispatch(setUserData(result.data.user));
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (!userData) {
      fetchUser();
    }
  }, []); // ✅ only once

  return userData;
};

export default useCurrentUser;
