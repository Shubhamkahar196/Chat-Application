import React from "react";

const MessageInputForm = ({
  selectedUserId,
  newMessage,
  setNewMessage,
  sendMessage,
}) => {
  return (
    <>
      {!!selectedUserId && (
        <form onSubmit={sendMessage} className="relative m-4 w-full">
          <input
            type="text"
            id="search-dropdown"
            className="w-full px-4 py-3 rounded-xl bg-transparent border border-gray-300 focus:outline-none focus:border-blue-500"
            placeholder="Your Message"
            value={newMessage}
            onChange={(ev) => setNewMessage(ev.target.value)}
            required
          />
          <button
            type="submit"
            className="absolute end-0 top-0 aspect-square h-10 font-medium text-blue-500 hover:text-blue-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12c-2.595.75-4.936-1.68-4.936-4.258v-1.104M6 12 3.269 20.875A59.769 59.769 0 0 1 21.485 12M6 12l6-6m6 6-6 6"
              />
            </svg>
          </button>
        </form>
      )}
    </>
  );
};

export default MessageInputForm;
