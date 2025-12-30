import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';

const AdminLayout = () => {
    return (
        <div>
            <Outlet/>
            <Footer/>
        </div>
    );
};

export default AdminLayout;