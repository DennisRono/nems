import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface LoggedState {
  tab: string
}

const initialState: LoggedState = {
  tab: 'dashboard',
}

const admintabSlice = createSlice({
  name: 'tab',
  initialState,
  reducers: {
    setAdminTab: (state, action: PayloadAction<LoggedState>) => {
      return { ...state, ...action.payload }
    },
  },
})

export const { setAdminTab } = admintabSlice.actions
export default admintabSlice.reducer
