import { useEffect } from "react";
import axios from "axios";
import { API_URL } from "../main";
import { useDispatch } from "react-redux";
import { setOtherUsers } from "../redux/userSlice";

const useGetOtherUsers = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchOtherUsers = async () => {
      try {
        const result = await axios.get(
          `${API_URL}/user/others`,
          { withCredentials: true }
        );

        // ✅ backend returns array directly
        dispatch(setOtherUsers(result.data));
      } catch (error) {
        console.error("Error fetching other users:", error);
      }
    };

    fetchOtherUsers();
  }, [dispatch]);
};

export default useGetOtherUsers;
