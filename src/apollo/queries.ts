import { gql } from '@apollo/client';

export const GET_CURRENCIES = gql`
    query GetCurrencies {
        currency
    }
`;
export const GET_CART_ITEMS = gql`
    query GetCartItems {
        cartItems @client
    }
`;

export const GET_CART = gql`
    query GetCart {
        cart @client {
            cartCurrency
            cartItems
        }
    }
`;

export const GET_CART_CURRENCY = gql`
    query GetCartCurrency {
        cart @client {
            cartCurrency
        }
    }
`;

export const GET_CART_VISIBILITY_STATE = gql`
    query GetCartVisibilityState {
        isCartVisible @client
    }
`;

export const GET_PRODUCTS = gql`
    query GetProducts($currency: Currency!) {
        products {
            id
            title
            image_url
            price(currency: $currency)
        }
    }
`;
