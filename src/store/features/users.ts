import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import type {RootState} from ".."
import {doLogin, doRegister} from 'mocks'
import { User } from '@/types';
import {getCurrentUser} from "@/utils"


interface UserState {
    username: string;
    password?: any;
    isLogin?: boolean;
    notRegister?: boolean;
    msg?: string;
}


const userLogin = createAsyncThunk('/user/doLogin', async (user:User, {dispatch}) => {
    const res = await doLogin(user)
    console.log(res, "res1111")
    if(res.code === 200) {
        return {
            ...res.data,
            isLogin: true
        }
    } else {
        return {
            ...res.data,
            msg: res.msg,
            notRegister: true
        } as UserState
    }
})


const userRegister = createAsyncThunk('/user/doRegister', async (user:User, {dispatch, getState}) => {
    const res = await doRegister(user)
    if(res.code === 200) {
        return {
            ...res.data,
            isLogin: true
        }
    } else {
        return {
            ...res.data,
            isLogin: false,
            msg: res.msg
        } as UserState
    }
})

const initialState: UserState = {
    username: '',
    isLogin: false,
    msg: ''
}

export const userSlice = createSlice ({
    name: 'User',
    initialState,
    reducers: {
        resetUserState: (state, action)=>{
            Object.assign(state, action.payload)
        },
        fetchUserInfo: (state) => {
            const userInLocal = getCurrentUser()
            if(userInLocal && userInLocal.username) {
                state.username = userInLocal.username
                state.isLogin = true
            }
        }
    },
    extraReducers: builder => {
        builder.addCase(userLogin.fulfilled, (state, action) => {
            Object.assign(state, action.payload)
        })
        builder.addCase(userRegister.fulfilled, (state, action) => {
            Object.assign(state, {
                ...action.payload,
            })
        })
    }
})

export const actions = {
    ...userSlice.actions,
    userLogin,
    userRegister
}


