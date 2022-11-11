import { User } from "@/types"

export const uuid = ():number=>{
    let newerId = localStorage.getItem('newerId')
    let id = 0

    try {
        id = Number(newerId) + 1
    } catch (error) {
        id += 1
    }

    localStorage.setItem('newerId', String(id))

    return id
}


export const getCurrentUser = ():User => {
    const user = window.localStorage.getItem('user')
    return user && JSON.parse(user)
}

export const setCurrentUser = (user: User | null) => {
    if(user) {
        window.localStorage.setItem('user', JSON.stringify(user))
    } else {
        window.localStorage.setItem('user', "")
    }
}