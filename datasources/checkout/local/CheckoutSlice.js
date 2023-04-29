import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import toast from "@/utils/notification/toast";

const initialState = {
    cart: []
}

export function checkInCart(cart,id){
    return cart.some(item => (item.id === id))
}

export const checkoutSlice = createSlice({
    name: 'checkout',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const itemExists = checkInCart(state.cart,action.payload.id)
            if (itemExists) {
                itemExists.quantity++;
            } else {
                state.cart.push({ ...action.payload, quantity: 1 });
            }
        },
        addOrRemoveToCart:(state,action)=>{
            const has_product_in_cart = state.cart.some(item => (item.id === action.payload.id))
            if(has_product_in_cart){
                const index = state.cart.findIndex((item) => item.id === action.payload.id);
                state.cart.splice(index, 1);
                toast.info("محصول از سبد خرید شما حذف شد.")
            }else{
                state.cart.push({ ...action.payload, quantity: 1 });
                toast.success("با موفقیت به سبد خرید اضافه شد!")
            }
        },
        incrementQuantity: (state, action) => {
            const item = state.cart.find((item) => item.id === action.payload);
            item.quantity++;
        },
        decrementQuantity: (state, action) => {
            const item = state.cart.find((item) => item.id === action.payload);
            if (item.quantity === 1) {
                const index = state.cart.findIndex((item) => item.id === action.payload);
                state.cart.splice(index, 1);
            } else {
                item.quantity--;
            }
        },
        removeFromCart: (state, action) => {
            const index = state.cart.findIndex((item) => item.id === action.payload);
            state.cart.splice(index, 1);
        },
        emptyCart: (state) => {
            state.cart = []
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(HYDRATE, (state, action) => ({
                ...state, ...action.payload.cart,
            }))
    }
});
// shortcut stats
export const cartItems = (state) => state.checkout.cart;
// Action creators are generated for each case reducer function
export const {
    addToCart,
    addOrRemoveToCart,
    removeFromCart,
    incrementQuantity,
    decrementQuantity,
    emptyCart
} = checkoutSlice.actions;

export default checkoutSlice.reducer;
