import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import type {RootState} from ".."
import {doPostAdd, doGetAllPostedTwitters, doGetPostDetail} from 'mocks'
import { Twitter } from '@/types';


interface PostsState {
    posts: Array<Twitter>
    currendPost: Twitter 
}



const getPostDetailById = createAsyncThunk('/post/detail', async (id:number, {}) => {
    const res = await doGetPostDetail(id)
    if(res.code === 200) {
        return res.data as Promise<any>
    } 
    return res as Promise<any>
})

const initialState: PostsState = {
    posts: [],
    currendPost: {} as Twitter
}

export const postsSlice = createSlice ({
    name: 'Posts',
    initialState,
    reducers: {
        updatePosts: (state, action: PayloadAction<Array<Twitter>>) => {
            state.posts = (action.payload)
        },
    },
    extraReducers: builder => { 
        // Note !!!! you must use builder here, or it will cause TS error, [ref](https://redux-toolkit.js.org/usage/usage-with-typescript#type-safety-with-extrareducers)
        builder.addCase(getPostDetailById.fulfilled, (state, action) => {
            state.currendPost = action.payload
        })
        
    }
})

export const actions = {
    ...postsSlice.actions,
    postsFetchAll: createAsyncThunk('/posts/all', async (_, {dispatch})=> {
        const res = await doGetAllPostedTwitters()
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
    }),
    getPostDetailById,
    
}

