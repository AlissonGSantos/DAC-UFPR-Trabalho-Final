"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "../../schema/schema";
import loginServices from "@/app/authentication/services/loginServices";
import { UserAuth } from "@/app/types/AuthTypes";
import { useAuthContext } from "@/app/contexts/auth";
import { useState } from "react";

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

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuthContext();

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      const res: UserAuth = await loginServices.login({
        login: data.email,
        senha: data.password,
      });

      if (res.access_token) {
        login(res);

        // Redireciona com base no tipo de usuário
        if (res.tipo === "FUNCIONARIO") {
          window.location.href = "/employee/home";
        } else if (res.tipo === "CLIENTE") {
          window.location.href = "/client/home";
        } else {
          console.error("Erro: Tipo de usuário desconhecido.");
          window.location.href = "/authentication/login";
        }
      } else {
        console.error("Erro: Token de acesso não encontrado.");
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      setError("Erro ao fazer login. Verifique suas credenciais.");
    } finally {
      setIsLoading(false);
    }
  };
  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    error,
    isLoading,
  };
};

export default useLoginForm;
