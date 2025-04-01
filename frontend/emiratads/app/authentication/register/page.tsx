import { robotoFont } from "@/app/assets/fontsSetup";
import React from "react";
import RegisterForm from "./components/RegisterForm/RegisterForm";

const Register = () => {
  return (
    <div className="w-screen h-screen">
      <div className="flex justify-center flex-col h-full m-auto w-1/2">
        <div
          className={`my-8 w-full text-3xl ${robotoFont.className} text-sky-800`}
        >
          <h1>Cadastro</h1>
        </div>
        <div
          className={`flex bg-sky min-w-2xl w-full-50 w-full rounded-md p-4 border-2 border-sky-100`}
        >
          <RegisterForm />
        </div>
      </div>
    </div>
  );
};

export default Register;
