// In UserContext.jsx
import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { authDataContext } from './AuthContext'; // Make sure this path is correct

export const userDataContext = createContext();

function UserContext({ children }) {
  const [userData, setUserData] = useState(null);
  // --- ADDED: Loading state to track initial authentication check ---
  const [loading, setLoading] = useState(true);
  const { serverUrl } = useContext(authDataContext); // Access serverUrl

  const getCurrentUser = useCallback(async () => {
    if (!serverUrl) {
      console.warn("UserContext: serverUrl not available yet. Skipping user fetch.");
      // If there's no server URL, we can't check, so we stop loading.
      setLoading(false);
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
        console.log("User not authenticated, clearing user data.");
        setUserData(null); // Explicitly set to null if unauthorized
      } else {
        console.error("An unexpected error occurred while fetching user data.");
        setUserData(null); // Clear data for any error
      }
    } finally {
      // --- ADDED: Set loading to false after the API call is complete ---
      setLoading(false);
    }
  }, [serverUrl]); // Dependency on serverUrl

  useEffect(() => {
    // Fetch user data when the component mounts
    getCurrentUser();
  }, [getCurrentUser]);

  const value = {
    userData,
    setUserData,
    getCurrentUser,
    // --- ADDED: Expose the loading state to the rest of the app ---
    loading,
  };

  return (
    <userDataContext.Provider value={value}>
      {children}
    </userDataContext.Provider>
  );
}

export default UserContext;
