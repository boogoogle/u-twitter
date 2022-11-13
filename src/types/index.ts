export type User = {
    username: string;
    password: string;
}


export type Twitter = {
    id: number;
    content: string;
    author: string;
    timestamp: number;
    updatedTimestamp: number
}
  


export type Pagination = {
    allItemsCount: number,
    currentPage: number,
    size: number,
    hasMore: boolean
}
  