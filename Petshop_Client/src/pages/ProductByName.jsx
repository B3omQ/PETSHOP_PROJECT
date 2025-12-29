import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { getAllProductsByName } from '../services/products';
import { useCartStore } from '../stores/cartStore';
import { Slider } from 'antd';
import SpinnerComponent from '../components/Loading/Spinner';

const ProductByName = () => {
    const [searchParams] = useSearchParams();
    const name = searchParams.get('name');
    const categoryId = searchParams.get('category');
    const [products, setProducts] = useState([]);
    const { addToCart } = useCartStore();
    const navigate = useNavigate();
    const [priceRange, setPriceRange] = useState([20, 80]);
    const [loading, setLoading] = useState(true);
    // Hàm xử lý khi kéo thanh slider
    const handleSliderChange = (value) => {
        setPriceRange(value);
    };
    useEffect(() => {
        const fetchProductByName = async () => {
            try {
                const res = await getAllProductsByName(name, categoryId);
                console.log(res)
                setProducts(res);
                setLoading(false);
            } catch {
                setLoading(true);
            }
        }
        fetchProductByName();
    }, [name, categoryId])

    if (loading) {
        return (
            <>
                <SpinnerComponent />
            </>
        );
    }
    return (
        <>
            <section className="animal__area-three">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-9 col-lg-8 order-0 order-lg-2">
                            <div className="row">
                                {products.length === 0 ? 'There are nothing here' : products.map((product, index) => {
                                    return (
                                        <div className="col-xl-4 col-md-6" key={product.productId}>
                                            <div className="col" key={index} style={{ cursor: 'pointer' }}
                                                onClick={() => { navigate(`/product/${product.productId}`) }}>
                                                <div className="product__item">
                                                    <div className="product__thumb">
                                                        <a>
                                                            <img src={product.images || "https://www.petsense.com/cdn/shop/files/1879992_grande.jpg?v=1752170897"}
                                                            ></img>
                                                        </a>
                                                        <div className="product__action">
                                                            <a href="product-details.html"><i className="flaticon-love"></i></a>
                                                            <a href="product-details.html"><i className="flaticon-loupe"></i></a>
                                                            <a href="product-details.html"><i className="flaticon-exchange"></i></a>
                                                        </div>
                                                        <div className="sale-wrap">
                                                            <span>New</span>
                                                        </div>
                                                        <div className="product__add-cart">
                                                            <a className="btn" onClick={(e) => { e.stopPropagation(); addToCart(product) }}>
                                                                <i className="flaticon-shopping-bag"></i>Add To Cart
                                                            </a>
                                                        </div>
                                                    </div>
                                                    <div className="product__content">
                                                        <div className="product__reviews">
                                                            <div className="rating">
                                                                <i className="fas fa-star"></i>
                                                                <i className="fas fa-star"></i>
                                                                <i className="fas fa-star"></i>
                                                                <i className="fas fa-star"></i>
                                                                <i className="fas fa-star"></i>
                                                            </div>
                                                            <span>(2 Reviews)</span>
                                                        </div>
                                                        <div className="title">
                                                            <h5 href="product-details.html" style={{ color: '#BE976E' }}>{product.productName}</h5>
                                                        </div>
                                                        <h3 className="price">${product.price} <del>${product.oldPrice}</del></h3>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    );
                                })}
                            </div>

                            {/* Pagination */}
                            <nav className="pagination__wrap mt-50">
                                <ul className="list-wrap">
                                    <li className="link-arrow">
                                        <Link to="#">
                                            <img src="assets/img/icon/pagination_icon01.html" alt="" className="injectable" />
                                        </Link>
                                    </li>
                                    <li className="active"><Link to="#">1</Link></li>
                                    <li><Link to="/courses.html">2</Link></li>
                                    <li><Link to="/courses.html">3</Link></li>
                                    <li><Link to="/courses.html">4</Link></li>
                                    <li className="link-arrow">
                                        <Link to="#">
                                            <img src="assets/img/icon/pagination_icon02.html" alt="" className="injectable" />
                                        </Link>
                                    </li>
                                </ul>
                            </nav>
                        </div>

                        {/* Cột Sidebar */}
                        <div className="col-xl-3 col-lg-4">
                            <aside className="animal__sidebar">

                                {/* Search */}
                                <div className="animal__widget">
                                    <h4 className="animal__widget-title">Filters</h4>
                                    <div className="sidebar-search-form">
                                        <form action="#">
                                            <input type="text" placeholder="Type Keywords. . ." />
                                            <button type="submit"><i className="flaticon-loupe"></i></button>
                                        </form>
                                    </div>
                                </div>

                                {/* Price Range */}
                                <div className="animal__widget">
                                    <h4 className="animal__widget-title">Price Range</h4>
                                    <div className="price_filter">
                                        <div style={{ padding: '0 10px 20px 10px' }}> {/* Padding để nút kéo không bị cắt */}
                                            <Slider
                                                range
                                                min={0}
                                                max={100}
                                                defaultValue={priceRange}
                                                onChange={handleSliderChange}
                                                trackStyle={[{ backgroundColor: 'var(--tg-theme-primary)' }]}
                                                handleStyle={[
                                                    { borderColor: 'var(--tg-theme-primary)', backgroundColor: '#fff' },
                                                    { borderColor: 'var(--tg-theme-primary)', backgroundColor: '#fff' }
                                                ]}
                                                railStyle={{ backgroundColor: '#e5e5e5' }}
                                            />
                                        </div>
                                        <div className="price_slider_amount">
                                            <input
                                                type="text"
                                                id="amount"
                                                name="price"
                                                placeholder="Add Your Price"
                                                value={`$${priceRange[0]} - $${priceRange[1]}`}
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Categories */}
                                <div className="animal__widget">
                                    <h4 className="animal__widget-title">Pet Categories</h4>
                                    <div className="courses-cat-list">
                                        <ul className="list-wrap">
                                            <li>
                                                <div className="form-check">
                                                    <input className="form-check-input" type="checkbox" defaultValue="" id="cat_1" />
                                                    <label className="form-check-label" htmlFor="cat_1">Dogs <span>(344)</span></label>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="form-check">
                                                    <input className="form-check-input" type="checkbox" defaultValue="" id="cat_2" />
                                                    <label className="form-check-label" htmlFor="cat_2">Cats <span>(12)</span></label>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="form-check">
                                                    <input className="form-check-input" type="checkbox" defaultValue="" id="cat_3" />
                                                    <label className="form-check-label" htmlFor="cat_3">Rabbit <span>(56)</span></label>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="form-check">
                                                    <input className="form-check-input" type="checkbox" defaultValue="" id="cat_4" />
                                                    <label className="form-check-label" htmlFor="cat_4">Birds <span>(14)</span></label>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="form-check">
                                                    <input className="form-check-input" type="checkbox" defaultValue="" id="cat_5" />
                                                    <label className="form-check-label" htmlFor="cat_5">Fish <span>(11)</span></label>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="form-check">
                                                    <input className="form-check-input" type="checkbox" defaultValue="" id="cat_6" />
                                                    <label className="form-check-label" htmlFor="cat_6">Others <span>(14)</span></label>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="apply-btn" >
                                    <button className="btn"
                                        style={{ backgroundColor: '#BE976E', color: 'white' }}
                                    >Apply Now</button>
                                </div>
                            </aside>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ProductByName;