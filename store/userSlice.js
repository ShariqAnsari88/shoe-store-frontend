import { createSlice } from "@reduxjs/toolkit";

const name = "user";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: null,
    address: null,
    officeAddress: null,
    billingAddress: null,
    credentials: null,
  },
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    deleteUserInfo: (state) => {
      state.userInfo = null;
    },
    updateUserInfo: (state, action) => {
      const user = state.userInfo;
      const { key, value } = action.payload;

      if (user) {
        state.userInfo[key] = value;
      }
    },
    updateAddress: (state, action) => {
      state.address = action.payload;
    },
    updateCredentials: (state, action) => {
      state.credentials = action.payload;
    },
    updateOfficeAddress: (state, action) => {
      state.officeAddress = action.payload;
    },
    updateBillingAddress: (state, action) => {
      state.billingAddress = action.payload;
    },
  },
  extraReducers: {},
});

// Action creators are generated for each case reducer function
export const {
  setUserInfo,
  deleteUserInfo,
  updateUserInfo,
  updateAddress,
  updateCredentials,
  updateOfficeAddress,
  updateBillingAddress
} = userSlice.actions;

export const selectUserAddress = (state) => state[name].address;
export const selectUserCredentials = (state) => state[name].credentials;
export const selectOfficeAddress = (state) => state[name].officeAddress;
export const selectBillingAddress = (state) => state[name].billingAddress;

// export default cartSlice.reducer;
