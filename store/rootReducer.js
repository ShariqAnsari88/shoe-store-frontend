import { combineReducers, createAction } from '@reduxjs/toolkit'
import { cartSlice } from './cartSlice'
import { wishlistSlice } from './wishlistSlice'
import { userSlice } from './userSlice';
import { uiSlice } from './uiSlice';

export const revertAll = createAction('REVERT_ALL')

export const store = combineReducers({
    [cartSlice.name]: cartSlice.reducer,
    [wishlistSlice.name]: wishlistSlice.reducer,
    [userSlice.name]: userSlice.reducer,
    [uiSlice.name]: uiSlice.reducer
});