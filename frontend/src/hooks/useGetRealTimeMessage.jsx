import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setMessage } from "../redux/messageSlice";

const useGetRealTimeMessage = () => {
    const { socket } = useSelector((store) => store.socket);
    const { messages } = useSelector((store) => store.message); // Get messages from Redux
    const dispatch = useDispatch();

    useEffect(() => {
        if (!socket) return; // Ensure the socket exists before adding listeners

        const handleNewMessage = (newMessage) => {
            console.log("New message received:", newMessage); // Debug log
            if (newMessage) {
              dispatch(setMessage(newMessage)); // Append the new message
            }
          };
          
          socket.on("newMessage", handleNewMessage);

        return () => {
            socket.off("newMessage", handleNewMessage); // Clean up listener on unmount
        };
    }, [socket, messages, dispatch]);
};

export default useGetRealTimeMessage;
