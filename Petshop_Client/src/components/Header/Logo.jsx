import React from 'react';
import { Container, Navbar } from 'react-bootstrap';

const Logo = () => {
    return (
        <Container>
            <Navbar.Brand href="/home" className="logo">
                <img src="/logo4.png" className='img' />
                Cuddle Pet
            </Navbar.Brand>
        </Container>
    );
};

export default Logo;