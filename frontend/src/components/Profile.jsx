import React, { useEffect, useState } from "react";
import axios from "axios";
import Nav from "./Chat/Nav";
import { useProfile } from "../context/profileContext";
import SelectAvatar from "./SelectAvatar";

const Profile = () => {
  const { userDetails } = useProfile();
  const [formData, setFormData] = useState({});
  const [selectedLink, setSelectedLink] = useState("");

  // Initialize formData and selectedLink when userDetails are available
  useEffect(() => {
    if (userDetails) {
      setFormData(userDetails);
      setSelectedLink(userDetails.avatarLink || ""); // Set initial selectedLink from userDetails
    }
  }, [userDetails]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put("/api/user/profile/update", {
        ...formData,
        avatarLink: selectedLink, // Ensure selectedLink is sent
      });
      // Handle successful response (e.g., show a success message or refetch user details)
      console.log("Profile updated successfully:", response.data);
      // You might want to refresh userDetails in your context here if needed
    } catch (error) {
      // Handle error (e.g., show an error message to the user)
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="flex h-full min-h-screen bg-gray-900"> {/* Corrected 'bg-background' to a valid Tailwind class for dark theme */}
      <Nav />
      <div className="bg-gray-900 w-[91%] flex items-center justify-center"> {/* Corrected 'bg-background' and added justify-center */}
        <div className="max-w-xl mx-auto p-8 rounded-lg shadow-lg bg-gray-800"> {/* Added padding, rounded corners, shadow, and a slightly lighter dark background */}
          <h2 className="mb-6 text-3xl font-bold text-white text-center">Update Profile</h2> {/* Adjusted margin-bottom and added text-center */}

          <form onSubmit={handleSubmit}>
            <div className="grid gap-6 mb-6 sm:grid-cols-2"> {/* Corrected gap and margin-bottom */}
              <div className="w-full">
                <label
                  htmlFor="firstName"
                  className="block mb-2 text-sm font-medium text-gray-300" // Corrected text color
                >
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" // Corrected and completed class names
                  value={formData?.firstName || ""} // Added fallback for undefined
                  placeholder="First Name"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="lastName"
                  className="block mb-2 text-sm font-medium text-gray-300" // Corrected text color
                >
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" // Corrected and completed class names
                  value={formData?.lastName || ""} // Added fallback for undefined
                  placeholder="Last Name"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-300" // Corrected text color
                >
                  Email
                </label>
                <input
                  type="email" // Changed type to email for better semantics
                  name="email"
                  id="email"
                  disabled
                  className="bg-gray-700 border border-gray-600 text-gray-400 text-sm rounded-lg cursor-not-allowed block w-full p-2.5" // Corrected and completed class names, added cursor-not-allowed
                  value={userDetails?.email || ""} // Added fallback for undefined
                  placeholder="Email"
                  required
                />
              </div>
            </div>
            <SelectAvatar
              setSelectedLink={setSelectedLink}
              selectedLink={selectedLink}
            />
            <div className="flex items-center justify-center mt-6"> {/* Added justify-center for button */}
              <button
                type="submit"
                className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition duration-200 ease-in-out" // Completed button classes
              >
                Update Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;