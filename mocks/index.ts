import { rejects } from 'assert'
import { Twitter, User } from '../src/types'

type UsersMap = {
  [key: string]: User
}

type TwittersMap = {
  [key: string]: Twitter
}

type ResponseData<T> = T | undefined | null;

class MockResponse<ResponseData> {
  code: number;
  msg: string;
  data: ResponseData

  constructor(code: number,msg: string, data: ResponseData) {
    this.code = code
    this.msg = msg
    this.data = data
  }

  factory(){
    return Promise.resolve(this)
  }
}


export function getUsersFromLocalStorage(){
  const usersMap = window.localStorage.getItem('usersMap')
  let data:UsersMap = {}

  if(usersMap) {
    data = JSON.parse(usersMap)
  }
  return data;
}

export function getTwittersFromLocalStorage():TwittersMap{
  const twitterssMap = window.localStorage.getItem('twittersMap')
  let data:TwittersMap = {}

  if(twitterssMap) {
    data = JSON.parse(twitterssMap)
  }
  return data;
}


export function doLogin(user: User): MockResponse<ResponseData<User>>{
  const usersMapOld = getUsersFromLocalStorage()
  if(user && user.username) {
    if(usersMapOld[user.username]) {
      const _u = usersMapOld[user.username]
      if(_u.password === user.password) {
        return new MockResponse(200, `${user.username} login success`, user )
      } else {
        return new MockResponse(400, `invalid password for ${user.username} !!`, user )
      }
    } 
    return new MockResponse(400, `${user.username} has not registed`, user )

  }
  return new MockResponse(400, `login error, try later`, user )
}

export function doRegister(user: User): MockResponse<ResponseData<User>>{
  const usersMapOld = getUsersFromLocalStorage()
  if(user && user.username) {
    if(usersMapOld[user.username]) {
      return new MockResponse(400, `user: ${user.username} has already registed`, null )
    } else {
      usersMapOld[user.username] = user
      window.localStorage.setItem("usersMap", JSON.stringify(usersMapOld))
      return new  MockResponse(200, `success`,user )
    }
  }
  return new MockResponse(400, `register error, try later`, user )
}


export function getAllPostedTwitters(): MockResponse<ResponseData<TwittersMap>>{
  try {
    let twittersExist = getTwittersFromLocalStorage()
    return new  MockResponse(200, `success`, twittersExist )
  } catch (error) {
    return new  MockResponse(400, `fetch all twitters failed: ${error}`, {} )
  }
}



export function doPostAdd(post: Twitter):  MockResponse<ResponseData<Twitter>>{
  try {
    let twittersExist = getTwittersFromLocalStorage()
    twittersExist[post.id] = post
    window.localStorage.setItem("twittersMap", JSON.stringify(twittersExist))
    return new  MockResponse(200, `success`, null )
  } catch (error) {
    return new  MockResponse(400, `post failed: ${error}`, post )
  }
}



export function getPostDetail(id: number):  MockResponse<ResponseData<Twitter>>{
  try {
    let twittersExist = getTwittersFromLocalStorage()

    if(twittersExist && twittersExist[id]) {
      return new  MockResponse(200, `success`, twittersExist[id] as Twitter )
    }
    return new  MockResponse(400, `post[${id}] get failed`, null )

  } catch (error) {
    return new  MockResponse(400, `post failed: ${error}`, null )
  }
}

export const doGetPostDetail = async (id:number): Promise<ResponseData<any>>=> {
  return new Promise((resolve, reject) => {
    try {
      const res = getPostDetail(id)
      resolve(res)
    } catch (error) {
      reject(error)
    }
  })
}

export const doGetAllPostedTwitters = async (): Promise<ResponseData<any>>=> {
  return new Promise((resolve, reject) => {
    try {
      const res = getAllPostedTwitters()
      resolve(res)
    } catch (error) {
      reject(error)
    }
  })
}