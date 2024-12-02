import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../redux/userSlice";

const UserProfile = ({ user }) => {
  const dispatch = useDispatch();
  const { selectedUser, onlineUsers } = useSelector((state) => state.user);

  // Check if the user is online
  const isOnline = onlineUsers?.includes(user._id);

  const selectedUserHandler = (user) => {
    dispatch(setSelectedUser(user));
  };

  return (
    <div
      onClick={() => selectedUserHandler(user)}
      className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition duration-300 ease-in-out ${
        selectedUser?._id === user?._id ? "bg-red-400" : "bg-gray-700"
      }`}
    >
      <div className="relative">
        {/* Profile Photo */}
        <img
          src={user?.profilePhoto || `https://ui-avatars.com/api/?name=${user?.fullName}`}
          alt={user?.fullName}
          className="w-10 h-10 rounded-full object-cover"
        />
        {/* Online Indicator */}
        {isOnline && (
          <span
            className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-gray-700 rounded-full"
            title="Online"
          ></span>
        )}
      </div>
      <div className="text-white">{user?.fullName || "No Name"}</div>
    </div>
  );
};

export default UserProfile;
