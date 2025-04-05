import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from 'react-router-dom'
import router from './routers/router.jsx'
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/features/store.js';
import adminrouter from './routers/adminrouter.jsx';




createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}> 
   <RouterProvider router={router} />
   <RouterProvider router={adminrouter} />
   </Provider>
  </StrictMode>,
);
