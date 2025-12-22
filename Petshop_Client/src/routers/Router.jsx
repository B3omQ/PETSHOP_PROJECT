import React from 'react';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import Layout from '../layouts/Layout';
import Homepage from '../pages/Homepage';
import Errorpage from '../pages/Error/ErrorPage';
import NotFoundPage from '../pages/Error/NotFoundPage';
import CartOffCanvas from '../components/CartOffCanvas';
import ProductDetail from '../pages/ProductDetail';
import ProductByName from '../pages/ProductByName';
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
                element: <ProductDetail/>
            },
            {
                path: 'product/search',
                element: <ProductByName/>
            },
            {
                path: '*' ,
                element: <NotFoundPage/>
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