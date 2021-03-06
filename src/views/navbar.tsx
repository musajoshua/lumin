import { useQuery } from '@apollo/client';
import React, { useState, useMemo } from 'react';
import { GET_CART } from '../apollo/queries';

import { useCart } from '../lib/cart_hooks';

import logo from './../logo.png';
import cart from './../cart.png';

function Navbar() {
    const [totalCartItem, setTotalCartItem] = useState(0);
    const { data, loading, error } = useQuery(GET_CART);

    const { toggleCartVisibilityState } = useCart();

    useMemo(() => {
        setTotalCartItem(data?.cart?.cartItems?.reduce((acc: any, b: any) => b?.quantity + acc, 0) || 0);
    }, [data]);

    return (
        <nav className="navbar">
            <div className="navbar_links">
                <a href="#" className="navbar_links_text">
                    <img className="logo" src={logo} />
                </a>
                <a className="navbar_links_text" href="#">
                    Shop
                </a>
                <a className="navbar_links_text" href="#">
                    Learn
                </a>
            </div>
            <div className="navbar_links navbar_right">
                <a className="navbar_links_text" href="#">
                    Account
                </a>
                <div className="navbar_cart_total" onClick={() => toggleCartVisibilityState(true)}>
                    <img className="cart_logo" src={cart} />
                    <sup className="navbar_cart_total_text">{totalCartItem}</sup>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
