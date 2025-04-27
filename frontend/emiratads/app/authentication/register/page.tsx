"use client";

import RegisterForm from "./components/RegisterForm/RegisterForm";
import Logo from "@/app/assets/images/logos/emiratadsLogo.png";
import Image from "next/image";
import Toast from "@/app/components/Toast/Toast";
import { useState } from "react";

const Register = () => {
  const [isToastOpen, setIsToastOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  return (
    <div className="flex w-full p-4">
      <div className="flex justify-center flex-col mx-auto">
        <div
          className={`flex flex-col bg-sky min-w-2xl w-full-50 w-full rounded-md p-4 border-2 border-indigo-900`}
        >
          <Image
            src={Logo}
            alt={"emiratads-logo"}
            width={260}
            className="mx-auto"
          />

          <RegisterForm
            setIsToastOpen={setIsToastOpen}
            setErrorMessage={setErrorMessage}
          />
          <span className="text-center font-bold text-slate-300 text-sm mx-32 my-8">
            Já possui conta?{" "}
            <a
              href="/authentication/login"
              className="text-indigo-700 hover:text-indigo-500"
            >
              Login
            </a>
          </span>
        </div>
      </div>
      <Toast
        isOpen={isToastOpen}
        onClose={() => {
          setIsToastOpen(false);
        }}
        message={errorMessage}
        type={"ERROR"}
        duration={3000}
      />
    </div>
  );
};

export default Register;
