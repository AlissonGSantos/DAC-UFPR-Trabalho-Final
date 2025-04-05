import { robotoFont } from "@/app/assets/fontsSetup";
import React from "react";
import LoginForm from "./components/LoginForm/LoginForm";

const Login = () => {
  return (
    <div className="w-full">
      <div className="flex justify-center flex-col mx-auto w-1/2">
        <div
          className={`my-8 w-full text-3xl ${robotoFont.className} text-indigo-900`}
        ></div>
        <div
          className={`flex flex-col bg-indigo min-w-2xl w-full-50 w-full rounded-md p-4 border-2 border-indigo-900`}
        >
          <h1
            className={`text-5xl font-semibold ${robotoFont.className} my-12 tracking-widest text-indigo-600 mx-auto`}
          >
            LOGIN
          </h1>
          <LoginForm></LoginForm>
          <span className="text-center font-bold text-slate-300 text-sm mx-32 my-8">
            Não possui conta?{" "}
            <a
              href="/authentication/register"
              className="text-indigo-700 hover:text-indigo-500"
            >
              Cadastre-se
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
