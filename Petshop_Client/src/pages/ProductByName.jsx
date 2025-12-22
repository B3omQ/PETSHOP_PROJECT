import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getAllProductsByName } from '../services/products';

const ProductByName = () => {
    const [searchParams] = useSearchParams();
    const name = searchParams.get('name');
    const [products, setProducts] = useState([]);
    useEffect(() => {
        const fetchProductByName = async () => {
            const res = await getAllProductsByName(name);
            setProducts(res);
        }
        fetchProductByName();
    }, [name])
    return (
        <div>
            {products.map(product => {
                return (
                    <div key={product.productId}>
                        {product.productName}
                    </div>
                );
            })}
        </div>
    );
};

export default ProductByName;