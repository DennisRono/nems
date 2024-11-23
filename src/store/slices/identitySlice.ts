import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface LoggedState {
  islogged: boolean
  user: User
}

const initialState: LoggedState = {
  islogged: false,
  user: {
    username: '',
  },
}

const identitySlice = createSlice({
  name: 'identity',
  initialState,
  reducers: {
    setIdentity: (
      state,
      action: PayloadAction<{
        islogged: boolean
        user: User
      }>
    ) => {
      return { ...state, ...action.payload }
    },
  },
})

export const { setIdentity } = identitySlice.actions
export default identitySlice.reducer
