import { useState } from 'react'
import { useForm, Resolver } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import Form from 'react-bootstrap/Form';

import {
  actions
} from "@/store/slices"
import { User } from '@/types';
import { AppDispatch } from '@/store';


type FormValues = {
  username: string;
  password: string;
}

const resolver: Resolver<FormValues> = async (values) => {
  return {
    values: values.username ? values : {},
    errors: !values.username
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
  
    return (
      <div className="container w-full flex-col justify-center min-h-screen bg-gray-50">
        <div className="max-w-md w-full mx-auto ">
          <div className="text-center font-medium text-xl">Something</div>
          <div className="text-3xl font-bold text-gray-900 mt-2 text-center">
            SubTitle
          </div>
        </div>
        <div className="max-w-md w-full mx-auto mt-4 p-8 bg-white border border-gray-300 rounded-sm">
          <Form className="space-y-6 needs-validation was-validated">
            <div>
              <label htmlFor="" className="text-sm font-bold text-gray-300 flex flex-row items-center">
                  Username {errors?.username && <div className="ml-2 text-red-500">{errors?.username.message}</div>}
              </label>
              <input type="text" {...register("username")} className='w-full p-2 border border-gray-300 rounded mt-1' />
            </div>

            <div>
              <label htmlFor="" className="text-sm font-bold text-gray-300 flex flex-row items-center">
                Password {errors?.password && <div className="ml-2 text-red-500">{errors?.password.message}</div>}
              </label>
              <input type="text" {...register("password")} className='w-full p-2 border border-gray-300 rounded mt-1' />
            </div>

            <Form.Check 
              type="switch"
              id="custom-switch"
              label={ `to ${isShowRegister ? 'login' : 'register'}`}
              onClick={handleChangeMode}
            />
           <div className="row gx-5">
              <button className={`btn btn-primary col mx-4`} onClick={onSubmit}>{isShowRegister ? "Register" : "Login" }</button>
           </div>
          </Form>
        </div>
      </div>
    )
  }
  
  export default Sign
  