import { createSlice } from '@reduxjs/toolkit'

const name = 'uiSlice'

export const uiSlice = createSlice({
  name,
  initialState: {
    showBanner: true,
    showDialog: true
  },
  reducers: {
    setShowDialog: (state, action) => {
      state.showDialog = action.payload
    },
    setShowBanner: (state, action) => {
      state.showBanner = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { setShowBanner, setShowDialog } = uiSlice.actions

export const selectShowBanner = (state) => state[name].showBanner
export const selectShowDialog = (state) => state[name].showDialog
