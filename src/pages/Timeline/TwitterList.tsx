import { Twitter } from "@/types"
import { ListGroup, Stack, Card } from "react-bootstrap"
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import InfiniteScroll from 'react-infinite-scroller';


interface ITwitterItem {
    tw: Twitter
}

interface ITwitterList{
    posts: Array<Twitter>,
    loadFunc: () => void,
    hasMore: boolean,
}

export function TwitterItem({tw}:ITwitterItem){
    const navigate = useNavigate();
    const userInfo = useSelector((state:RootState) =>  state.userInfo)

    function toTwitterDetail(){
        navigate(`/tweet/${tw.id}`)
    }

    return (

            <Card onClick={toTwitterDetail} className="mb-2">
                <Card.Body>
                    <Card.Title>{tw.author}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{tw.timestamp}</Card.Subtitle>
                    {
                        tw.author === userInfo.username && 
                        <>
                            <Card.Link>Edit</Card.Link>
                        <Card.Link>Delete</Card.Link>
                        </>
                    }
                    
                </Card.Body>
            </Card>
    )
}


function TwitterList({posts, loadFunc, hasMore}: ITwitterList){
    return (
        <ListGroup style={{flex: '1', overflow: 'auto'}}>
            <InfiniteScroll
                pageStart={0}
                loadMore={loadFunc}
                initialLoad={false}
                hasMore={hasMore}
                loader={<div className="d-flex align-items-center justify-content-center" key={0}>Loading ...</div>}
                useWindow={false}
            >
                {
                    posts.map(tw=><TwitterItem key={tw.id} tw={tw}/>)
                }
            </InfiniteScroll>
        </ListGroup>
    )
}

export default TwitterList