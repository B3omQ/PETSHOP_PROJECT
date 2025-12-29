import React from 'react';
import Header from '../components/Header';
import { Outlet } from 'react-router-dom';
import ScrollToTop from '../components/ScrollToTop';
import Footer from '../components/Footer';

const Layout = () => {
    return (
        <div>
            <Header/>
            <Outlet/>
            <ScrollToTop/>
            <Footer/>
        </div>
    );
};

export default Layout;