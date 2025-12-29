import React, { useEffect, useState } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { getAllProducts } from '../services/products';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/Cart/CartProvider';
import { useCartStore } from '../stores/cartStore';
import SpinnerComponent from './Loading/Spinner';
import AlertComponent from './AlertComponent';

const BestSeller = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAlert, setShowAlert] = useState(false);
    const navigate = useNavigate();
    const { showCart } = useCart();
    const { addToCart } = useCartStore();
    const handleCloseAlert = () => {
        setShowAlert(false);
    };
    useEffect(() => {

        const fetchProuducts = async () => {
            try {
                const res = await getAllProducts();
                setProducts(res);
                setLoading(false);
            } catch {
                navigate('/error');
                setLoading(true)
            }

        }

        fetchProuducts()
    }, [])
    if (loading) {
        return (
            <>
                <SpinnerComponent />
                {/* <Container>
          <Row>
            {Array.from({ length: 3 }).map((_, index) => (
              <Col md={4} key={index}>
                <LoadingProducts />
              </Col>
            ))}
          </Row>
        </Container> */}
            </>
        );
    }
    return (
        // <div>
        //     <div style={{ textAlign: 'center' }}>
        //         <h1>Top bán chạy</h1>
        //         <h5>Bạn cần thức ăn tươi cho Boss cưng? Bingo!! Bạn đã tìm đúng chỗ.</h5>
        //     </div>
        //     <Container>
        //         <Row
        //             className={`g-4`}
        //             xs={1}
        //             md={4}
        //         >
        //             {products.map(product => {
        //                 return (
        //                     <Col key={product.productId} className={`${showCart ? 'move' : ''}`}>
        //                         <Card className="h-100" onClick={() => navigate(`/product/${product.productId}`)}>
        //                             <div className="product-image-container">
        //                                 <Card.Img
        //                                     variant="top"
        //                                     src={product.image || "https://www.petsense.com/cdn/shop/files/1879992_grande.jpg?v=1752170897"}
        //                                 />

        //                                 <div className="action-overlay">
        //                                     {product.amount === 0 ? (
        //                                         <div className="btn-out-of-stock">
        //                                             OUT OF STOCK
        //                                         </div>
        //                                     ) : (
        //                                         <>
        //                                             <div className="btn-size" onClick={(e) => {
        //                                                 e.stopPropagation();
        //                                                 console.log("Click Size");
        //                                             }}>
        //                                                 SIZE <span>+</span>
        //                                             </div>

        //                                             <button
        //                                                 className="btn-action"
        //                                                 onClick={(e) => {
        //                                                     e.stopPropagation();
        //                                                     addToCart(product)
        //                                                 }}
        //                                             >
        //                                                 ADD
        //                                             </button>
        //                                         </>
        //                                     )}
        //                                 </div>
        //                             </div>
        //                             <Card.Body>
        //                                 <Card.Title>{product.productName}</Card.Title>
        //                                 <Card.Text>
        //                                     {product.description}
        //                                 </Card.Text>
        //                             </Card.Body>
        //                         </Card>
        //                     </Col>
        //                 );
        //             })}
        //         </Row>
        //     </Container>
        // </div>
        <div className="container">
            <div className="row gutter-20 row-cols-1 row-cols-xl-5 row-cols-lg-4 row-cols-md-3 row-cols-sm-2 justify-content-center">
                {products.map((product, index) => {
                    return (
                        <div className="col" key={index} style={{ cursor: 'pointer' }}
                            onClick={() => { navigate(`/product/${product.productId}`) }}>
                            <div className="product__item">
                                <div className="product__thumb">
                                    <a>
                                        <img src={product.images[0] || "https://www.petsense.com/cdn/shop/files/1879992_grande.jpg?v=1752170897"}
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
                                        <a className="btn" onClick={(e) => { e.stopPropagation(); addToCart(product); setShowAlert(true) }}>
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
                    );
                })}
            </div>
            {showAlert && (
                <AlertComponent
                    message="Add to cart successfully!"
                    variant="success"
                    onClose={handleCloseAlert}
                />
            )}
            <nav className="pagination__wrap mt-50">
                <ul className="list-wrap">
                    <li className="link-arrow">
                        <a href="#">
                            <img src="assets/img/icon/pagination_icon01.html" alt="" className="injectable" />
                        </a>
                    </li>
                    <li className="active"><a href="#">1</a></li>
                    <li><a href="courses.html">2</a></li>
                    <li><a href="courses.html">3</a></li>
                    <li><a href="courses.html">4</a></li>
                    <li className="link-arrow">
                        <a href="#">
                            <img src="assets/img/icon/pagination_icon02.html" alt="" className="injectable" />
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default BestSeller;