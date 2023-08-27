import { createSlice } from "@reduxjs/toolkit";

const name = "uiSlice";

export const uiSlice = createSlice({
  name,
  initialState: {
    showBanner: true,
  },
  reducers: {
    setShowBanner: (state, action) => {
        state.showBanner = action.payload
    },
  },
});

// Action creators are generated for each case reducer function
export const { setShowBanner } = uiSlice.actions;

export const selectShowBanner = (state) => state[name].showBanner
