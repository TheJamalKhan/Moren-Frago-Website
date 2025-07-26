import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

// REMOVED: The BrowserRouter import is no longer needed in this file.
// import { BrowserRouter } from 'react-router-dom';

// Assuming these are your context providers
import AuthContext from './context/AuthContext.jsx';
import UserContext from './context/UserContext.jsx';
import ShopContext from './context/ShopContext.jsx';

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    {/* The <BrowserRouter> has been REMOVED from around your components.
      The router inside App.jsx is now the only one, which fixes the error.
    */}
    <AuthContext>
      <UserContext>
        <ShopContext>
          <App />
        </ShopContext>
      </UserContext>
    </AuthContext>
  </React.StrictMode>
);
