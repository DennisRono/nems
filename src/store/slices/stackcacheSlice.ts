import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface CacheState {
  cache: string
}

const initialState: CacheState = {
  cache: '',
}

const cacheSlice = createSlice({
  name: 'cache',
  initialState,
  reducers: {
    setCache: (state, action: PayloadAction<CacheState>) => {
      return { ...state, ...action.payload }
    },
  },
})

export const { setCache } = cacheSlice.actions
export default cacheSlice.reducer
