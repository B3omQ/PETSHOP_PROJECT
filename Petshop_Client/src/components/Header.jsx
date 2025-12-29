import React, { useEffect, useState } from 'react';
import { Col, Container, Dropdown, Nav, Navbar, NavDropdown, Row, SplitButton } from 'react-bootstrap';
import './style/Header.css'
import Menu from './Header/Menu';
import User from './Header/User';
import Logo from './Header/Logo';
import { Link, useNavigate } from 'react-router-dom';
import SearchModal from './Header/SearchModal';
import CartOffCanvas from './CartOffCanvas';
import { getAllCategories } from '../services/categories';
import SpinnerMenu from './Loading/SpinnerMenu';
const Header = () => {
    const [active, setActive] = useState('home');
    const [toggle, setToggle] = useState(false);
    const [dropDown, setDropDown] = useState('');
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState(null);
    const navigate = useNavigate();
    const handleActive = (menuName) => {
        setActive(menuName);
    }
    const handleDropDown = (menuName) => {
        if (dropDown === menuName) {
            setDropDown('');
        } else {
            setDropDown(menuName);
        };
    }
    const handleToggle = () => {
        setToggle(!toggle);
    }
    const handleActiveCategory = (index) => {
        setActiveCategory(index)
    }
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await getAllCategories();
                setCategories(res);
                setLoading(false);
            } catch {
                setLoading(true);
            }
        }
        fetchCategories();
    }, [])
    return (
        <>
            <div id="sticky-header" className="tg-header__area tg-header__area-four">
                <div className="container" >
                    <div className="row">
                        <div className="col-12">
                            <div className="tgmenu__wrap">
                                <nav className="tgmenu__nav">
                                    <Logo />
                                    <Menu />
                                    <User />

                                    {/* Mobile Menu Toggler */}
                                    <div className="mobile-nav-toggler" onClick={handleToggle}>
                                        <i className="flaticon-layout"></i>
                                    </div>
                                </nav>
                            </div>

                            {/* Mobile Menu Container */}
                            <div className={`tgmobile__menu ${toggle ? 'active' : ''}`}>
                                <nav className="tgmobile__menu-box">
                                    <div className="close-btn" onClick={handleToggle}>
                                        <i className="fas fa-times"></i>
                                    </div>

                                    <div className="nav-logo">
                                        <Link to="/">
                                            <img src="/logo4.png" alt="Logo" />
                                        </Link>
                                    </div>

                                    <div className="tgmobile__menu-outer">
                                        <ul className="navigation">
                                            <li className={`menu-item-has-children ${active === 'home' ? 'active' : ''}`} onClick={() => handleActive('home')}>
                                                <Link to="/" className='delete'>
                                                    Home
                                                </Link>

                                                <div
                                                    className="dropdown-btn"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        handleDropDown('home');
                                                        handleActiveCategory(null);
                                                    }}
                                                >
                                                    <i className="fas fa-angle-down"></i>
                                                </div>

                                                {dropDown === 'home' ? (
                                                    <ul className="sub-menu" style={{ display: 'block' }}>
                                                        <li><Link to="/index">Pet Care & Veterinary</Link></li>
                                                        <li><Link to="/index-2">Pet Breed</Link></li>
                                                        <li><Link to="/index-3">Pet Adopt</Link></li>
                                                        <li><Link to="/index-4">Pet Woocommerce</Link></li>
                                                    </ul>
                                                ) : ''}

                                            </li>
                                            <li className={`menu-item-has-children ${active === 'categories' ? 'active' : ''}`} onClick={() => handleActive('categories')}>

                                                <Link to="#" className='delete'
                                                >Categories</Link>
                                                <div
                                                    className="dropdown-btn"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        handleDropDown('categories');
                                                    }}
                                                >
                                                    <i className="fas fa-angle-down"></i>
                                                </div>

                                                {dropDown === 'categories' ? (
                                                    <ul className="sub-menu" style={{ display: 'block' }}>
                                                        {!loading ? categories.map((category, index) => {
                                                            return (
                                                                <li key={category.categoryId}
                                                                    className={`${activeCategory === index ? 'active' : ''}`}
                                                                ><Link onClick={(e) => {
                                                                    e.preventDefault();
                                                                    navigate(`/product/search?category=${category.categoryId}`)
                                                                    handleActiveCategory(index)
                                                                }
                                                                }>{category.categoryName}</Link></li>
                                                            );
                                                        }) : <SpinnerMenu/>}
                                                    </ul>
                                                ) : ''}
                                            </li>

                                            <li><Link to="/about" className='delete'>About</Link></li>
                                            <li><Link to="/contact" className='delete'>contacts</Link></li>
                                        </ul>
                                    </div>

                                    <div className="social-links">
                                        <ul className="list-wrap">
                                            <li><a href="#"><i className="fab fa-facebook-f"></i></a></li>
                                            <li><a href="#"><i className="fab fa-twitter"></i></a></li>
                                            <li><a href="#"><i className="fab fa-instagram"></i></a></li>
                                        </ul>
                                    </div>
                                </nav>
                            </div>

                            <div
                                className={`tgmobile__menu-backdrop ${toggle ? 'active' : ''}`}
                                onClick={handleToggle}
                            ></div>

                            {/* End Mobile Menu */}

                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default Header;