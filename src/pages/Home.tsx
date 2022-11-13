import UNavbar from '@/components/UNavbar';
import { Outlet } from 'react-router-dom';
import {
    actions,
  } from "@/store/features/users"
import { AppDispatch } from '@/store';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

function Home() {
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
      dispatch(actions.fetchUserInfo())
    }, [])
    
    return (
        <>
            <UNavbar />
            <div style={{flex: 1, overflow: 'scroll'}}>
              <Outlet/>
            </div>
        </>
    )
}

export default Home;

