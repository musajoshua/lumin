import { InMemoryCache } from '@apollo/client';
import { appCurrencyVar, cartItemsVar, isCartVisibleVar } from './reactive_variables';

export const cache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                cart: {
                    read() {
                        return {
                            cartItems: cartItemsVar(),
                            cartCurrency: appCurrencyVar(),
                        };
                    },
                },
                isCartVisible: {
                    read() {
                        return isCartVisibleVar();
                    },
                },
            },
        },
    },
});
