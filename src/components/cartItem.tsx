import React from 'react';
import { formatCurrency } from '../lib/utils';
import { ICartItem } from '../models/cart';

interface IProps {
    item: ICartItem;
    currency: string;
    increment: (P: number) => void;
    decrement: (P: number) => void;
    removeItem: (P: number) => void;
}

function CartItem({ item, currency, increment, decrement, removeItem }: IProps) {
    return (
        <div className="cart-item">
            <div className="d-flex justify-content-between py-2">
                <div>{item.title}</div>
                <span
                    className="pointer"
                    onClick={() => {
                        removeItem(item.id);
                    }}
                >
                    &#10006;
                </span>
            </div>
            <div className="d-flex justify-content-end py-2">
                <div className="cart-image">
                    <img src={item.image_url} alt="cart_image" className="img_thumbnail" />
                </div>
            </div>
            <div className="row py-2">
                <div className="col-lg-6 col-sm-12  d-flex justify-content-between align-items-center">
                    <div className="quantity-selector d-flex justify-content-between align-items-center">
                        <span
                            className="pointer"
                            onClick={() => {
                                decrement(item.id);
                            }}
                        >
                            -
                        </span>
                        <span className="px-1"> {item.quantity} </span>
                        <span
                            className="pointer"
                            onClick={() => {
                                increment(item.id);
                            }}
                        >
                            +
                        </span>
                    </div>
                    <div>{formatCurrency(item.price * item.quantity, currency)}</div>
                </div>
            </div>
        </div>
    );
}

export default CartItem;
