import React from 'react';
import { Col, Container, Nav, Navbar, NavDropdown, Row } from 'react-bootstrap';
import './style/Header.css'
import Menu from './Header/Menu';
import User from './Header/User';
import Logo from './Header/Logo';
const Header = () => {
    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Logo />
                <Menu />
                <User />
            </Navbar>
        </>
    );
};

export default Header;