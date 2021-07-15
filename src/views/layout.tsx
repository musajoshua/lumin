import { useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { GET_CART_VISIBILITY_STATE } from '../apollo/queries';
import AllProducts from './allProducts';
import Navbar from './navbar';
import Cart from './cart';

function Layout() {
    const { data } = useQuery(GET_CART_VISIBILITY_STATE);
    const [products, setProducts] = useState([]);

    return (
        <div className="lumin-container">
            <Navbar />
            <AllProducts products={products} />
            {data && data.isCartVisible && <div id="overlay"></div>}
            <Cart
                isVisible={data?.isCartVisible}
                setProducts={(products: any) => {
                    setProducts(products);
                }}
            />
        </div>
    );
}
export default Layout;
