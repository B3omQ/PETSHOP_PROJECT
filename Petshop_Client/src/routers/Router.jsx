import React from 'react';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import Layout from '../layouts/Layout';
import Homepage from '../pages/Homepage';
const router = createBrowserRouter([
    {
        path : '/',
        element : <Layout/>,
        children: [
            {
                path: '',
                element : <Navigate to = "/home"/>
            },
            {
                path:'home' ,
                element: <Homepage/>
            }
        ] 
    }
])
const Router = () => {
    return (
        <div>
            <RouterProvider router={router}/>
        </div>
    );
};

export default Router;