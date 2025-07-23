import React, { useEffect, useState, useRef } from "react"; // Added useRef
import { useProfile } from "../context/profileContext";
import axios from "axios";
import ChatMessages from "../components/Chat/ChatMessages";
import MessageInputForm from '../components/Chat/MessageInputForm'
import Nav from "../components/Chat/Nav";
import OnlineUsersList from "../components/Chat/OnlineUserList";
import TopBar from "../components/Chat/TopBar";

import { socketUrl } from "../apiConfig";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

const ChatHome = () => {
  const [ws, setWs] = useState(null);
  const [onlinePeople, setOnlinePeople] = useState({});
  const [offlinePeople, setOfflinePeople] = useState({});
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const { userDetails } = useProfile();
  const { isAuthenticated, checkAuth } = useAuth();
  const navigate = useNavigate();

  // Using useRef to store the latest state values for sendMessage to avoid stale closures
  const messagesRef = useRef(messages);
  const selectedUserIdRef = useRef(selectedUserId);
  const userDetailsRef = useRef(userDetails);

  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  useEffect(() => {
    selectedUserIdRef.current = selectedUserId;
  }, [selectedUserId]);

  useEffect(() => {
    userDetailsRef.current = userDetails;
  }, [userDetails]);

  // Function to process WebSocket messages
  const handleMessage = (ev) => {
    const messageData = JSON.parse(ev.data);
    if ("online" in messageData) {
      showOnlinePeople(messageData.online);
    } else if ("text" in messageData) {
      // Only update messages if the message is for the currently selected chat
      if (messageData.sender === selectedUserIdRef.current || messageData.recipient === userDetailsRef.current._id) {
        setMessages((prev) => [...prev, { ...messageData }]);
      }
    }
  };

  // WebSocket connection management
  useEffect(() => {
    const connect = () => {
      const newWs = new WebSocket(socketUrl);
      newWs.addEventListener("message", handleMessage); // Attach listener directly
      newWs.addEventListener("close", () => {
        console.log("WebSocket disconnected. Reconnecting...");
        setTimeout(connect, 1000); // Attempt to reconnect after 1 second
      });
      setWs(newWs);
    };

    if (!ws || ws.readyState === WebSocket.CLOSED) {
      connect();
    }

    // Cleanup on component unmount
    return () => {
      if (ws) {
        ws.removeEventListener("message", handleMessage);
        ws.close();
      }
    };
  }, []); // Empty dependency array means this runs once on mount and cleans up on unmount

  // Fetch messages when selectedUserId changes
  useEffect(() => {
    const fetchMessages = async () => {
      if (selectedUserId) {
        try {
          // Corrected incomplete line for axios.get
          const res = await axios.get(`/api/user/messages/${selectedUserId}`);
          setMessages(res.data);
        } catch (error) {
          console.error("Error fetching messages:", error);
        }
      } else {
        setMessages([]); // Clear messages if no user is selected
      }
    };
    fetchMessages();
  }, [selectedUserId]);

  // Fetch offline people and update online/offline lists
  useEffect(() => {
    axios.get("/api/user/people").then((res) => {
      const allUsers = res.data || [];
      const currentUserId = userDetails?._id;

      // Filter out current user and map avatarLink
      const filteredPeople = allUsers.filter(p => p._id !== currentUserId);

      const offlinePeopleArr = filteredPeople.filter(
        (p) => !onlinePeople[p._id]
      );

      const offlinePeopleWithAvatar = offlinePeopleArr.map((p) => ({
        ...p,
        avatarLink: p.avatarLink, // Ensure avatarLink is correctly passed if it exists
      }));

      setOfflinePeople(
        offlinePeopleWithAvatar.reduce((acc, p) => {
          acc[p._id] = p;
          return acc;
        }, {})
      );
    }).catch(error => {
      console.error("Error fetching people:", error);
    });
  }, [onlinePeople, userDetails]);

  // Helper to update online people state
  const showOnlinePeople = (peopleArray) => {
    const people = {};
    peopleArray.forEach(({ userId, username, avatarLink }) => {
      if (userId !== userDetailsRef.current?._id) {
        people[userId] = {
          username,
          avatarLink, // include avatarLink for online users
        };
      }
    });
    setOnlinePeople(people);
  };

  const sendMessage = (ev) => {
    if (ev) ev.preventDefault();
    if (!newMessage.trim() || !selectedUserIdRef.current || !ws || ws.readyState !== WebSocket.OPEN) {
      console.warn("Cannot send message: Message empty, no recipient, or WebSocket not open.");
      return;
    }

    console.log("sending message:", newMessage, "to:", selectedUserIdRef.current);

    ws.send(JSON.stringify({
      recipient: selectedUserIdRef.current,
      text: newMessage,
    }));

    // Optimistically update messages
    setMessages((prev) => [
      ...prev,
      {
        text: newMessage,
        sender: userDetailsRef.current._id,
        recipient: selectedUserIdRef.current,
        _id: Date.now(), // Client-side ID for immediate display
      },
    ]);
    setNewMessage(""); // Clear input after sending
  };

  // Authentication check
  useEffect(() => {
    const authenticateAndNavigate = async () => {
      await checkAuth(); // Ensure checkAuth completes before evaluating isAuthenticated
      if (!isAuthenticated) {
        navigate("/");
      }
    };
    authenticateAndNavigate();
  }, [isAuthenticated, checkAuth, navigate]); // Add isAuthenticated, checkAuth, navigate to dependency array

  return (
    <div className="flex min-h-screen bg-gray-800 text-gray-200"> {/* Adjusted background and text color for dark theme */}
      <Nav />
      <OnlineUsersList
        onlinePeople={onlinePeople}
        selectedUserId={selectedUserId}
        setSelectedUserId={setSelectedUserId}
        offlinePeople={offlinePeople}
      />
      <section className="w-[71%] lg:w-[62%] relative pb-10 flex flex-col"> {/* Added flex-col for correct layout */}
        {selectedUserId && (
          <TopBar
            selectedUserId={selectedUserId}
            setSelectedUserId={setSelectedUserId}
            offlinePeople={offlinePeople}
            onlinePeople={onlinePeople}
          />
        )}
        <ChatMessages
          messages={messages}
          userDetails={userDetails}
          selectedUserId={selectedUserId}
        />
        <div className="mt-auto w-full p-4 flex justify-center"> {/* Changed absolute to relative positioning with mt-auto */}
          <MessageInputForm
            newMessage={newMessage}
            setNewMessage={setNewMessage}
            sendMessage={sendMessage}
            selectedUserId={selectedUserId}
          />
        </div>
      </section>
    </div>
  );
};

export default ChatHome;