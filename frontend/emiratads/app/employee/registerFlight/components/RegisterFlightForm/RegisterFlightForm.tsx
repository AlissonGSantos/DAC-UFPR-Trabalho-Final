"use client";
import Button from "@/app/components/Button/Button";
import Input from "@/app/components/Input/Input";
import React from "react";
import useRegisterFlightForm from "./useRegisterFlightForm";
import { robotoFont } from "@/app/assets/fontsSetup";

const RegisterFlightForm = () => {
  const { register, handleSubmit, errors, onSubmit } = useRegisterFlightForm();

  return (
      <h1
        className={`text-5xl font-semibold ${robotoFont.className} my-12 tracking-widest text-indigo-600 mx-auto`}
      >
        Ola Mundo!!!
      </h1>
  )
}

export default RegisterFlightForm;