"use client";
import { robotoFont } from "@/app/assets/fontsSetup";
import React from "react";
import LoginForm from "./components/LoginForm/LoginForm";
import Logo from "@/app/assets/images/logos/emiratadsLogo.png";
import Image from "next/image";
import { Info } from "phosphor-react";

const Login = () => {
  return (
    <div className="w-full">
      <div className="flex justify-center flex-col mx-auto w-1/2">
        <div className={`my-8 w-full text-3xl ${robotoFont.className} text-indigo-900`} >
          
          <div className="mt-6 p-4 bg-red-900/20 border border-red-700 rounded-lg mx-8">
              <div className="flex items-center mb-2">
                <Info size={24} className="text-red-500 mr-2" />
                <span className="text-slate-300 text-sm">
                  Atenção!
                </span>
              </div>
              <p className="text-center text-sm text-slate-300">
                Este site foi desenvolvido exclusivamente para fins acadêmicos e não possui fins comerciais. 
                Não realiza transações financeiras nem coleta de dados sensíveis. 
                Todos os dados registrados são fictícios e serão excluídos posteriormente.
              </p>
            </div>
        </div>
        
        <div
          className={`flex flex-col bg-indigo min-w-2xl w-full-50 w-full rounded-md p-4 border-2 border-indigo-900`}
        >
          <Image
            src={Logo}
            alt={"emiratads-logo"}
            width={260}
            className="mx-auto"
          />
          <h1
            className={`text-5xl font-semibold ${robotoFont.className} my-12 tracking-widest text-indigo-600 mx-auto`}
          >
            LOGIN
          </h1>
          <LoginForm></LoginForm>
          <span className="text-center font-bold text-slate-300 text-sm mx-32 mt-4">
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
