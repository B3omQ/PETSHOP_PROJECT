import React, { useState } from 'react';
import { Col, Container, Nav, Navbar, NavDropdown, Offcanvas, Row } from 'react-bootstrap';
import { useCart } from '../../context/Cart/CartProvider';
import CartOffCanvas from '../CartOffCanvas';
import SearchModal from './SearchModal';
import { useSearchContext } from '../../context/Search/SearchProvider';

const User = () => {
    const { showCart, openCart } = useCart();
    const { showSearch, openSearch } = useSearchContext()

    return (
        <Container>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto gap-3 user">

                    <Nav.Link onClick={openCart}>
                        <i className="bi bi-cart fs-5"></i>
                    </Nav.Link>
                    {showCart ? <CartOffCanvas /> : ''}
                    <Nav.Link onClick={openSearch}>
                        <i className="bi bi-search fs-5"></i>
                    </Nav.Link>
                    {showSearch ? <SearchModal /> : ''}
                    <NavDropdown title={<i className="bi bi-person fs-5"></i>}
                        id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1"><i className="bi bi-person"></i> Profile</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">
                            <i class="bi bi-gear"></i> Settings
                        </NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3"><i class="bi bi-clock-history"></i> Order Tracking</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">
                            <i class="bi bi-box-arrow-right"></i> Logout
                        </NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Container>
    );
};

export default User;