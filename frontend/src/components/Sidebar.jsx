import React, { useState, useEffect } from "react";
import OtherUsers from "./OtherUsers";
import { useSelector } from "react-redux";
import useGetOtherUsers from "../hooks/useGetOtherUsers";

const Sidebar = () => {
  useGetOtherUsers(); // Fetch users on component mount
  const { otherUsers } = useSelector((store) => store.user); 
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isOpen, setIsOpen] = useState(false); // Toggle sidebar on mobile

  useEffect(() => {
    if (otherUsers && otherUsers.length > 0) {
      const filtered = searchQuery.trim()
        ? otherUsers.filter((user) =>
            user.name && typeof user.name === 'string' && user.name.toLowerCase().includes(searchQuery.toLowerCase())
          )
        : otherUsers;
      setFilteredUsers(filtered);
    }
  }, [otherUsers, searchQuery]);
  

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="md:hidden p-3 bg-teal-600 text-white fixed top-4 left-4 z-20 rounded-full"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "Close" : "Users"}
      </button>

      {/* Sidebar */}
      <div
        className={`${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } fixed md:relative w-64 bg-gray-800 p-4 flex flex-col h-full shadow-xl 
        transform transition-transform duration-300 ease-in-out md:translate-x-0 z-10`}
      >
        <h2 className="text-xl md:text-2xl font-semibold mb-6 text-center text-white">Users</h2>

        {/* Search Input */}
        <input
          type="text"
          placeholder="Search users..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full p-2 md:p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-200"
        />

        {/* Users List - Make it scrollable */}
        <div className="flex-grow overflow-y-auto mt-4">
          {filteredUsers && filteredUsers.length > 0 ? (
            <OtherUsers filteredUsers={filteredUsers} />
          ) : (
            <p className="text-center text-gray-400">No users found</p>
          )}
        </div>
      </div>

      {/* Overlay to close sidebar on mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-0 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
