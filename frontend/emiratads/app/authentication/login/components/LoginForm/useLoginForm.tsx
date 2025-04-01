"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "../../schema/schema";
import loginServices from "@/app/authentication/services/loginServices";

type LoginFormData = z.infer<typeof LoginSchema>;

const useLoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: ""
      },
    },
);

  const onSubmit = async (data: LoginFormData) => {
    console.log("Form", data);
    const res = await loginServices.login({email: data.email, password: data.password})
    console.log(res)
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
  };
};

export default useLoginForm;
