import React from "react";
import RegisterForm from "./components/RegisterForm/RegisterForm";

const Register = () => {
  return (
    <div className="flex w-full p-4">
      <div className="flex justify-center flex-col mx-auto">
        
        <div
          className={`flex flex-col bg-sky min-w-2xl w-full-50 w-full rounded-md p-4 border-2 border-indigo-900`}
        >
          
          <RegisterForm />
          <span className="text-center font-bold text-slate-300 text-sm mx-32 my-8">
            Já possui conta?{" "}
            <a
              href="/authentication/register"
              className="text-indigo-700 hover:text-indigo-500"
            >
              Login
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Register;
