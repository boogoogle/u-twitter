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

const router = createBrowserRouter([
  {
    path: "/sign",
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
