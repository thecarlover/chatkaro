import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setMessage as updateMessages } from '../redux/messageSlice';

const SendInput = () => {
  const [inputMessage, setInputMessage] = useState('');
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((store) => store.user);
  const { message: messages } = useSelector((store) => store.message); // Ensuring consistency with messageSlice

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const trimmedMessage = inputMessage.trim();
    if (!trimmedMessage) return;

    if (!selectedUser?._id) {
      console.error('No user selected');
      return;
    }

    try {
      const res = await axios.post(
        `http://localhost:3001/api/v1/message/send/${selectedUser._id}`,
        { message: trimmedMessage },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );

      const newMessage = res?.data?.newMessage;
      if (newMessage) {
        dispatch(updateMessages([...(Array.isArray(messages) ? messages : []), newMessage]));
        setInputMessage(''); // Clear the input field
      } else {
        console.error('Unexpected response format:', res.data);
      }
    } catch (error) {
      console.error('Error sending message:', error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="p-4 bg-gray-800 rounded-lg shadow-lg flex items-center space-x-4 w-full">
      <form onSubmit={onSubmitHandler} className="flex w-full">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type a message..."
          className="w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 placeholder-gray-400 transition duration-200"
        />

        {/* Send Button */}
        <button
          type="submit"
          className="p-3 bg-teal-500 text-white rounded-full hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-400 transition duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default SendInput;
