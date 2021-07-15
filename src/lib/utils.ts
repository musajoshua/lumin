export const getProductPrice = (products: any, productId: number) => {
    const result = products.find((product: any) => product.id === productId);
    if (result) {
        return result.price;
    }
    return null;
};

export const calcTotalPrice = (cart: any) => {
    return cart.reduce((tally: any, cartItem: any) => {
        return tally + cartItem.quantity * cartItem.price;
    }, 0);
};

export const formatCurrency = (num: any, currency: string) => {
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
    });
    return formatter.format(num);
};
