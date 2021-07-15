import React from 'react';
import { formatCurrency } from '../lib/utils';
import { IProduct } from '../models/product';

interface IProps {
    product: IProduct;
    addToCart: (P: IProduct) => void;
    currency: string;
}

function Product({ product, addToCart, currency }: IProps) {
    return (
        <div className="product">
            <div className="product-top">
                <img src={product.image_url} loading="lazy" alt="" className="product-image my-1" />
                <div className="product-title pt-3 pb-1">{product.title}</div>
            </div>

            <div className="pt-1 pb-2 product-price">From: {formatCurrency(product.price, currency)}</div>
            <button
                onClick={() => {
                    addToCart(product);
                }}
                className="add-to-cart"
            >
                Add to Cart
            </button>
        </div>
    );
}
export default Product;
