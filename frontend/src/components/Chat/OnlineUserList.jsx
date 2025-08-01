import React, { useState } from "react";
// import avatar
import Contact from "./Contact";

const OnlineUsersList = ({
  onlinePeople,
  offlinePeople,
  selectedUserId,
  setSelectedUserId,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredOnlinePeople = Object.keys(onlinePeople).filter((userId) => {
    const username = onlinePeople[userId].username || "";
    return username.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const filteredOfflinePeople = Object.keys(offlinePeople).filter((userId) => {
    const { firstName, lastName } = offlinePeople[userId];
    const fullName = `${firstName} ${lastName}`;
    return fullName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <section className="w-[29%] py-3 border-r px-2 lg:px-4 border-gray-700 bg-gray-900"> {/* Completed border and background classes */}
      <div className="text-white flex items-center gap-2 p-1 px-4 border-b border-gray-700 pb-3"> {/* Completed border and padding classes */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 hidden sm:block text-gray-400" // Added text color for icon
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" // Completed path
          />
        </svg>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-transparent outline-none text-white placeholder-gray-400" // Added text and placeholder color
        />
      </div>
      <div className="max-h-[85vh] overflow-auto no-scrollbar">
        {filteredOnlinePeople.map((userId) => {
          const { username, avatarLink } = onlinePeople[userId];
          return (
            <Contact
              key={userId}
              userId={userId}
              username={username}
              selectedUserId={selectedUserId}
              setSelectedUserId={setSelectedUserId}
              isOnline={true}
              avatarLink={avatarLink}
            />
          );
        })}
        {filteredOfflinePeople.map((userId) => {
          // Destructure properties safely, ensuring they exist
          const { firstName, lastName, avatarLink, _id } = offlinePeople[userId] || {};
          return (
            <Contact
              key={_id || userId} // Use _id if available, otherwise userId
              userId={_id || userId}
              username={`${firstName || ''} ${lastName || ''}`} // Handle potential undefined names
              selectedUserId={selectedUserId}
              setSelectedUserId={setSelectedUserId}
              isOnline={false}
              avatarLink={avatarLink}
            />
          );
        })}
      </div>
    </section>
  );
};

export default OnlineUsersList;