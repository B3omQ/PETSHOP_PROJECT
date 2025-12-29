import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div className="footer__area fix">
            {/* Footer Top */}
            <div className="footer__top footer__top-three fix">
                <div className="container">
                    <div className="row">
                        {/* Logo & Social */}
                        <div className="col-xl-3 col-lg-4 col-md-6">
                            <div className="footer__widget">
                                <div className="footer__logo">
                                    <Link to="/">
                                        <img src="/logo4.png" alt="Logo" style={{maxWidth: '100%', maxHeight : '100%', width : '50%' , height : '100%'}}/>
                                    </Link>
                                </div>
                                <div className="footer__content footer__content-two">
                                    <p>Duis aute irure dolor in repreerit in voluptate velitesse We understand that your furry friend tred member</p>
                                </div>
                                <div className="footer__social">
                                    <h6 className="title">Follow Us On:</h6>
                                    <ul className="list-wrap">
                                        <li><a href="https://www.facebook.com/" target="_blank" rel="noreferrer"><i className="fab fa-facebook-f"></i></a></li>
                                        <li><a href="https://twitter.com/" target="_blank" rel="noreferrer"><i className="fab fa-twitter"></i></a></li>
                                        <li><a href="https://www.whatsapp.com/" target="_blank" rel="noreferrer"><i className="fab fa-whatsapp"></i></a></li>
                                        <li><a href="https://www.instagram.com/" target="_blank" rel="noreferrer"><i className="fab fa-instagram"></i></a></li>
                                        <li><a href="https://www.youtube.com/" target="_blank" rel="noreferrer"><i className="fab fa-youtube"></i></a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                            <div className="footer__widget">
                                <h4 className="footer__widget-title">Quick Links</h4>
                                <div className="footer__link">
                                    <ul className="list-wrap">
                                        <li><Link to="/animal">Animal Rescue</Link></li>
                                        <li><Link to="/education">Humane Education</Link></li>
                                        <li><Link to="/caregivers">Caregivers</Link></li>
                                        <li><Link to="/blog">New & Blog</Link></li>
                                        <li><Link to="/gallery">Gallery</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Support */}
                        <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                            <div className="footer__widget">
                                <h4 className="footer__widget-title">Support</h4>
                                <div className="footer__link">
                                    <ul className="list-wrap">
                                        <li><Link to="/about">About us</Link></li>
                                        <li><Link to="/contact">Contact us</Link></li>
                                        <li><Link to="/reservation">Book Appointment</Link></li>
                                        <li><Link to="/faq">FAQ</Link></li>
                                        <li><Link to="/locations">Locations</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Contact Info */}
                        <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                            <div className="footer__widget">
                                <h4 className="footer__widget-title">Contact</h4>
                                <div className="footer__contact">
                                    <ul className="list-wrap">
                                        <li>555 A, East Manster Street, Ready Halley Neon, Uk 4512</li>
                                        <li><a href="tel:0123456789">+00 123 45678 44</a></li>
                                        <li><a href="mailto:Supportinfo@gmail.com">Supportinfo@gmail.com</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Shapes */}
                <div className="footer__shape-wrap">
                    <img src="assets/img/images/footer_shape01.png" alt="img" data-aos="fade-up-right" data-aos-delay="400" />
                    <img src="assets/img/images/footer_shape02.png" alt="img" data-aos="fade-up-left" data-aos-delay="400" />
                </div>
            </div>

            {/* Footer Bottom */}
            <div className="footer__bottom footer__bottom-two">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-5">
                            <div className="copyright-text copyright-text-three">
                                <p>Copyright © {new Date().getFullYear()}. All Rights Reserved.</p>
                            </div>
                        </div>
                        <div className="col-lg-7">
                            <div className="footer__bottom-menu footer__bottom-menu-two">
                                <ul className="list-wrap">
                                    <li><Link to="/support">Support</Link></li>
                                    <li><Link to="/terms">Terms & Conditions</Link></li>
                                    <li><Link to="/privacy">Privacy Policy</Link></li>
                                    <li><Link to="/career">Career</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;