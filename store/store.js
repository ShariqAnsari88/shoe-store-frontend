import { configureStore } from "@reduxjs/toolkit";

import { store } from "./rootReducer";
import thunk from 'redux-thunk'

export default configureStore({
  reducer: store,  
  middleware: getDefaultMiddleware =>
  getDefaultMiddleware(thunk)
});
