/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from '@reduxjs/toolkit'

import { handlePayment } from '@/pages/api/checkout/payments'

import { revertAll } from './rootReducer'

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cartItems: Array<any[]>
}

const initialState:Props = { cartItems: [] }

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(handlePayment.fulfilled, () => {
        window.location.replace('/success')
      })
    // You can chain calls, or have separate `builder.addCase()` lines each time
      .addCase(handlePayment.rejected, () => {
        window.location.replace('/failed')
      })
      .addCase(revertAll, () => initialState)
  },
  reducers: {
    addToCart: (state, action) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const item:any = state.cartItems.find(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (p:any) =>
          p.id === action.payload.id &&
          p.selectedSize === action.payload.selectedSize
      )

      if (item && item.selectedSize === action.payload.selectedSize) {
        item.quantity++
        item.attributes.price = item.oneQuantityPrice * item.quantity
        // if(item.selectedSize )
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 })
      }
    },
    updateCart: (state, action) => {
      state.cartItems = state.cartItems.map((p:any) => {
        if (p.id === action.payload.id) {
          if (action.payload.key === 'quantity') {
            p.attributes.price = p.oneQuantityPrice * action.payload.val
          }
          return { ...p, [action.payload.key]: action.payload.val }
        }
        return p
      })
    },
    removeFromCart: (state, action) => {
      const selectedItem: any = state.cartItems.find(
        (p:any) =>
          p.id === action.payload.id &&
          p.selectedSize === action.payload.selectedSize
      )

      const index = state.cartItems.indexOf(selectedItem)

      if (index > -1) {
        state.cartItems.splice(index, 1)
      }
    },
    resetCart: (state) => {
      state.cartItems = []
    }
  }
})

// Action creators are generated for each case reducer function
export const { addToCart, updateCart, removeFromCart, resetCart } =
  cartSlice.actions
