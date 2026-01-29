import { createSlice, createAsyncThunk, createSelector, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from "../../../store/store";
import { BASE_URL } from '@store/config';

interface CartItems {
    _id: string;
    name: string;
    price: number;
    quantity: number;
    totalPrice: number;
    // Add other fields as needed (e.g. image)
}
interface CartState {
    items: CartItems[];
    total: number;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: CartState = {
    items: [],
    total: 0,
    status: 'idle',
    error: null,
};

// Async thunks for backend integration
export const fetchCart = createAsyncThunk(
    'cart/fetchCart',
    async (userId: string) => {
        const res = await axios.get(`${BASE_URL}/cart/${userId}`);
        return res.data; // Should be { items: [...], total: ... }
    }
);

export const addToCart = createAsyncThunk(
    'cart/addToCart',
    async (payload: { userId: string, productId: string, quantity: number, comboOption?: number }) => {
        const res = await axios.post(`${BASE_URL}/cart/add`, payload);
        return res.data;
    }
);
export const updateCartItem = createAsyncThunk(
    'cart/updateCartItem',
    async (payload: { userId: string, itemId: string, quantity: number, comboOption?: number }) => {
        const res = await axios.put('/cart/update', payload);
        return res.data;
    }
);

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        clearCart: (state) => {
            state.items = [];
            state.total = 0;
        },
        // Optionally, keep local add/remove for optimistic UI
        addItemLocal: (state, action: PayloadAction<CartItems>) => {
            const existing = state.items.find(i => i.productId === action.payload.productId);
            if (existing) {
                existing.quantity += action.payload.quantity;
                existing.totalPrice = existing.price * existing.quantity;
            } else {
                state.items.push(action.payload);
            }
            state.total = state.items.reduce((sum, i) => sum + i.totalPrice, 0);
        },
        updateItemLocal: (state, action: PayloadAction<{ itemId: string, quantity: number }>) => {
            const idx = state.items.findIndex(i => i._id === action.payload.itemId);
            if (idx > -1) {
                if (action.payload.quantity <= 0) {
                    state.items.splice(idx, 1); // Remove item
                } else {
                    state.items[idx].quantity = action.payload.quantity;
                    state.items[idx].totalPrice = state.items[idx].price * action.payload.quantity;
                }
            }
            state.total = state.items.reduce((sum, i) => sum + i.totalPrice, 0);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCart.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload.items;
                state.total = action.payload.total;
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || null;
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.items = action.payload.items;
                state.total = action.payload.total;
            })
            .addCase(updateCartItem.fulfilled, (state, action) => {
                state.items = action.payload.items;
                state.total = action.payload.total;
            });
    }
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;

// Selectors
export const selectCartItems = (state: RootState) => state.cart.items;
export const selectCartTotal = (state: RootState) => state.cart.total;
export const selectCartStatus = (state: RootState) => state.cart.status;

export const selectItemCountById = (id: string) => createSelector(
    selectCartItems,
    (items) => {
        // Use productId to match the product, not _id (which is cart item id)
        const item = items.find((item: any) => item.productId === id);
        return item ? item.quantity : 0;
    }
);
export const selectTotalItemsInCart = createSelector(
    selectCartItems,
    (items) => items.reduce((total: number, item) => total + item.quantity, 0)
);

export const selectTotalPriceInCart = createSelector(
    selectCartItems,
    (items) => items.reduce((total: number, item) => total + item.totalPrice, 0)
);