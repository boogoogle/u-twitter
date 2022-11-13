import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import type {RootState} from ".."
import {doPostAdd, doGetAllPostedTwitters, doGetPostDetail} from 'mocks'
import { Pagination, Twitter } from '@/types';


interface PostsState {
    posts: Array<Twitter>
    currendPost: Twitter,
    allPostCount: number,
    pagination: Pagination
    isLoading: boolean
}



const getPostDetailById = createAsyncThunk('/post/detail', async (id:number, {}) => {
    const res = await doGetPostDetail(id)
    if(res.code === 200) {
        return res.data as Promise<any>
    } 
    return res as Promise<any>
})

const postsFetch = createAsyncThunk('/posts/fetch', async (_, {dispatch,getState})=> {
    const res = await doGetAllPostedTwitters()

    if(res.code===200) {
        return res.data
    }
})

const initialState: PostsState = {
    posts: [],
    currendPost: {} as Twitter,
    allPostCount: 0,
    isLoading: false,
    pagination: {
        allItemsCount: 0,
        currentPage: 0,
        size: 5,
        hasMore: true,
    }
}

export const postsSlice = createSlice ({
    name: 'Posts',
    initialState,
    reducers: {
        resetPagination(state){
            state.pagination.currentPage = 0
            state.pagination.hasMore = true
        },
    },
    extraReducers: builder => { 
        // Note !!!! you must use builder here, or it will cause TS error, [ref](https://redux-toolkit.js.org/usage/usage-with-typescript#type-safety-with-extrareducers)
        builder.addCase(getPostDetailById.fulfilled, (state, action) => {
            state.currendPost = action.payload
        })

        builder.addCase(postsFetch.pending, (state, action: any ) => {
            state.isLoading = true
        })

        builder.addCase(postsFetch.fulfilled, (state, action: any ) => {
            let all_twitters: Array<Twitter> = []
            const currentIndex = Number(state.pagination.currentPage) * Number(state.pagination.size)
            const nextIndex = (Number(state.pagination.currentPage) + 1 ) *  Number(state.pagination.size)

            Object.values(action.payload as object).forEach(i=>{
                all_twitters.unshift(i)
            })

            if( nextIndex >= all_twitters.length) {
                state.pagination.hasMore = false
            }

            console.log("page range", currentIndex, nextIndex,state.pagination.hasMore)

            state.posts = all_twitters.slice(0, nextIndex)
            console.log(state.posts, "posts")
            state.allPostCount = all_twitters.length
            state.pagination.currentPage += 1
            state.isLoading = false
        })
    }
})

export const actions = {
    ...postsSlice.actions,
    postAdd: createAsyncThunk('/posts/add', async (post:Twitter, {dispatch}) => {
        const res = await doPostAdd(post)
        if(res.code === 200) {
            dispatch(actions.resetPagination())
            dispatch(actions.postsFetch())
        }
    }),
    getPostDetailById,
    postsFetch
}

