"use client";
import Button from "@/app/components/Button/Button";
import Input from "@/app/components/Input/Input";
import React from "react";
import useRegisterForm from "./useRegisterForm";
import { maskCPF } from "@/app/utils/cpfMask";
import cepMask from "@/app/utils/cepMask";
import { robotoFont } from "@/app/assets/fontsSetup";
import Modal from "@/app/components/Modal/Modal";
import Link from "next/link";

const RegisterForm = () => {
  const { register, handleSubmit, errors, onSubmit, handleCepBlur, modalState, setModalState } =
    useRegisterForm();

  return (
    <div className="flex flex-col w-full justify-center py-8">
      <Modal isOpen={modalState} onClose={() => setModalState(false)} title="Cadastro realizado com sucesso!!!">
            <h2 className="py-4 text-gray-200 text-lg">Obrigado por se cadastrar!</h2>
            <p className="text-gray-200">Você receberá um e-mail no endereço informado contendo uma senha temporária para acessar a aplicação.</p>
            <Link className="flex justify-center align-center m-auto mt-8 bg-gray-200 py-4 px-12 w-fit rounded-md text-xl uppercase font-semibold tracking-widest hover:bg-gray-300 delay-50" href={"/authentication/login"}>Login</Link>
      </Modal>

      <h1
        className={`text-5xl font-semibold ${robotoFont.className} my-12 tracking-widest text-indigo-600 mx-auto`}
      >
        CADASTRO
      </h1>
      <div className="flex w-3/4 flex-row mx-auto justify-center">
        <form
          className="flex w-full flex-col gap-3"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex gap-4 w-full">
            <Input
              type={"text"}
              label={"Nome:"}
              {...register("nome")}
              error={
                errors.nome
                  ? [{ hasError: true, message: errors.nome.message ?? "" }]
                  : []
              }
              extraClasses="flex-1"
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
              extraClasses="flex-1"
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
              extraClasses="flex-1"
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
              size="SMALL"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
