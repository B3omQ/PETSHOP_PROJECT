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