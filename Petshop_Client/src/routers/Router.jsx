import React from 'react';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import Layout from '../layouts/Layout';
import Homepage from '../pages/Homepage';
import Errorpage from '../pages/Error/ErrorPage';
import NotFoundPage from '../pages/Error/NotFoundPage';
import ProductDetail from '../pages/ProductDetail';
import ProductByName from '../pages/ProductByName';
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import AdminLayout from '../layouts/AdminLayout';
import AdminDashboard from '../pages/Admin/AdminDashboard';
import TestAuth from '../pages/Auth/TestAuth';
import ForgotPassword from '../pages/Auth/ForgotPassword';
import TestAuth2 from '../pages/Auth/TestAuth2';
const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: '',
                element: <Navigate to="/home" />
            },
            {
                path: 'home',
                element: <Homepage />
            },
            {
                path: 'error',
                element: <Errorpage />
            },
            {
                path: 'product/:id',
                element: <ProductDetail />
            },
            {
                path: 'product/search',
                element: <ProductByName />
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/register',
                element: <Register />
            },
            {
                path: '/testauth',
                element: <TestAuth/>
            },
            {
                path: '/testauth2',
                element: <TestAuth2/>
            },
            {
                path: '/forgot-password',
                element: <ForgotPassword/>
            },
            {
                path: '*',
                element: <NotFoundPage />
            }
        ]
    },

    {
        path: '/admin',
        element: <AdminLayout/> , 
        children: [
            {
                path: '/admin',
                element: <AdminDashboard/>
            }
        ]
    }
])
const Router = () => {
    return (
        <div>
            <RouterProvider router={router} />
        </div>
    );
};

export default Router;