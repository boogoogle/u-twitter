import { Button, Navbar, Nav, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { useNavigate, redirect } from "react-router-dom";
import {
  actions,
} from "@/store/features/users"
import { setCurrentUser } from '@/utils';
import { useEffect } from 'react';


function UNavbar() {
  const user = useSelector((state:RootState) =>  state.userInfo)
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>()

  function logout (){
    dispatch(actions.resetUserState({
      username: "",
      isLogin: false
    }))
    setCurrentUser(null)
    navigate("/u/sign")
  }

  useEffect(()=>{
    if(!(user && user.username)) {
      navigate('/u/sign')
    } else {
      navigate(`/${user.username}`)
    }
  },[user.isLogin])

  return (
    <Navbar bg="light" expand="lg" style={{flex: 'none'}}>
      <Container>
        <Navbar.Brand href="/">{user.username}</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/u/sign">relogin</Nav.Link>
            <Button onClick={logout}>Logout</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default UNavbar;