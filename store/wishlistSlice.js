import { createSlice } from "@reduxjs/toolkit";

const name = "wishList";

export const wishlistSlice = createSlice({
  name,
  initialState: {
    wishlistItems: [],
  },
  reducers: {
    addToWishlist: (state, action) => {
      const item = state.wishlistItems.find((p) => p.id === action.payload.id);

      if (item) {
        const indexOfItem = state.wishlistItems.indexOf(item);

        //Remove from wishlist
        state.wishlistItems.splice(indexOfItem, 1);
      } else {
        state.wishlistItems.push({ ...action.payload });
      }
    },
    removeFromWishlist: (state, action) => {
      state.wishlistItems = state.wishlistItems.filter(
        (p) => p.id !== action.payload.id
      );
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;

export const selectIsWishlisted = (state, payload) =>
  state[name].wishlistItems.find((item) => item.id === payload.id);
export const selectWishlistItems = (state) => state[name].wishlistItems;
// export default wishlistSlice.reducer;
