import React from 'react'
import ReactDOM from 'react-dom/client'
import * as bootstrap from 'bootstrap'
import "bootstrap/dist/css/bootstrap.css";
import {store} from './store'
import { Provider } from 'react-redux'

import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";

import SignPage from "@/pages/Sign"
import TimelinePage from "@/pages/Timeline"
import PostDetail from '@/pages/PostDetail';
import Home from './pages/Home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    children: [
      {
        path: "/:username",
        element: <TimelinePage/>,
      },
      {
        path: "/tweet/:id",
        element: <PostDetail/>,
      },
    ]
  },
  {
    path: "/u/sign",
    element: <SignPage/>,
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
)
