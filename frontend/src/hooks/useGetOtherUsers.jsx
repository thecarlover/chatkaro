import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setOtherUsers } from "../redux/userSlice";

const useGetOtherUsers = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchOtherUsers = async () => {
      try {
        axios.defaults.withCredentials = true;
        const res = await axios.get(`http://localhost:3001/api/v1/user/`);
       
    
        // Store the response data in Redux
        dispatch(setOtherUsers(res.data));
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    
    fetchOtherUsers();
  }, [dispatch]);
};

export default useGetOtherUsers;
