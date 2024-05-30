// import { createSlice } from '@reduxjs/toolkit';

// const cartSlice = createSlice({
//     name: 'cart',
//     initialState: {
//         items: []
//     },
//     reducers: {
//         addToCart: (state, action) => {
//             const product = action.payload;
//             const existingItem = state.items.find(item => item.id === product.id);
//             if (existingItem) {
//                 existingItem.quantity += 1;
//             } else {
//                 state.items.push({ ...product, quantity: 1 });
//             }
//         },
//         removeFromCart: (state, action) => {
//             const id = action.payload;
//             const existingItem = state.items.find(item => item.id === id);
//             if (existingItem.quantity > 1) {
//                 existingItem.quantity -= 1;
//             } else {
//                 state.items = state.items.filter(item => item.id !== id);
//             }
//         },
//         clearCart: (state) => {
//             state.items = [];
//         }
//     }
// });

// export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
// export default cartSlice.reducer;



import { createSlice } from '@reduxjs/toolkit';

const loadCart = () => {
    const cartProducts = localStorage.getItem('cart');
    if (cartProducts === null) {
        return [];
    }
    return JSON.parse(cartProducts);
};

const saveCart = (cart) => {
    const cartProducts = JSON.stringify(cart);
    localStorage.setItem('cart', cartProducts);
};

const initialState = {
    items: loadCart(),
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const itemIndex = state.items.findIndex(item => item.id === action.payload.id);
            if (itemIndex >= 0) {
                state.items[itemIndex].quantity += 1;
            } else {
                state.items.push({ ...action.payload, quantity: 1 });
            }
            saveCart(state.items);
        },
        removeFromCart: (state, action) => {
            const itemIndex = state.items.findIndex(item => item.id === action.payload);
            if (itemIndex >= 0) {
                state.items[itemIndex].quantity -= 1;
                if (state.items[itemIndex].quantity === 0) {
                    state.items.splice(itemIndex, 1);
                }
            }
            saveCart(state.items);
        },
       
    },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;