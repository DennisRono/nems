import { configureStore } from '@reduxjs/toolkit'
import loggedReducer from './slices/loggedSlice'
import currencyReducer from './slices/metaSlice'
import cartReducer from './slices/cartSlice'
import adminTabReducer from './slices/admintabSlice'
import { persistReducer, persistStore } from 'redux-persist'
import { combineReducers } from 'redux'
import storage from './useWebStorage'

const persistConfig = {
  key: 'root',
  storage,
}

const allReducers = combineReducers({
  logged: loggedReducer,
  meta: currencyReducer,
  cart: cartReducer,
  admintab: adminTabReducer,
})

const persistedReducer = persistReducer(persistConfig, allReducers)

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
