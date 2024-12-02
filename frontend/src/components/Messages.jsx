import React from 'react';
import { useSelector } from 'react-redux';



const Messages = ({ messages, scrollRef }) => {

 
  
  const { authUser } = useSelector((store) => store.user); // Logged-in user data

  return (
    <div className="flex-1 bg-gray-900 p-6 rounded-lg overflow-y-auto max-h-[calc(100vh-200px)] space-y-4">
      {Array.isArray(messages) && messages.length > 0 ? (
        messages.map((message, index) => {
          // Check if the logged-in user is the sender
          const isSender = authUser?._id === message?.senderId;

          return (
            <div
              key={message._id || index}
              className={`flex items-start ${
                isSender ? 'justify-end' : 'justify-start'
              }`}
              ref={index === messages.length - 1 ? scrollRef : null} // Attach scrollRef to the last message
            >
              <div
                className={`p-3 rounded-lg max-w-xs ${
                  isSender ? 'bg-teal-600 text-white' : 'bg-gray-700 text-white'
                }`}
              >
                <span className="text-sm font-bold">
                  {isSender ? 'You' : message.user || 'Anonymous'}
                </span>
                <p className="text-sm">{message.message || ''}</p>
              </div>
            </div>
          );
        })
      ) : (
        <div className="text-gray-400 text-center">No messages available</div>
      )}
    </div>
  );
};

export default Messages;