import { Twitter } from "@/types"
import { ListGroup, Row,Col, Card, Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import InfiniteScroll from 'react-infinite-scroller';
import Modal from 'react-bootstrap/Modal';
import { useState } from "react";
import {
    actions,
  } from "@/store/features/posts"

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
    const dispatch = useDispatch<AppDispatch>()
    const userInfo = useSelector((state:RootState) =>  state.userInfo)
    const [showModal, setShowModal] = useState(false) 

    function toTwitterDetail(){
        navigate(`/tweet/${tw.id}`)
    }

    function edit(e:any){
        e && e.stopPropagation()
        navigate(`/tweet/${tw.id}?mode=edit`)
    }

    function confirmDel(){
        dispatch(actions.postDelete(tw.id))
    }

    function handleDel(e:any){
        e && e.stopPropagation()
        setShowModal(true)
    }

    return (
                <Col md={6}>
                    <Card onClick={toTwitterDetail} className="mb-2">
                        <Card.Body>
                            <Card.Title>{tw.author}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">{tw.timestamp}</Card.Subtitle>
                            {
                                tw.author === userInfo.username && 
                                <>
                                    <Card.Link onClick={edit}>Edit</Card.Link>
                                    <Card.Link onClick={e => handleDel(e)}>Delete</Card.Link>
                                </>
                            }
                        </Card.Body>
                    </Card>
                    {
                        <Modal show={showModal}>
                            <Modal.Header>
                                <Modal.Title>Attention!!!</Modal.Title>
                            </Modal.Header>

                            <Modal.Body>
                                <p>You will delete this twitter</p>
                            </Modal.Body>

                            <Modal.Footer>
                                <Button variant="secondary" onClick={()=>setShowModal(false)}>Close</Button>
                                <Button variant="primary" onClick={confirmDel}>Confirm</Button>
                            </Modal.Footer>
                        </Modal>
                    }
                   
                </Col>
            
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
                <Row>
                    {
                        posts.map(tw=><TwitterItem key={tw.id} tw={tw}/>)
                    }
                </Row>
            </InfiniteScroll>
        </ListGroup>
    )
}

export default TwitterList