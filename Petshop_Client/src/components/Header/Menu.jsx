import React, { useEffect, useState } from 'react';
import { Col, Container, Nav, Navbar, NavDropdown, Row } from 'react-bootstrap';
import { getAllCategories } from '../../services/categories';
import SpinnerMenu from '../Loading/SpinnerMenu';
import '../style/Header.css'
import { Link, useNavigate } from 'react-router-dom';
const Menu = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState(0);
    const [active, setActive] = useState('home');
    const handleActive = (menuName) => {
        setActive(menuName);
    }
    const handleActiveCategory = (index) => {
        setActiveCategory(index)
    }
    const navigate = useNavigate();

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
        <>
            <div className="tgmenu__navbar-wrap tgmenu__navbar-wrap-two tgmenu__main-menu d-none d-xl-flex">
                <ul className="navigation" >
                    <li className={`menu-item-has-children ${active === 'home' ? 'active' : ''}`} onClick={() => handleActive('home')}>
                        <Link to="/" className='delete'>Home</Link>
                        <ul className="sub-menu">
                            <li><Link to="/index">Pet Care & Veterinary</Link></li>
                            <li><Link to="/index-2">Pet Breed</Link></li>
                            <li><Link to="/index-3">Pet Adopt</Link></li>
                            <li><Link to="/index-4">Pet Woocommerce</Link></li>
                        </ul>
                    </li>
                    <li><Link to="/about" className='delete'>About</Link></li>
                    <li className={`menu-item-has-children ${active === 'shop' ? 'active' : ''}`} onClick={() => handleActive('shop')}>
                        <Link to="#" className='delete'>Categories</Link>
                        <ul className="sub-menu">
                            {
                                loading ? <SpinnerMenu /> :
                                    categories.map((category, index) => {
                                        return (

                                            <li key={category.categoryId} className={`${activeCategory === index ? 'active' : ''}`}>
                                                <NavDropdown.Item onClick={
                                                    () => {
                                                        navigate(`/product/search?category=${category.categoryId}`)
                                                        handleActiveCategory(index)
                                                    }
                                                }>
                                                    {category.categoryName}
                                                </NavDropdown.Item>
                                            </li>

                                        );
                                    })}
                        </ul>
                    </li>
                    <li><Link to="/contact" className='delete'>contacts</Link></li>
                </ul>
            </div>
        </>


    );
};

export default Menu;