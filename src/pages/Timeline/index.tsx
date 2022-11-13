import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { uuid } from '@/utils'

import {
  actions,
} from "@/store/features/posts"
import { Twitter, Pagination } from '@/types';
import { AppDispatch, RootState } from '@/store';
import { useEffect } from 'react';
import { Button , Container, Stack, Form} from 'react-bootstrap';
import TwitterList from './TwitterList';
import { useCallback } from 'react';
import { useRef } from 'react';

function Timeline() {
    const dispatch = useDispatch<AppDispatch>()
    const userInfo = useSelector((state:RootState) =>  state.userInfo)
    const posts = useSelector((state:RootState) =>  state.posts.posts)
    const isLoading = useSelector((state:RootState) =>  state.posts.isLoading)
    const hasMore = useSelector((state:RootState) =>  state.posts.pagination.hasMore)
    const currentPage = useSelector((state:RootState) =>  state.posts.pagination.currentPage)

    const [content, setContent] = useState('')

    const handleTextInput = (e:any) => {
        setContent(e.target.value)
    }
    const handleSend = ()=>{
        const t:Twitter = {
            id: uuid(),
            author: userInfo.username,
            content,
            timestamp: (new Date).getTime()
        }
        dispatch(actions.postAdd(t))
    }
    const flag = useRef(false)

    const loadList = useCallback(()=>{
        dispatch(actions.postsFetch())
        console.log("....loadList")
    }, [dispatch])

    useEffect(()=>{
        if(!flag.current){
    console.log(22222)

            loadList()
        }
    },[])

    console.log(11111)
    
    return(
        <Container className='d-flex flex-column' style={{height: '100%'}}>
            <Stack direction='vertical' className="m-2" style={{flex:'none'}}>
                <textarea className="mt-2 bg-white" onChange={handleTextInput} />
                <hr />
                <Button disabled={!content} variant="primary" onClick={handleSend}>Send</Button>
            </Stack>
            <TwitterList loadFunc={loadList} posts={posts} hasMore={hasMore}></TwitterList>
        </Container>
    )
}

export default Timeline

