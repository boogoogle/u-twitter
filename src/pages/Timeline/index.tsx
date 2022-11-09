import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { uuid } from '@/utils'

import {
  actions,
} from "@/store/features/posts"
import { Twitter, User } from '@/types';
import { AppDispatch, RootState } from '@/store';
import { useEffect } from 'react';
import { Button , Container, Stack, Form} from 'react-bootstrap';
import TwitterList from './TwitterList';


function Timeline() {
    const dispatch = useDispatch<AppDispatch>()
    const userInfo = useSelector((state:RootState) =>  state.userInfo)
    const posts = useSelector((state:RootState) =>  state.posts.posts)

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

    useEffect(()=>{
        dispatch(actions.postsFetchAll())
    }, [])
    return(
        <Container>
            <Stack gap={2}>
                <Stack direction='vertical' className="m-2">
                    <textarea className="mt-2 bg-white" onChange={handleTextInput} />
                    <hr />
                    <Button disabled={!content} variant="primary" onClick={handleSend}>Send</Button>
                </Stack>
                <TwitterList posts={posts}></TwitterList>
            </Stack>
        </Container>
    )
}

export default Timeline

function fakeUUID(): number {
    throw new Error('Function not implemented.');
}
