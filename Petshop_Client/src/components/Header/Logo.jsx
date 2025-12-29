import React from 'react';
import { Container, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Logo = () => {
    return (
        <div className="nav-logo">
            <Link to="/">
                <img
                    src="/logo4.png"
                    alt="Logo"
                    style={{ width: '100px', height: 'auto', maxWidth: '100%' }}
                />
            </Link>
        </div>
    );
};

export default Logo;