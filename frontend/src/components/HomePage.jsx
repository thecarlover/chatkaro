import React from "react";
import Sidebar from "./Sidebar"; // Sidebar component
import MessageContainer from "./MessageContainer"; 
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setAuthUser } from "../redux/userSlice";


const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async() => {
    try{
        const res=await axios.get("http://localhost:3001/api/v1/user/logout");
        navigate("/login");
        toast.success(res.data.message);
        dispatch(setAuthUser(null));
    }
    catch(error)
    {
      console.error("Error logging out:", error);
    }

  };

  return (
    <div className="flex h-screen bg-gradient-to-r from-indigo-900 via-purple-800 to-pink-600 text-white">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Chat Area */}
      <div className="flex-1 p-4 flex flex-col">
        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="self-end p-2 mb-4 bg-red-600 hover:bg-red-700 rounded-md text-sm transition duration-300"
        >
          Logout
        </button>

        {/* Chat Messages */}
        <MessageContainer />
      </div>
    </div>
  );
};

export default HomePage;
