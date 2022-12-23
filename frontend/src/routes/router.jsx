import {
  createBrowserRouter,
} from "react-router-dom";
import { Navigate, Outlet } from 'react-router-dom';
import Root from "../Root";

import Home from '../pages/Home';
import Singup from "../pages/Singup";
import User from '../pages/User';
import Error404 from './Error404';

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <Error404 />
  },
  {
    path: '/user',
    element: <User />,
    errorElement: <Error404 />
  },
  {
    path: '/signup',
    element: <Singup />,
    errorElement: <Error404 />
  },
  {
    path: '/root',
    element: <Root />,
    errorElement: <Error404 />
  },
]);