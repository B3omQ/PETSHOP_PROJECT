import React from 'react';
import { Col, Container, Nav, Navbar, NavDropdown, Row } from 'react-bootstrap';

const User = () => {
    return (
        <Container>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto gap-3 user">
                    <Nav.Link href="/cart">
                        <i className="bi bi-cart fs-5"></i>
                    </Nav.Link>
                    <Nav.Link href="/cart">
                        <i className="bi bi-search fs-5"></i>
                    </Nav.Link>
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