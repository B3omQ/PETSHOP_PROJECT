import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getProductById } from '../services/products';
import SpinnerComponent from '../components/Loading/Spinner';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState(null);
    useEffect(() => {
        const fetchProductDetail = async () => {
            try {
                const response = await getProductById(id);
                console.log(response)
                setProduct(response);
                setLoading(false)
            } catch {
                setLoading(true);
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
            <h1 style={{ marginTop: '20%' }}>
                {product.productName}
                {product.description}
            </h1>
        </>

    );
};

export default ProductDetail;