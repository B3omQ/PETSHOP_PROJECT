import React from 'react';
import { Button, Offcanvas } from 'react-bootstrap';
import { useCart } from '../context/Cart/CartProvider';
import { useCartStore } from '../stores/cartStore';
import './style/Cart.css'

const CartOffCanvas = () => {
    const { showCart, closeCart } = useCart();
    const { cart, removeFromCart, updateQuantity } = useCartStore();
    const formatCurrency = (value) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
    };
    const themeColor = '#BE976E';
    const totalPrice = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    return (
        <Offcanvas show={showCart} onHide={closeCart} placement='end' scroll backdrop={false}>
            <Offcanvas.Header closeButton className="border-bottom">
                <Offcanvas.Title style={{ fontWeight: 'bold', fontSize: '1.2rem', color: themeColor }}>
                    CART
                </Offcanvas.Title>
            </Offcanvas.Header>

            <Offcanvas.Body className="d-flex flex-column p-0">
                <div className="flex-grow-1 overflow-auto p-3">
                    {cart.length === 0 ? (
                        <p className="text-center mt-4">Your Cart Is Empty</p>
                    ) : (
                        cart.map((item, index) => (
                            <div key={index} className="d-flex mb-4">
                                <div style={{ width: '100px', height: '120px', flexShrink: 0 }} className="bg-light me-3">
                                    <img
                                        src={item?.images || ''}
                                        alt={item.productName}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                </div>

                                <div className="flex-grow-1 d-flex flex-column justify-content-between">
                                    <div>
                                        <p className="mb-1 fw-bold" style={{ fontSize: '0.95rem' }}>
                                            {item.productName}
                                        </p>
                                        <p className="text-muted mb-2" style={{ fontSize: '0.85rem' }}>
                                            Color: {item.color || 'Solid.Đen'} <br /> Size: {item.size || 'L'}
                                        </p>
                                    </div>

                                    <div className="d-flex align-items-center justify-content-between">
                                        <div className="d-flex align-items-center border rounded-pill px-2 py-1" style={{ width: 'fit-content' }}>
                                            <span
                                                role="button"
                                                className="px-2 cursor-pointer select-none"
                                                onClick={() => updateQuantity(item.productId, -1)}
                                            >-</span>
                                            <span className="px-2 fw-bold">{item.quantity}</span>
                                            <span
                                                role="button"
                                                className="px-2 cursor-pointer select-none"
                                                onClick={() => updateQuantity(item.productId, 1)}
                                            >+</span>
                                        </div>

                                        <div className="d-flex align-items-center justify-content-between">
                                            <span
                                                role="button"
                                                className="text-secondary fs-5 trash-icon"
                                                onClick={() => removeFromCart(item.productId)}
                                            >
                                                <i className="bi bi-trash"></i>
                                            </span>

                                            <span
                                                className="fw-bold price"
                                                style={{ color: themeColor }}
                                            >
                                                {formatCurrency(item.price * item.quantity)}
                                            </span>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {cart.length > 0 && (
                    <div className="border-top p-3 bg-white">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <span className="fw-bold">Tổng :</span>
                            <span className="fw-bold fs-5" style={{ color: themeColor }}>
                                {formatCurrency(totalPrice)}
                            </span>
                        </div>

                        <Button
                            className="w-100 rounded-pill py-2 mb-3 fw-bold text-uppercase"
                            style={{ letterSpacing: '1px', backgroundColor: themeColor }}
                        >
                            Check Out
                        </Button>

                        {/* Link Xem giỏ hàng (Màu BE976E) */}
                        <div className="text-center">
                            <span
                                role="button"
                                className="fw-bold text-decoration-underline"
                                style={{ fontSize: '0.9rem', cursor: 'pointer', color: themeColor }}
                            >
                                View Cart Detail
                            </span>
                        </div>
                    </div>
                )}
            </Offcanvas.Body>
        </Offcanvas>
    );
};

export default CartOffCanvas;