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