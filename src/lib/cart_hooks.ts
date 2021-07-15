import { appCurrencyVar, cartItemsVar, isCartVisibleVar } from '../apollo/reactive_variables';
import { IProduct } from '../models/product';

export function useCart() {
    const toggleCartVisibilityState = (visibility?: boolean) => {
        if (visibility) {
            isCartVisibleVar(visibility);
            return;
        }
        const current = isCartVisibleVar();
        isCartVisibleVar(!current);
    };

    const updateCartCurrency = (currency: string) => {
        appCurrencyVar(currency);
    };
    const updateCartItems = (item: {
        quantity: number;
        price: number;
        title: string;
        image_url: string;
        productId: number;
    }) => {
        const cartItems: any = cartItemsVar();
        const existingCartItem: any = cartItems.find((_item: any) => _item.productId === item.productId);
        if (existingCartItem) {
            const updatedCartItems = cartItems.map((cartItem: any) =>
                cartItem.productId === item.productId
                    ? {
                          ...cartItem,
                          quantity: cartItem.quantity + 1,
                      }
                    : cartItem,
            );
            cartItemsVar(updatedCartItems);
            return;
        }
        const topId = cartItems.length > 0 ? cartItems[cartItems.length - 1].id + 1 : 1;
        cartItemsVar(cartItems.concat({ ...item, id: topId }));
    };
    const updateCartItemsProductInfo = (products: IProduct[]) => {
        const cartItems: any = cartItemsVar();
        const updatedCartItems = cartItems.map((cartItem: any) => {
            const product = products.find((product: any) => product.id === cartItem.productId);
            if (product) {
                return {
                    ...cartItem,
                    price: product.price,
                };
            }
            return cartItem;
        });
        cartItemsVar(updatedCartItems);
    };
    const incrementQuantityOfCartItem = (id: number) => {
        const cartItems: any = cartItemsVar();
        const updatedCartItems = cartItems.map((cartItem: any) =>
            cartItem.id === id
                ? {
                      ...cartItem,
                      quantity: cartItem.quantity + 1,
                  }
                : cartItem,
        );
        cartItemsVar(updatedCartItems);
    };

    const decrementQuantityOfCartItem = (id: number) => {
        const cartItems: any = cartItemsVar();
        let filteredCartItem = cartItems.find((item: any) => item.id === id);

        if (filteredCartItem.quantity > 1) {
            const updatedCartItems = cartItems.map((cartItem: any) =>
                cartItem.id === id
                    ? {
                          ...cartItem,
                          quantity: cartItem.quantity - 1,
                      }
                    : cartItem,
            );
            cartItemsVar(updatedCartItems);
        } else {
            deleteCartItem(id);
        }
    };

    const deleteCartItem = (id: number) => {
        const cartItems = cartItemsVar();
        const filteredCartItems = cartItems.filter((item: any) => item.id !== id);
        cartItemsVar(filteredCartItems);
    };

    return {
        toggleCartVisibilityState,
        updateCartCurrency,
        updateCartItems,
        incrementQuantityOfCartItem,
        decrementQuantityOfCartItem,
        deleteCartItem,
        updateCartItemsProductInfo,
    };
}
