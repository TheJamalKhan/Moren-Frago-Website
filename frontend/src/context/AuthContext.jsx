import React from 'react';
import { createContext } from 'react';

export const authDataContext = createContext();

function AuthContext({ children }) {
  // This code automatically chooses the correct URL.
  // On Vercel, it uses the live URL. On your local computer, it uses localhost.
  const serverUrl = import.meta.env.MODE === 'production'
    ? 'https://moren-frago-backend.onrender.com'
    : 'http://localhost:5000';

  const value = {
    serverUrl
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