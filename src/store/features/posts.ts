import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import type {RootState} from ".."
import {doPostAdd, getAllPostedTwitters} from 'mocks'
import { Twitter } from '@/types';


interface PostsState {
    posts: Array<Twitter>
}

const initialState: PostsState = {
    posts: []
}

export const postsSlice = createSlice ({
    name: 'Posts',
    initialState,
    reducers: {
        updatePosts: (state, action: PayloadAction<Array<Twitter>>) => {
            state.posts = (action.payload)
        },
    }
})

export const actions = {
    ...postsSlice.actions,
    postsFetchAll: createAsyncThunk('/posts/all', async (_, {dispatch})=> {
        const res = await getAllPostedTwitters()
        if(res.code===200) {
            const twitters: Array<Twitter> = []
            Object.values(res.data as object).forEach(i=>{
                twitters.push(i)
            })
            dispatch(actions.updatePosts(twitters))
        }
    }),
    postAdd: createAsyncThunk('/posts/add', async (post:Twitter, {dispatch}) => {
        const res = await doPostAdd(post)
        if(res.code === 200) {
            dispatch(actions.postsFetchAll())
        }
    })
}

