import React, { useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { getAllProducts } from '../services/products';
import './style/BestSell.css'
import SpinnerMenu from './Loading/SpinnerMenu';

const NewestProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await getAllProducts();
                console.log(res);
                setProducts(res);
                setLoading(false);
            } catch {
                setLoading(true)
            }

        }
        fetchProducts();
    }, [])
    if (loading) {
        return (
            <>
                <SpinnerMenu />
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

export default NewestProducts;