import { addToCart, updateCartItem, fetchCart } from '../../modules/cart/api/slice';
import { store } from '@store/store';

export const syncCartToBackend = async (userId: string, localCart: CartItems[]) => {
    for (const item of localCart) {
        // If item exists on backend, update; else, add
        // You may want to fetch backend cart first and compare
        await store.dispatch(addToCart({
            userId,
            productId: item.productId,
            quantity: item.quantity,
            comboOption: item.comboOption
        }));
    }
    // After syncing, fetch the latest cart from backend
    await store.dispatch(fetchCart(userId));
};