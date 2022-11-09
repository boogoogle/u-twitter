import { User } from '../src/types'

type UsersMap = {
  [key: string]: User
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
}


export function getUsersFromLocalStorage(){
  const usersMap = window.localStorage.getItem('usersMap')
  let data:UsersMap = {}

  if(usersMap) {
    data = JSON.parse(usersMap)
  }
  return data;
}


export function doLogin(user: User): MockResponse<ResponseData<User>>{
  const usersMapOld = getUsersFromLocalStorage()
  if(user && user.username) {
    if(usersMapOld[user.username]) {
      return new MockResponse(200, `${user.username} login success`, user )
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
