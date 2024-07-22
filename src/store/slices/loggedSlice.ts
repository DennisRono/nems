import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface LoggedState {
  islogged: boolean
  user: User
}

const initialState: LoggedState = {
  islogged: false,
  user: {},
}

const loggedSlice = createSlice({
  name: 'logged',
  initialState,
  reducers: {
    setIsLogged: (
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

export const { setIsLogged } = loggedSlice.actions
export default loggedSlice.reducer
