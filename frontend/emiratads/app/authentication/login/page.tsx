import { robotoFont } from '@/app/assets/fontsSetup'
import React from 'react'
import LoginForm from './components/LoginForm/LoginForm'

const Login = () => {
  return (
    <div className="w-screen">
      <div className="flex justify-center flex-col mx-auto w-1/2">
        <div
          className={`my-8 w-full text-3xl ${robotoFont.className} text-sky-800`}
        >
          <h1>Login</h1>
        </div>
        <div
          className={`flex bg-sky min-w-2xl w-full-50 w-full rounded-md p-4 border-2 border-sky-100`}
        >
        <LoginForm></LoginForm>
        </div>
      </div>
    </div>
  )
}

export default Login