
import { Badge, Card, Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from "react";
import {
    actions,
  } from "@/store/features/posts"
import { AppDispatch, RootState } from "@/store";
import {TwitterItem} from "@/pages/Timeline/TwitterList"
function PostDetail() {
    const dispatch = useDispatch<AppDispatch>()
    const tw = useSelector((state: RootState) => state.posts.currendPost)

    const {id} = useParams();

    useEffect(()=>{
        if(id) {
            dispatch(actions.getPostDetailById(parseInt(id)))
        }
    },[])

    return (
        <Container className="pt-3">
            <Card className="p-1 mb-2">
                <Card.Title>
                    <Badge>#{tw.id}</Badge>
                    {tw.author}
                </Card.Title>
                <Card.Subtitle className="text-muted"> {new Date(tw.timestamp).toUTCString()}</Card.Subtitle>
                <hr />
                <Card.Text>
                    {tw.content}
                </Card.Text>
            </Card>
        </Container>
    )

}

export default PostDetail