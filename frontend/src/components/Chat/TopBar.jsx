import React from 'react';

const TopBar = ({
  setSelectedUserId,
  selectedUserId,
  offlinePeople,
  onlinePeople,
}) => {
  // Determine the person object based on whether they are online or offline
  const person = onlinePeople[selectedUserId] || offlinePeople[selectedUserId];

  return (
    <div className="sticky top-0 right-0 left-0 z-10 flex items-center justify-between px-4 py-3 bg-gray-800 text-white shadow-md"> {/* Corrected and enhanced styling */}
      <div className="flex items-center gap-4"> {/* Container for back button and user info */}
        <button
          className="p-1 rounded-full hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
          onClick={() => setSelectedUserId(null)}
          aria-label="Back to chat list"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
            />
          </svg>
        </button>

        {person && ( // Only render if a person is selected
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold">
              {onlinePeople[selectedUserId] ? person.username : person.firstName} {/* Use username for online, firstName for offline */}
            </span>
            {onlinePeople[selectedUserId] ? (
              <span className="h-3 w-3 rounded-full bg-green-500" title="Online"></span> // Corrected class for online indicator
            ) : (
              <span className="h-3 w-3 rounded-full bg-gray-500" title="Offline"></span> // Corrected class for offline indicator
            )}
          </div>
        )}
      </div>
      {/* You can add more elements here like video call icon, info icon etc. */}
    </div>
  );
};

export default TopBar;