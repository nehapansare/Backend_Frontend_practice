import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './views/Home/Home';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Film from './views/Film/Film';

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/film/:id",
    element: <Film/>
  }
]);

root.render(
  <RouterProvider router={router} />
);
