import React, { useEffect, useState } from 'react';
import { Col, Container, Nav, Navbar, NavDropdown, Row } from 'react-bootstrap';
import { getAllCategories } from '../../services/categories';
import SpinnerMenu from '../Loading/SpinnerMenu';
import '../style/Header.css'
const Menu = () => {
    const [showCategories, setShowCategories] = useState(false);
    const [showIntroduce, setShowIntroduce] = useState(false);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const showDropdown = () => {
        setShowCategories(true);
    };

    const hideDropdown = () => {
        setShowCategories(false);
    };

    const showIntroduction = () => {
        setShowIntroduce(true);
    }

    const hideIntroduction = () => {
        setShowIntroduce(false);
    }

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const categories = await getAllCategories();
                setCategories(categories);
                setLoading(false);
            } catch {
                setLoading(true);
            }
        }
        fetchCategories();
    }, [])

    return (
        <Container>
            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-center">
                <Nav className="gap-4">
                    <NavDropdown title="Introduce" id="basic-nav-dropdown" className='menu'
                        show={showIntroduce}
                        onMouseEnter={showIntroduction}
                        onMouseLeave={hideIntroduction}
                    >
                        <NavDropdown.Item href="#action/3.1">Guide</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.2">
                            Store policies
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.2">
                            Contact
                        </NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown
                        title="Categories"
                        id="categories-dropdown"
                        className="mega-menu-parent menu"
                        show={showCategories}
                        onMouseEnter={showDropdown}
                        onMouseLeave={hideDropdown}
                    >
                        <div className="mega-menu-container">
                            <Container fluid>
                                <Row>
                                    <Col>
                                        <h6>Categories</h6>
                                        <ul className="list-unstyled">
                                            {
                                                loading ? <SpinnerMenu /> :
                                                    categories.map(category => {
                                                        return (

                                                            <li key={category.categoryId}>
                                                                <NavDropdown.Item href="#action/3.1">
                                                                    {category.categoryName}
                                                                </NavDropdown.Item>
                                                            </li>

                                                        );
                                                    })}
                                        </ul>
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                    </NavDropdown>
                    <Nav.Link href="#"><p className='menu'>Foods Menu</p></Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Container>
    );
};

export default Menu;