import { configureStore } from '@reduxjs/toolkit'
import identityReducer from './slices/identitySlice'
import tabReducer from './slices/tabSlice'
import sidebarReducer from './slices/sidebarSlice'
import { persistReducer, persistStore } from 'redux-persist'
import { combineReducers } from 'redux'
import storage from './useWebStorage'

const persistConfig = {
  key: 'root',
  storage,
}

const allReducers = combineReducers({
  identity: identityReducer,
  tab: tabReducer,
  sidebar: sidebarReducer,
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
