import React, { useEffect, useState } from 'react';
import Product from '../components/product';
import { useLazyQuery, useQuery } from '@apollo/client';
import { useCart } from '../lib/cart_hooks';
import { GET_CART_CURRENCY, GET_PRODUCTS } from '../apollo/queries';

interface IProps {
    products: any;
}

function AllProducts({ products: parentProducts }: IProps) {
    const [productList, setProductList] = useState([]);
    const [getProducts, { loading, error, data: products }] = useLazyQuery(GET_PRODUCTS, {
        onCompleted: (data) => {
            setProductList(data.products);
        },
    });

    useEffect(() => {
        setProductList(parentProducts);
    }, [parentProducts]);
    const { data: currency } = useQuery(GET_CART_CURRENCY, {
        onCompleted: (data) => {
            getProducts({ variables: { currency: data?.cart?.cartCurrency } });
        },
        onError: () => <div>Error !</div>,
    });
    const { updateCartItems, toggleCartVisibilityState } = useCart();

    const addToCart = (product: any) => {
        const payload = {
            quantity: 1,
            productId: product.id,
            title: product.title,
            price: product.price,
            image_url: product.image_url,
        };
        updateCartItems(payload);
        toggleCartVisibilityState(true);
    };

    return (
        <section className="main-products">
            <div className="products-banner-container">
                <div className="products-banner-body">
                    <div className="d-flex flex-column align-items-start">
                        <h1 className="chakra-heading css-6zdeqh">All Products</h1>
                        <p className="chakra-text css-12eueq9">A 360° look at Lumin</p>
                    </div>
                    <div className="filter-container">
                        <div className="custom-select-wrapper">
                            <select className="select-dropdown">
                                <option value="">Filter By</option>
                            </select>
                            <div className="select-indicator">
                                <svg
                                    viewBox="0 0 24 24"
                                    role="presentation"
                                    className="chakra-select__icon"
                                    focusable="false"
                                    aria-hidden="true"
                                    style={{ width: '1em', height: '1em', color: 'currentColor' }}
                                >
                                    <path fill="currentColor" d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="product-grid-container">
                <div className="products row py-5">
                    {loading &&
                        [1, 2, 3].map((item) => (
                            <div className="product-container col-lg-4 col-sm-6 shimmer-div " key={item}>
                                <div className="lines shine  pl-0" style={{ width: 'auto', height: '150px' }}></div>
                                <div
                                    className="lines shine  pl-0 mt-2 mb-3"
                                    style={{ width: 'auto', height: '15px' }}
                                ></div>
                                <div className="lines shine  pl-0 my-2" style={{ width: 'auto', height: '20px' }}></div>
                                <div className="lines shine  pl-0 mt-2" style={{ width: 'auto', height: '50px' }}></div>
                            </div>
                        ))}

                    {error && <div>Error</div>}
                    {productList?.map((product: any, index: number) => (
                        <div className="product-container col-lg-4 col-sm-6" key={index}>
                            <Product
                                product={product}
                                currency={currency?.cart?.cartCurrency}
                                key={index}
                                addToCart={addToCart}
                            ></Product>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default AllProducts;
