import React, { createContext, useContext, useEffect, useState } from "react"; // Ensure all hooks are imported
import { useAuth } from "./authContext";
import axios from "axios";

// Create the Profile Context
const ProfileContext = createContext();

// Profile Provider component
export const ProfileProvider = ({ children }) => {
  // Access authentication status from AuthContext
  const { isAuthenticated } = useAuth();
  // State to store user details
  const [userDetails, setUserDetails] = useState(null);

  // Effect to fetch user details when authentication status changes
  useEffect(() => {
    const fetchUserDetails = async () => {
      // Only fetch if authenticated
      if (isAuthenticated) {
        try {
          // Make an API call to fetch user profile
          const response = await axios.get(
            "/api/user/profile" // Endpoint to fetch user profile
          );
          // Set the fetched user details to state
          setUserDetails(response.data);
        } catch (error) {
          // Log any errors during the fetch process
          console.error("Error fetching user details in profile:", error); // Use console.error for errors
          setUserDetails(null); // Clear user details on error
        }
      } else {
        // If not authenticated, clear user details
        setUserDetails(null);
      }
    };

    fetchUserDetails(); // Call the async function
  }, [isAuthenticated]); // Dependency array: re-run effect when isAuthenticated changes

  return (
    // Provide isAuthenticated and userDetails to children components
    <ProfileContext.Provider value={{ isAuthenticated, userDetails }}> {/* Fixed: Completed userDetails */}
      {children}
    </ProfileContext.Provider>
  );
};

// Custom hook to consume the Profile Context
export const useProfile = () => {
  return useContext(ProfileContext);
};