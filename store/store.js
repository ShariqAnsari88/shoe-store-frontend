import { configureStore } from "@reduxjs/toolkit";

import { store } from "./rootReducer";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
  version: 1,
  stateReconciler: autoMergeLevel2,
};

const persistedReducer = persistReducer(persistConfig, store);

export const rootReducer = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
      thunk,
    }),
});

export const persistor = persistStore(rootReducer);
