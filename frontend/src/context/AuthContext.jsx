import React from 'react';
import { createContext } from 'react';

export const authDataContext = createContext();

function AuthContext({ children }) {
  let serverUrl = 'https://moren-frago-website-backend.onrender.com'; // This is correct

  // Correct way: Pass an object as the value
  let value = {
    serverUrl // This creates an object like { serverUrl: 'http://localhost:5000' }
  };

  return (
    <div>
      <authDataContext.Provider value={value}>
        {children}
      </authDataContext.Provider>
    </div>
  );
}

export default AuthContext;
