
import { Badge, Button, Card, Container, Stack } from "react-bootstrap";
import { useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from "react";
import {
    actions,
  } from "@/store/features/posts"
import { AppDispatch, RootState } from "@/store";
import { Twitter } from "@/types";
import { uuid } from "@/utils";
import { userInfo } from "os";

function PostDetail() {
    const dispatch = useDispatch<AppDispatch>()
    const tw = useSelector((state: RootState) => state.posts.currendPost)
    const [isEdit,setIsEdit] = useState(false)

    const {id} = useParams();
    const [searchParams, setSearchParams] = useSearchParams();

    const [content, setContent] = useState(tw.content || '')
    const handleTextInput = (e:any) => {
        setContent(e.target.value)
    }


    const handleSave = async ()=>{
        const t:Twitter = {
            ...tw,
            content,
            updatedTimestamp: (new Date).getTime()
        }
        await dispatch(actions.postEdit(t))
        setSearchParams({
            mode:""
        })
    }

    useEffect(()=>{
        if(id) {
            dispatch(actions.getPostDetailById(parseInt(id)))
        }
        if( searchParams.get('mode') === 'edit') {
            setIsEdit(true)
        } else {
            setIsEdit(false)
        }
    },[searchParams])

    return (
        <Container className="pt-3">
            <Card className="p-1 mb-2">
                <Card.Title>
                    <Badge>#{tw.id}</Badge>
                    {tw.author}
                </Card.Title>
                <Card.Subtitle className="text-muted"> {new Date(tw.timestamp).toUTCString()}</Card.Subtitle>
                <hr />
                {
                    isEdit ? 
                    <Stack direction='vertical' className="m-2" style={{flex:'none'}}>
                        <textarea value={content} className="mt-2 bg-white" onChange={handleTextInput} />
                        <hr />
                        <Button disabled={!content} variant="primary" onClick={handleSave}>Send</Button>
                    </Stack> :

                    <Card.Text>
                        {tw.content}
                    </Card.Text>
                }
                
            </Card>
        </Container>
    )

}

export default PostDetail