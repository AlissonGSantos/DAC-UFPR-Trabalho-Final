import Button from '@/app/components/Button/Button'
import Input from '@/app/components/Input/Input'
import React from 'react'

const LoginForm = () => {
  return (
    <div className="flex flex-col w-2/3 mx-auto mt-6">
      <form action="">
        <Input type={'email'} label={'Email:'}></Input>
        <Input type={'password'} label={'Senha:'}></Input>
        <div className="flex w-1/3 mx-auto mt-6">
          <Button
                  text={"Acessar"}
                  extraClass="flex w-full justify-center"
                  typeButton="submit"
                />
        </div>
      </form>
    </div>
  )
}

export default LoginForm
