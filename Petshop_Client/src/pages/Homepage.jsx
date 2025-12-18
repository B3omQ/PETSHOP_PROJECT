import React, { useEffect, useState } from 'react';
import { getAllProducts} from '../services/products';

const Homepage = () => {
    const [products , setProducts] = useState([]);

    useEffect(() => {
        
       const fetchUsers = async () => {
        const res = await getAllProducts();
        setProducts(res);
       }
       
       fetchUsers()
    } , [])

    return (
        <div>
            {products.map(product => {
                return (
                  <div key={product.productId}>
                    {product.productName}
                    {console.log(product)}
                  </div>      
                );
            })}
        </div>
    );
};

export default Homepage;