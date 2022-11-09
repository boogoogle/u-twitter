import { configureStore } from '@reduxjs/toolkit'
import {userSlice} from './features/users'
import {postsSlice} from './features/posts'

export const store = configureStore({
  reducer: {
    userInfo: userSlice.reducer,
    posts: postsSlice.reducer
  }
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


