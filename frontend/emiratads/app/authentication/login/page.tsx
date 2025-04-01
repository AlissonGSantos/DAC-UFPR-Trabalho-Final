import { robotoFont } from '@/app/assets/fontsSetup'
import React from 'react'
import LoginForm from './components/LoginForm/LoginForm'

const Login = () => {
  return (
    <div className="w-full">
      <div className="flex justify-center flex-col mx-auto w-1/2">
        <div
          className={`my-8 w-full text-3xl ${robotoFont.className} text-sky-800`}
        >
          <h1>Login</h1>
        </div>
        <div
          className={`flex flex-col bg-sky min-w-2xl w-full-50 w-full rounded-md p-4 border-2 border-sky-100`}
        >
        <LoginForm></LoginForm>
        <a href="/authentication/register" className='text-sky-700 mx-32 my-8'> Não possui conta? Cadastre-se</a>
        </div>
      </div>
    </div>
  )
}

export default Login