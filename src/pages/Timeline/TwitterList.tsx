import { Twitter } from "@/types"
import { ListGroup, Stack, Card } from "react-bootstrap"
import { useNavigate } from "react-router-dom";


interface ITwitterItem {
    tw: Twitter
}

interface ITwitterList{
    posts: Array<Twitter>
}

export function TwitterItem({tw}:ITwitterItem){
    const navigate = useNavigate();

    function toTwitterDetail(){
        navigate(`/tweet/${tw.id}`)
    }

    return (
        <ListGroup.Item>
            <Card onClick={toTwitterDetail}>
                <Card.Title>{tw.author}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{(new Date(tw.timestamp).toUTCString())}</Card.Subtitle>
                <Card.Text>
                    {tw.content}
                </Card.Text>
            </Card>
        </ListGroup.Item>
    )
}


function TwitterList({posts}: ITwitterList){
    return (
        <ListGroup>
            {
                posts.map(tw=><TwitterItem key={tw.id} tw={tw}/>)
            }
        </ListGroup>
    )
}


export default TwitterList