import { combineReducers, createAction } from '@reduxjs/toolkit'

import { cartSlice } from './cartSlice'
import { uiSlice } from './uiSlice'
import { userSlice } from './userSlice'
import { wishlistSlice } from './wishlistSlice'

export const revertAll = createAction('REVERT_ALL')

export const store = combineReducers({
  [cartSlice.name]: cartSlice.reducer,
  [wishlistSlice.name]: wishlistSlice.reducer,
  [userSlice.name]: userSlice.reducer,
  [uiSlice.name]: uiSlice.reducer
})
