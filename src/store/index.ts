import { configureStore } from '@reduxjs/toolkit'
import {userSlice} from './slices'

export const store = configureStore({
  reducer: {
    userInfo: userSlice.reducer
  }
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


