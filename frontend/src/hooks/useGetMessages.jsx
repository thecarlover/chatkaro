import { useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setMessage } from '../redux/messageSlice';

const useGetMessages = () => {
  const { selectedUser } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        axios.defaults.withCredentials = true;
        const res = await axios.get(`http://localhost:3001/api/v1/message/${selectedUser?._id}`);
        console.log("Fetched messages:", res.data); // Debug log
        dispatch(setMessage(res.data)); // Replace the state with fetched messages
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };
    
    if (selectedUser) {
      fetchMessages();
    }
  }, [selectedUser, dispatch]);
};

export default useGetMessages;
