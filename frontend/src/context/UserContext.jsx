// In UserContext.jsx
import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { authDataContext } from './AuthContext'; // Make sure this path is correct

export const userDataContext = createContext();

function UserContext({ children }) {
  const [userData, setUserData] = useState(null);
  const { serverUrl } = useContext(authDataContext); // Access serverUrl

  const getCurrentUser = useCallback(async () => {
    if (!serverUrl) {
      console.warn("UserContext: serverUrl not available yet. Skipping user fetch.");
      return;
    }
    try {
      const result = await axios.get(`${serverUrl}/api/user/getCurrentUser`, {
        withCredentials: true // Important for sending cookies
      });
      setUserData(result.data);
      console.log("User data fetched successfully:", result.data);
    } catch (error) {
      console.error("getCurrentUser error:", error);
      if (error.response && error.response.status === 401) {
        // This is the expected behavior if no user is logged in
        console.log("User not authenticated, clearing user data.");
        setUserData(null); // Explicitly set to null if unauthorized
      } else {
        // Handle other types of errors (e.g., 500 server error)
        console.error("An unexpected error occurred while fetching user data.");
        setUserData(null); // Clear data for any error
      }
    }
  }, [serverUrl]); // Dependency on serverUrl

  useEffect(() => {
    // Fetch user data when the component mounts or serverUrl becomes available
    getCurrentUser();
  }, [getCurrentUser]); // Dependency on getCurrentUser (from useCallback)

  const value = {
    userData,
    setUserData,
    getCurrentUser,
  };

  return (
    <userDataContext.Provider value={value}>
      {children}
    </userDataContext.Provider>
  );
}

export default UserContext;