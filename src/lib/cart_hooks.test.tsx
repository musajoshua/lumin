import React from 'react';
import { useCart } from './cart_hooks';
import { appCurrencyVar, cartItemsVar, isCartVisibleVar } from '../apollo/reactive_variables';

const {
    toggleCartVisibilityState,
    updateCartItems,
    updateCartItemsProductInfo,
    updateCartCurrency,
    decrementQuantityOfCartItem,
    incrementQuantityOfCartItem,
    deleteCartItem,
} = useCart();
describe('test useCart', () => {
    const products = [
        {
            id: 3,
            title: 'Premium-Grade Moisturizing Balm',
            image_url: 'https://d1b929y2mmls08.cloudfront.net/luminskin/img/new-landing-page/moisturizing-balm.png',
            price: 29,
            __typename: 'Product',
        },
        {
            id: 2,
            title: 'No-Nonsense Charcoal Cleanser',
            image_url: 'https://d1b929y2mmls08.cloudfront.net/luminskin/img/new-landing-page/charcoal-cleanser.png',
            price: 16,
            __typename: 'Product',
        },
    ];

    const new_products = [
        {
            id: 3,
            title: 'Premium-Grade Moisturizing Balm',
            image_url: 'https://d1b929y2mmls08.cloudfront.net/luminskin/img/new-landing-page/moisturizing-balm.png',
            price: 2300,
            __typename: 'Product',
        },
        {
            id: 2,
            title: 'No-Nonsense Charcoal Cleanser',
            image_url: 'https://d1b929y2mmls08.cloudfront.net/luminskin/img/new-landing-page/charcoal-cleanser.png',
            price: 12000,
            __typename: 'Product',
        },
    ];
    const cartItem = {
        title: 'Premium-Grade Moisturizing Balm',
        image_url: 'https://d1b929y2mmls08.cloudfront.net/luminskin/img/new-landing-page/moisturizing-balm.png',
        price: 29,
        quantity: 1,
        productId: 3,
    };

    beforeEach(() => {
        cartItemsVar([]);
        isCartVisibleVar(false);
        appCurrencyVar('USD');
    });
    test('it should toggle cart visibilty state with or without a paramter', () => {
        expect(isCartVisibleVar()).toBeFalsy();

        toggleCartVisibilityState();

        expect(isCartVisibleVar()).toBeTruthy();

        toggleCartVisibilityState(true);

        expect(isCartVisibleVar()).toBeTruthy();

        toggleCartVisibilityState(false);

        expect(isCartVisibleVar()).toBeFalsy();
    });
    test('it should update cart currency', () => {
        expect(appCurrencyVar()).toEqual('USD');

        updateCartCurrency('CAD');

        expect(appCurrencyVar()).not.toEqual('USD');

        expect(appCurrencyVar()).toEqual('CAD');
    });
    test('it should add cart items', () => {
        updateCartItems(cartItem);
        expect(cartItemsVar()).toHaveLength(1);

        expect(cartItemsVar()[0].id).toEqual(1);

        expect(cartItemsVar()[0].quantity).toEqual(1);
    });

    test('it should update cart items quantity for items of same product Id', () => {
        updateCartItems(cartItem);

        expect(cartItemsVar()).toHaveLength(1);
        expect(cartItemsVar()[0].quantity).toEqual(1);

        updateCartItems(cartItem);

        expect(cartItemsVar()).toHaveLength(1);
        expect(cartItemsVar()).not.toHaveLength(2);

        expect(cartItemsVar()[0].quantity).toEqual(2);
    });

    test('it should update cart product info', () => {
        updateCartItems(cartItem);
        expect(cartItemsVar()).toHaveLength(1);
        expect(cartItemsVar()[0].price).toEqual(29);

        updateCartItemsProductInfo(new_products);

        expect(cartItemsVar()).toHaveLength(1);
        expect(cartItemsVar()[0].price).toEqual(2300);
    });

    test('it should increment quantity of a cart item', () => {
        updateCartItems(cartItem);

        expect(cartItemsVar()[0].quantity).toEqual(1);

        incrementQuantityOfCartItem(1);

        expect(cartItemsVar()[0].quantity).toEqual(2);
    });

    test('it should decrement quantity of a cart item', () => {
        cartItemsVar([{ ...cartItem, id: 1, quantity: 3 }]);

        expect(cartItemsVar()[0].quantity).toEqual(3);

        decrementQuantityOfCartItem(1);

        expect(cartItemsVar()[0].quantity).toEqual(2);
    });

    test('it should not decrement quantity of a cart item when its just 1', () => {
        updateCartItems(cartItem);

        expect(cartItemsVar()[0].quantity).toEqual(1);

        incrementQuantityOfCartItem(1);

        expect(cartItemsVar()[0].quantity).not.toEqual(0);
    });

    test('it should delete a cart item', () => {
        cartItemsVar([{ ...cartItem, id: 1, quantity: 3 }]);

        expect(cartItemsVar()).toHaveLength(1);

        deleteCartItem(1);

        expect(cartItemsVar()).toHaveLength(0);
    });
});
