import { makeVar, ReactiveVar } from '@apollo/client';
import { ICartItems } from '../models/cart';

export const cartItemsVar: ReactiveVar<ICartItems> = makeVar<ICartItems>([]);
export const isCartVisibleVar = makeVar(false);
export const appCurrencyVar = makeVar('USD');
