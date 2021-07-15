export interface ICartItem {
    id: number;
    quantity: number;
    price: number;
    title: string;
    image_url: string;
    productId: number;
}

export type ICartItems = ICartItem[];

export interface ICart {
    cartCurrency: string;
    cartItems: ICartItems;
}
