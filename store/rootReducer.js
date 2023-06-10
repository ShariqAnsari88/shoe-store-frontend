import { combineReducers } from '@reduxjs/toolkit'
import { cartSlice } from './cartSlice'
import { wishlistSlice } from './wishlistSlice'

export const store = combineReducers({
    [cartSlice.name]: cartSlice.reducer,
    [wishlistSlice.name]: wishlistSlice.reducer,
});