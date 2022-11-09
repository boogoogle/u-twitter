import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import type {RootState} from "./"
import {doLogin, doRegister} from 'mocks'
import { User } from '@/types';


interface UserState {
    username: string;
    password?: any;
    isLogin?: boolean;
}

const initialState: UserState = {
    username: '',
    isLogin: false
}

export const userSlice = createSlice ({
    name: 'User',
    initialState,
    reducers: {
        updateUserInfo: (state, action: PayloadAction<UserState>) => {
            Object.assign(state, action.payload)
        } // action's name: User/updateUserInfo
    }
})


export const actions = {
    ...userSlice.actions,
    userLogin: createAsyncThunk('/user/doLogin', async (user:User) => {
        const res = await doLogin(user)
        console.log(res, "res1111")
        return res.data
    }),
    userRegister: createAsyncThunk('/user/doRegister', async (user:User) => {
        const res = await doRegister(user)
        console.log(res, "res22222")
        return res.data
    })
}




export const selectUserInfo = (state: RootState) => state.userInfo


