"use client";

import Button from "@/app/components/Button/Button";
import Input from "@/app/components/Input/Input";
import useMileagePurchase from "./useMileagePurchase";
import { maskCurrency } from "@/app/utils/currencyMask";
import Modal from "@/app/components/Modal/Modal";
import Toast from "@/app/components/Toast/Toast";

const MileagePurchase = () => {
  const {
    register,
    handleSubmit,
    errors,
    fixedPrice,
    mileageAmount,
    buyAmount,
    realizaCompra,
    isModalOpen,
    setIsModalOpen,
    modalControls,
    successToast,
    errorToast,
    setSuccessToast,
    setErrorToast,
    miles,
  } = useMileagePurchase();

  return (
    <div className="flex flex-col w-8/10 mx-auto my-12 p-8 gap-4 text-slate-300 border-2 border-indigo-800 rounded ">
      <div>
        <h1 className="text-3xl font-semibold mb-4">Compra de Milhas</h1>
        <p className="mb-4">
          Aqui você pode comprar milhas para suas viagens. O valor de cada milha
          é fixo e você pode escolher a quantidade que deseja comprar.
        </p>
      </div>
      <p>Custo por milha: {maskCurrency(fixedPrice)}</p>
      <form onSubmit={handleSubmit(realizaCompra)}>
        <Input
          type="number"
          label="Quantidade de milhas:"
          placeholder="N. de Milhas"
          {...register("miles", { valueAsNumber: true })}
          min={0}
          error={
            errors.miles
              ? [
                  {
                    hasError: true,
                    message: errors.miles.message ?? "",
                  },
                ]
              : []
          }
        />
        <div className="flex w-full justify-between mt-4">
          <p>Seu saldo atual de milhas é: {mileageAmount}</p>
          <div className="flex flex-col w-1/3 justify-end gap-4">
            <p>Total da sua compra é: {maskCurrency(buyAmount)}</p>
            <Button
              text="Comprar Milhas"
              type="PRIMARY"
              size="MEDIUM"
              onClick={handleSubmit(realizaCompra)}
            />
          </div>
        </div>
      </form>
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
        title="Compra de Milhas"
        controls={modalControls}
      >
        <div className="flex flex-col gap-4">
          <p className="text-slate-200">
            Tem certeza que deseja realizar a compra de {miles} milhas?
          </p>
          <p className="text-sm text-slate-300">
            Total da sua compra é: {maskCurrency(buyAmount)}
          </p>
        </div>
      </Modal>
      <Toast
        message={"Compra realizada com sucesso!"}
        type={"SUCCESS"}
        isOpen={successToast}
        onClose={() => {
          setSuccessToast(false);
        }}
        duration={6000}
      />
      <Toast
        message={errors.miles?.message ?? "Erro ao realizar a compra"}
        type={"ERROR"}
        isOpen={errorToast}
        onClose={() => {
          setErrorToast(false);
        }}
        duration={6000}
      />
    </div>
  );
};

export default MileagePurchase;
