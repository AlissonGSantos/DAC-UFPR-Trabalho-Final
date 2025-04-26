"use client";

import { useForm } from "react-hook-form";
import { RegisterFormData, RegisterSchema } from "../../schema/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import registerServices from "../../../services/registerServices";
import useRegister from "../../useRegister";
import { useState } from "react";


const useRegisterForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      nome: "",
      cpf: "",
      email: "",
      endereco: {
        cep: "",
        complemento: "",
        rua: "",
        uf: "",
        cidade: "",
        numero: "",
        bairro: "",
      },
    },
  });
  const [modalState, setModalState] = useState(false)

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await registerServices.registerUser(data);
      setModalState(true)
    } catch (error) {
      console.error("Erro ao registrar usuário:", error);
    }
  };

  const handleCepBlur = async (cep: string) => {
    if (cep.length === 8) {
      try {
        const data = await registerServices.getCep(cep);
        if (data) {
          setValue("endereco.rua", data.logradouro || "");
          setValue("endereco.bairro", data.bairro || "");
          setValue("endereco.cidade", data.localidade || "");
          setValue("endereco.uf", data.uf || "");
        }
      } catch (error) {
        console.error("Erro ao buscar o CEP:", error);
      }
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    handleCepBlur,
    modalState,
    setModalState
  };
};

export default useRegisterForm;
