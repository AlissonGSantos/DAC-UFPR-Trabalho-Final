"use client";

import { useForm } from "react-hook-form";
import { RegisterSchema } from "../../schema/schema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import registerServices from "../../../services/registerServices";

type RegisterFormData = z.infer<typeof RegisterSchema>;

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

  const onSubmit = (data: RegisterFormData) => {
    console.log("Form", data);
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
    handleCepBlur
  };
};

export default useRegisterForm;
