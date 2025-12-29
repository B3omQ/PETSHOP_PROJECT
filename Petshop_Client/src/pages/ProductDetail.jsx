import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getProductById } from '../services/products';
import SpinnerComponent from '../components/Loading/Spinner';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const images = product?.images || [];
    const handleNext = () => {
        if (!product?.images) return;
        setActiveIndex((prev) => (prev === product.images.length - 1 ? 0 : prev + 1));
    };

    const handlePrev = () => {
        if (!product?.images) return;
        setActiveIndex((prev) => (prev === 0 ? product.images.length - 1 : prev - 1));
    };
    useEffect(() => {
        const fetchProductDetail = async () => {
            try {
                const response = await getProductById(id);
                console.log(response)
                setProduct(response);
                setLoading(false)
            } catch {
                setLoading(true);
                navigate('/error');
            }
        }
        fetchProductDetail();

    }, [id])
    if (loading) {
        return (
            <SpinnerComponent />
        );
    }
    return (
        <>
            <section className="animal__details-area">
                <div className="container">
                    <div className="animal__details-wrap">
                        <div className="row">
                            <div className="col-61">
                                <div className="animal__details-img-wrap">
                                    <div className="tab-content" id="myTabContent">
                                        <div className="tab-pane fade show active" id="itemOne-tab-pane" role="tabpanel" aria-labelledby="itemOne-tab" tabIndex={0}>
                                            <div className="swiper pet-active">
                                                <div className="swiper-wrapper">
                                                    <div className="swiper-slide">
                                                        {images.length > 0 ? (
                                                            <img
                                                                src={images[activeIndex]}
                                                                alt="Main Product"
                                                                style={{ width: '100%', height: 'auto', transition: '0.3s' }}
                                                            />
                                                        ) : (
                                                            <img src="/assets/img/no-image.jpg" alt="No Image" />
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="pet__nav">
                                                <button
                                                    className="pet-button-prev"
                                                    onClick={handlePrev}
                                                    type="button"
                                                >
                                                    <i className="flaticon-left"></i>
                                                </button>
                                                <button
                                                    className="pet-button-next"
                                                    onClick={handleNext}
                                                    type="button"
                                                >
                                                    <i className="flaticon-next"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <ul className="nav nav-tabs" id="myTab" role="tablist" style={{ flexWrap: 'nowrap', overflowX: 'auto' }}>
                                        {images.map((imgUrl, index) => (
                                            <li className="nav-item" role="presentation" key={index}>
                                                <button
                                                    className={`nav-link ${index === activeIndex ? 'active' : ''}`}
                                                    type="button"
                                                    onClick={() => setActiveIndex(index)}
                                                    style={{ width: '100px', height: '100px', padding: '5px' }}
                                                >
                                                    <img
                                                        src={imgUrl}
                                                        alt={`thumb-${index}`}
                                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                    />
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="animal__details-description">
                                    <h4 className="title">Description</h4>
                                    <p>{product.description}</p>
                                </div>
                                <div className="animal__details-info-wrap">
                                    <h4 className="title">More Additional Information</h4>
                                    <p>When an unknown printer took a galley of type and scrambled ew year make a type speci awmen bookbsites and e-commerce shops. We know how hard.</p>
                                    <div className="introducing__list-box">
                                        <ul className="list-wrap">
                                            <li>
                                                <span className="icon">
                                                    <img src="/assets/img/icon/check_icon02.svg" alt="" className="injectable" />
                                                </span>
                                                Vaccine Completed
                                            </li>
                                            <li>
                                                <span className="icon">
                                                    <img src="/assets/img/icon/check_icon02.svg" alt="" className="injectable" />
                                                </span>
                                                24/7 emergency assistance
                                            </li>
                                            <li>
                                                <span className="icon">
                                                    <img src="/assets/img/icon/check_icon02.svg" alt="" className="injectable" />
                                                </span>
                                                6 Month Health Insurance
                                            </li>
                                            <li>
                                                <span className="icon">
                                                    <img src="/assets/img/icon/check_icon02.svg" alt="" className="injectable" />
                                                </span>
                                                Health Record Profile
                                            </li>
                                            <li>
                                                <span className="icon">
                                                    <img src="/assets/img/icon/check_icon02.svg" alt="" className="injectable" />
                                                </span>
                                                100% Coverage
                                            </li>
                                            <li>
                                                <span className="icon">
                                                    <img src="/assets/img/icon/check_icon02.svg" alt="" className="injectable" />
                                                </span>
                                                NYC sales tax
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-39">
                                <aside className="animal__details-sidebar">
                                    <div className="animal__details-widget">
                                        <div className="animal__details-sidebar-info">
                                            <h4 className="title">{product.productName}</h4>
                                            <p>{product.description}</p>
                                            <h4 className="price">{product.price}</h4>
                                            <ul className="list-wrap">
                                                <li><span>Stock:</span> {product.stock}</li>
                                                <li><span>Category:</span> {product.categoryName}</li>
                                                <li><span>For:</span> {product.petName}</li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="animal__details-widget">
                                        <h4 className="widget-title">Payment Type</h4>
                                        <div className="payment__type-wrap">
                                            <form action="#" className="payment__form">
                                                <div className="select-grp">
                                                    <select name="pet_type" className="orderby" defaultValue="Select">
                                                        <option value="Select">Select</option>
                                                        <option value="Select One">Select One</option>
                                                        <option value="Select Two">Select Two</option>
                                                        <option value="Select Three">Select Three</option>
                                                    </select>
                                                </div>
                                                <button type="submit">Bring Me Home</button>
                                            </form>
                                            <div className="social-wrap">
                                                <h6 className="title">Share This Post:</h6>
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
                                </aside>
                            </div>
                        </div>
                    </div>
                    <div className="related__animal-area">
                        <div className="row align-items-end">
                            <div className="col-md-8">
                                <h3 className="related__animal-title">You May Also Like</h3>
                            </div>
                            <div className="col-md-4">
                                <div className="pet__nav-two">
                                    <button className="petTwo-button-prev"><i className="flaticon-left"></i></button>
                                    <button className="petTwo-button-next"><i className="flaticon-next"></i></button>
                                </div>
                            </div>
                        </div>
                        <div className="swiper pet-active-two">
                            <div className="swiper-wrapper">
                                <div className="swiper-slide">
                                    <div className="animal__item animal__item-two animal__item-three shine-animate-item">
                                        <div className="animal__thumb animal__thumb-two shine-animate">
                                            <a href=""><img src={product.images[0]} alt="img" /></a>
                                            <a href="" className="wishlist"><i className="flaticon-love"></i></a>
                                        </div>
                                        <div className="animal__content animal__content-two">
                                            <h4 className="title"><a href="animal-details.html">Cute French Bulldog</a></h4>
                                            <div className="pet-info">
                                                <ul className="list-wrap">
                                                    <li>Gender: <span>Male</span></li>
                                                    <li>Breed: <span>French</span></li>
                                                </ul>
                                            </div>
                                            <div className="location">
                                                <i className="flaticon-placeholder"></i>
                                                <span>Bakersfield, California</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        
                    </div>
                </div>
            </section>
        </>

    );
};

export default ProductDetail;