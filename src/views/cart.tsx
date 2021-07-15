import { useLazyQuery, useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { GET_CART, GET_CURRENCIES, GET_PRODUCTS } from '../apollo/queries';
import CartItem from '../components/cartItem';
import { useCart } from '../lib/cart_hooks';
import { calcTotalPrice, formatCurrency } from '../lib/utils';

interface IProps {
    isVisible: boolean;
    setProducts: (P: any) => void;
}

function Cart({ isVisible, setProducts }: IProps) {
    const [cartCurrency, setCartCurrency] = useState('');
    const currencies = useQuery(GET_CURRENCIES);
    const {
        updateCartCurrency,
        updateCartItemsProductInfo,
        toggleCartVisibilityState,
        incrementQuantityOfCartItem,
        decrementQuantityOfCartItem,
        deleteCartItem,
    } = useCart();
    const { data, loading, error } = useQuery(GET_CART);
    const [getProducts, { data: products }] = useLazyQuery(GET_PRODUCTS, {
        onCompleted: (data) => {
            console.log(data);
            updateCartCurrency(cartCurrency);
            setProducts(data?.products);
            updateCartItemsProductInfo(data?.products);
        },
    });
    const handleCurrencyChange = (e: any) => {
        const { value } = e.target;
        getProducts({ variables: { currency: value } });
        setCartCurrency(value);
    };

    return (
        <div className={`cart ${isVisible ? 'visible' : ''}`}>
            <div className="ml-3 d-flex align-items-center pt-3 pb-2 cart-top">
                <div className="d-flex justify-content-start">
                    <div
                        className="cart-toggle rounded-circle border d-flex align-items-center justify-content-center"
                        onClick={() => {
                            toggleCartVisibilityState(false);
                        }}
                    >
                        <span>&#10148;</span>
                    </div>
                </div>
                <div>
                    <h5 className="cart-title">Your Cart</h5>
                </div>
                <div></div>
            </div>
            <div className="row mx-2">
                <div className="col-lg-3 d-flex justify-content-start">
                    <select
                        className="p-1 my-3 outline-none"
                        onChange={handleCurrencyChange}
                        value={data?.cart?.cartCurrency}
                    >
                        {currencies.data?.currency?.map((_currency: string, index: number) => (
                            <option key={index} value={_currency}>
                                {_currency}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="cart-body">
                {data?.cart?.cartItems.length == 0 ? (
                    <div>Your cart is empty.</div>
                ) : (
                    <div className="cart-items">
                        {data?.cart?.cartItems?.map((item: any, index: number) => (
                            <CartItem
                                item={item}
                                key={index}
                                currency={data?.cart?.cartCurrency}
                                increment={(id: number) => {
                                    incrementQuantityOfCartItem(id);
                                }}
                                decrement={(id: number) => {
                                    decrementQuantityOfCartItem(id);
                                }}
                                removeItem={(id: number) => {
                                    deleteCartItem(id);
                                }}
                            />
                        ))}
                    </div>
                )}
            </div>
            <div className="cart-footer">
                <div className="cart-subtotal">
                    <span>Subtotal</span>
                    <div className="font-weight-bold">
                        {data?.cart && formatCurrency(calcTotalPrice(data.cart?.cartItems), data.cart?.cartCurrency)}
                    </div>
                </div>
                <div className="cart-action-btns">
                    <button className="subscription-btn">make this a subscription (save 20%)</button>
                    <button className="checkout-btn">proceed to checkout</button>
                </div>
            </div>
        </div>
    );
}

export default Cart;
