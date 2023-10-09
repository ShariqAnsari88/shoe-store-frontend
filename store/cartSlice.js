import { handlePayment } from "@/pages/api/checkout/payments";
import { createSlice } from "@reduxjs/toolkit";
import { revertAll } from "./rootReducer";

const initialState = { cartItems: [] };

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(handlePayment.fulfilled, (state, action) => {
        window.location.replace("/success");
      })
      // You can chain calls, or have separate `builder.addCase()` lines each time
      .addCase(handlePayment.rejected, (state, action) => {
        window.location.replace("/failed");
      })
      .addCase(revertAll, () => initialState);
  },
  reducers: {
    addToCart: (state, action) => {
      const item = state.cartItems.find(
        (p) =>
          p.id === action.payload.id &&
          p.selectedSize === action.payload.selectedSize
      );

      if (item && item.selectedSize === action.payload.selectedSize) {
        item.quantity++;
        item.attributes.price = item.oneQuantityPrice * item.quantity;
        // if(item.selectedSize )
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 });
      }
    },
    updateCart: (state, action) => {
      state.cartItems = state.cartItems.map((p) => {
        if (p.id === action.payload.id) {
          if (action.payload.key === "quantity") {
            p.attributes.price = p.oneQuantityPrice * action.payload.val;
          }
          return { ...p, [action.payload.key]: action.payload.val };
        }
        return p;
      });
    },
    removeFromCart: (state, action) => {
      const selectedItem = state.cartItems.find(
        (p) =>
          p.id === action.payload.id &&
          p.selectedSize === action.payload.selectedSize
      );

      const index = state.cartItems.indexOf(selectedItem);

      if (index > -1) {
        state.cartItems.splice(index, 1);
      }
    },
    resetCart: (state) => {
      state.cartItems = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToCart, updateCart, removeFromCart, resetCart } =
  cartSlice.actions;
