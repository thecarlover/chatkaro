import React from "react";
import UserProfile from "./UserProfile";

const OtherUsers = ({ filteredUsers }) => {
  if (!filteredUsers || filteredUsers.length === 0) {
    return <div className="text-white">No users found.</div>;
  }

  return (
    <div className="overflow-auto flex-1 space-y-3">
      {filteredUsers.map((user) => (
        <UserProfile key={user.id || user._id} user={user} />
      ))}
    </div>
  );
};

export default OtherUsers;
