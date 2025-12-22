import React, { useEffect, useState } from 'react';
import { getAllProducts } from '../services/products';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import BestSell from '../components/BestSell';
import SpinnerComponent from '../components/Loading/Spinner';
import { useNavigate } from 'react-router-dom';
import LoadingProducts from '../components/Loading/LoadingProducts';
import '../style/HomePage/card.css'
import { useCart } from '../context/Cart/CartProvider';
const Homepage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { showCart } = useCart()
  useEffect(() => {

    const fetchUsers = async () => {
      try {
        const res = await getAllProducts();
        setProducts(res);
        setLoading(false);
      } catch {
        navigate('/error');
      }

    }

    fetchUsers()
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
    <>
      <BestSell />
      <br></br>
      <div style={{ textAlign: 'center' }}>
        <h1>Top bán chạy</h1>
        <h5>Bạn cần thức ăn tươi cho Boss cưng? Bingo!! Bạn đã tìm đúng chỗ.</h5>
      </div>
      <Container>
        <Row
          className={`g-4`}
          xs={1}
          md={4}
        >
          {products.map(product => {
            return (
              <Col key={product.productId} className={`${showCart ? 'move' : ''}`}>
                <Card className="h-100" onClick={() => navigate(`/product/${product.productId}`)}>
                  <div className="product-image-container">
                    <Card.Img
                      variant="top"
                      src={product.image || "https://www.petsense.com/cdn/shop/files/1879992_grande.jpg?v=1752170897"}
                    />

                    <div className="action-overlay">
                      {product.amount === 0 ? (
                        <div className="btn-out-of-stock">
                          OUT OF STOCK
                        </div>
                      ) : (
                        <>
                          <div className="btn-size" onClick={(e) => {
                            e.stopPropagation(); 
                            console.log("Click Size");
                          }}>
                            SIZE <span>+</span>
                          </div>

                          <button
                            className="btn-action"
                            onClick={(e) => {
                              e.stopPropagation(); 
                              console.log("Add to cart");
                            }}
                          >
                            ADD
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                  <Card.Body>
                    <Card.Title>{product.productName}</Card.Title>
                    <Card.Text>
                      {product.description}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default Homepage;