import { robotoFont } from "@/app/assets/fontsSetup";
import React from "react";
import RegisterForm from "./components/RegisterForm/RegisterForm";

const Register = () => {
  return (
    <div className="flex w-full p-4">
      <div className="flex justify-center flex-col mx-auto">
        <div
          className={`my-8 w-full text-3xl ${robotoFont.className} text-sky-800`}
        >
          <h1>Cadastro</h1>
        </div>
        <div
          className={`flex flex-col bg-sky min-w-2xl w-full-50 w-full rounded-md p-4 border-2 border-sky-100`}
        >
          <RegisterForm />
        <a href="/login" className="text-sky-700 mb-8 mx-20">
          Já possui uma conta?
        </a>
        </div>
      </div>
    </div>
  );
};

export default Register;
