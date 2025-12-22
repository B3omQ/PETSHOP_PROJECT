import React, { useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { getAllProducts } from '../services/products';
import './style/BestSell.css'
const BestSell = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {

        const fetchUsers = async () => {
            const res = await getAllProducts();
            setProducts(res);
        }

        fetchUsers()
    }, [])
    return (
        <Carousel className='carousel'>
            {products.map(product => (
                <Carousel.Item key={product.productId}>
                    <div className="d-flex justify-content-center">
                        <img
                            src={product.images[0] || 'https://www.petsense.com/cdn/shop/files/1879992_grande.jpg?v=1752170897'}
                            alt={product.productName}
                            style={{
                                height: '400px',
                                objectFit: 'cover'
                            }}
                        />
                    </div>


                    <Carousel.Caption>
                        <div className="caption">
                            <h3>{product.productName}</h3>
                            <p>{product.description}</p>
                        </div>
                    </Carousel.Caption>
                </Carousel.Item>
            ))}
        </Carousel>
    );
};

export default BestSell;