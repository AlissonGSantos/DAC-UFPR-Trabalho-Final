"use client";
import Button from "@/app/components/Button/Button";
import Input from "@/app/components/Input/Input";
import React from "react";
import useLoginForm from "./useLoginForm";
import Loader from "@/app/components/Loader/Loader";

const LoginForm = () => {
  const { handleSubmit, register, onSubmit, errors, error, isLoading } =
    useLoginForm();

  return (
    <div className="flex flex-col w-2/3 mx-auto mt-6">
      <Loader loading={isLoading} />
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <Input
          type={"email"}
          label={"Email:"}
          {...register("email")}
          error={
            errors.email
              ? [{ hasError: true, message: errors.email.message ?? "" }]
              : []
          }
        ></Input>
        <Input
          type={"password"}
          label={"Senha:"}
          {...register("password")}
          error={
            errors.password
              ? [{ hasError: true, message: errors.password.message ?? "" }]
              : []
          }
        ></Input>
        {error && (
          <span className="text-red-500 text-sm text-center">{error}</span>
        )}
        <div className="flex w-1/3 mx-auto mt-6">
          <Button
            text={"Acessar"}
            extraClass="flex w-full justify-center"
            typeButton="submit"
            size="SMALL"
          />
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
