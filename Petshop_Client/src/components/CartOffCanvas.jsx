import React from 'react';
import { Button, Offcanvas } from 'react-bootstrap';
import { useCart } from '../context/Cart/CartProvider';

const CartOffCanvas = () => {
    const { showCart , closeCart } = useCart();
    return (
        <>
            <Offcanvas show={showCart} onHide={closeCart} placement='end' scroll backdrop={false}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>CART</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    Some text as placeholder. In real life you can have the elements you
                    have chosen. Like, text, images, lists, etc.
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
};

export default CartOffCanvas;