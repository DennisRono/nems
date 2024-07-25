import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface SizeState {
  size: 'min' | 'full'
}

const initialState: SizeState = {
  size: 'full',
}

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    setSidebar: (state, action: PayloadAction<SizeState>) => {
      return { ...state, ...action.payload }
    },
  },
})

export const { setSidebar } = sidebarSlice.actions
export default sidebarSlice.reducer
