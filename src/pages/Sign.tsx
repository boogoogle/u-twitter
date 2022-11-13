import { useState } from 'react'
import { useForm, Resolver } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";
import { Alert, Card, Container, Stack } from 'react-bootstrap';

import {
  actions,
} from "@/store/features/users"
import { User } from '@/types';
import { AppDispatch, RootState } from '@/store';
import { useEffect } from 'react';
import {setCurrentUser} from "@/utils"


type FormValues = {
  username: string;
  password: string;
}

const resolver: Resolver<FormValues> = async (values) => {
  return {
    values: (values.username && values.password) ? values : {},
    errors: (!values.username || !values.password) 
      ? {
        username: {
          type: 'required',
          message: 'is required'
        },
        password: {
          type: 'required',
          message: 'is required'
        },
      }
      : {}
  }
}

function Sign() {
    const userInfo = useSelector((state:RootState) =>  state.userInfo)
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>()

    const [isShowRegister, setIsShowRegister] = useState(false)

    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({ resolver });

    const onSubmit = handleSubmit((user: User) => {
      if(isShowRegister) {
        dispatch(actions.userRegister(user));
      } else {
        dispatch(actions.userLogin(user));
      }
    });

    const handleChangeMode = (e: any)=>{
      if(e&&e.target) {
        setIsShowRegister(e.target.checked)
      }
    }

    const clearAlertMsg = (v: boolean) => {
      dispatch(actions.resetUserState({
        msg: ""
      }))
    }

    useEffect(()=>{
      if(userInfo.isLogin) {
        console.log(userInfo.username, "login successful", )
        setCurrentUser({
          username: userInfo.username,
          password: ''
        })
        navigate(`/${userInfo.username}`)
      }

    }, [userInfo])
  
    return (
      <div style={{height: '100%'}} className="postion-relative">
        {userInfo.msg? 
          <Alert key={'danger'} variant="danger" className='position-absolute top-0 start-0 w-100'>
            {userInfo.msg}
          </Alert> : <></>
        }
        <div style={{height: '100%'}} className="d-flex flex-column container-sm justify-content-center align-items-center">
          <Card className="p-4" style={{minWidth: "360px"}}>
            <div className="d-flex flex-column align-items-center fs-2">
              <div className="">U-Twitter</div>
              <div className="">
                Hello hooks
              </div>
            </div>
            <hr />
            <Form className="space-y-6 needs-validation was-validated" onChange={()=>clearAlertMsg(false)}>
              <div className='d-flex flex-column'>
                <label htmlFor="" className='mb-2' >
                    Username {errors?.username && <div className="d-inline-block ms-4 text-danger">{errors?.username.message}</div>}
                </label>
                <input type="text" {...register("username")} className='p-1 mt-1' />
              </div>

              <div className='d-flex flex-column'>
                <label htmlFor="" className="mr-2">
                  Password {errors?.password && <div className="d-inline-block ms-4 text-danger">{errors?.password.message}</div>}
                </label>
                <input type="text" {...register("password")} className='p-1 mt-1' />
              </div>

              <Form.Check 
                type="switch"
                className='my-2'
                id="custom-switch"
                label={ `to ${isShowRegister ? 'login' : 'register'}`}
                onClick={handleChangeMode}
              />
            <div className="row gx-5">
                <button className={`btn btn-primary col mx-4`} onClick={onSubmit}>{isShowRegister ? "Register" : "Login" }</button>
            </div>
            </Form>
          </Card>
        </div>
      </div>
    )
  }
  
  export default Sign
  