import React from 'react';
import Header from '../components/Header';
import { Outlet, ScrollRestoration } from 'react-router-dom';
import ScrollToTop from '../components/ScrollToTop';
import Footer from '../components/Footer';

const Layout = () => {
    return (
        <div>
            <ScrollRestoration/>
            <Header/>
            <Outlet/>
            <ScrollToTop/>
            <Footer/>
        </div>
    );
};

export default Layout;