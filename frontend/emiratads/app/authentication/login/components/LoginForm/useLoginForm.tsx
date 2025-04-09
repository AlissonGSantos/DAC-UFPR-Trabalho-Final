"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "../../schema/schema";
import loginServices from "@/app/authentication/services/loginServices";
import { UserAuth } from "@/app/types/AuthTypes";
import { useAuthContext } from "@/app/contexts/auth";

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
      password: "",
    },
  });

  const { login } = useAuthContext();

  const onSubmit = async (data: LoginFormData) => {
    try {
      const res: UserAuth = await loginServices.login({
        login: data.email,
        senha: data.password,
      });

      if (res.access_token) {
        login(res);
        window.location.href = "/employee/dashboard";
      } else {
        console.error("Erro: Token de acesso não encontrado.");
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
    }
  };
  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
  };
};

export default useLoginForm;
