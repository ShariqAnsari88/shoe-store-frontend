import { createSlice } from "@reduxjs/toolkit";
import store from '@/store/store'

export const wishlistSlice = createSlice({
    name: "wishList",
    initialState: {
        wishlistItems: [],
    },
    reducers: {
        addToWishlist: (state,action) => {
            // console.log(store.getState())
        },
    }
});

// Action creators are generated for each case reducer function
export const { addToWishlist } = wishlistSlice.actions;

// export default wishlistSlice.reducer;
