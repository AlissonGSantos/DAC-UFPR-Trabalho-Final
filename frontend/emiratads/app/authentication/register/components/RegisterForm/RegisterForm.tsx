"use client";
import Button from "@/app/components/Button/Button";
import Input from "@/app/components/Input/Input";
import React from "react";
import useRegisterForm from "./useRegisterFrom";
import { maskCPF } from "@/app/utils/cpfMask";
import cepMask from "@/app/utils/cepMask";

const RegisterForm = () => {
  const { register, handleSubmit, errors, onSubmit, handleCepBlur } =
    useRegisterForm();

  return (
    <div className="flex w-full justify-center py-8">
      <div className="flex w-3/4">
        <form
          className="flex w-full flex-col gap-3"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex gap-4">
            <Input
              type={"text"}
              label={"Nome:"}
              {...register("nome")}
              error={
                errors.nome
                  ? [{ hasError: true, message: errors.nome.message ?? "" }]
                  : []
              }
            />
            <Input
              type={"email"}
              label={"Email:"}
              {...register("email")}
              error={
                errors.email
                  ? [{ hasError: true, message: errors.email.message ?? "" }]
                  : []
              }
            />

            <Input
              type={"text"}
              label={"CPF:"}
              {...register("cpf", {
                onChange: (e) => {
                  e.target.value = maskCPF(e.target.value);
                },
              })}
              error={
                errors.cpf
                  ? [{ hasError: true, message: errors.cpf.message ?? "" }]
                  : []
              }
            />
          </div>
          <div className="flex flex-fill gap-4">
            <div className="flex flex-col gap-4 w-1/2">
              <Input
                type={"text"}
                label={"CEP:"}
                {...register("endereco.cep", {
                  onChange: (e) => {
                    e.target.value = cepMask(e.target.value);
                  },
                  onBlur: (e) => {
                    handleCepBlur(e.target.value.replace("-", ""));
                  },
                })}
                error={
                  errors.endereco?.cep
                    ? [
                        {
                          hasError: true,
                          message: errors.endereco.cep.message ?? "",
                        },
                      ]
                    : []
                }
              />
              <Input
                type={"text"}
                label={"UF:"}
                {...register("endereco.uf")}
                error={
                  errors.endereco?.uf
                    ? [
                        {
                          hasError: true,
                          message: errors.endereco.uf.message ?? "",
                        },
                      ]
                    : []
                }
                disabled
              />
              <Input
                type={"text"}
                label={"Cidade:"}
                {...register("endereco.cidade")}
                error={
                  errors.endereco?.cidade
                    ? [
                        {
                          hasError: true,
                          message: errors.endereco.cidade.message ?? "",
                        },
                      ]
                    : []
                }
                disabled
              />
            </div>
            <div className="flex flex-col gap-4 w-1/2">
              <Input
                type={"text"}
                label={"Bairro:"}
                {...register("endereco.bairro")}
                error={
                  errors.endereco?.bairro
                    ? [
                        {
                          hasError: true,
                          message: errors.endereco.bairro.message ?? "",
                        },
                      ]
                    : []
                }
                disabled
              />
              <Input
                type={"text"}
                label={"Rua:"}
                {...register("endereco.rua")}
                error={
                  errors.endereco?.rua
                    ? [
                        {
                          hasError: true,
                          message: errors.endereco.rua.message ?? "",
                        },
                      ]
                    : []
                }
                disabled
              />
              <Input
                type={"number"}
                label={"Número:"}
                {...register("endereco.numero")}
                error={
                  errors.endereco?.numero
                    ? [
                        {
                          hasError: true,
                          message: errors.endereco.numero.message ?? "",
                        },
                      ]
                    : []
                }
              />
            </div>
          </div>
          <Input
            type={"text"}
            label={"Complemento:"}
            {...register("endereco.complemento")}
            error={
              errors.endereco?.complemento
                ? [
                    {
                      hasError: true,
                      message: errors.endereco.complemento.message ?? "",
                    },
                  ]
                : []
            }
          />
          <div className="flex w-1/3 mx-auto mt-6">
            <Button
              text={"Cadastrar"}
              extraClass="flex w-full justify-center"
              typeButton="submit"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
