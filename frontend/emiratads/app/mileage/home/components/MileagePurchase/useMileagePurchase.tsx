"use client";

import { ButtonProps } from "@/app/components/Button/Button";
import { useAuthContext } from "@/app/contexts/auth";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  MileagePurchaseSchema,
  MileagePurchaseFormData,
} from "../../schema/schema";
import milesServices from "@/app/mileage/services/milesServices";

const useMileagePurchase = () => {
  const fixedPrice = 5.0;
  const { userData, updateMilesBalance } = useAuthContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<MileagePurchaseFormData>({
    resolver: zodResolver(MileagePurchaseSchema),
    defaultValues: {
      miles: 0,
    },
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successToast, setSuccessToast] = useState(false);
  const [errorToast, setErrorToast] = useState(false);

  const miles = watch("miles");
  const mileageAmount = userData?.usuario.saldo_milhas ?? 0;
  const buyAmount = miles * fixedPrice;

  const realizaCompra = (data: MileagePurchaseFormData) => {
    if (data.miles <= 0) {
      return;
    }

    setIsModalOpen(true);
  };

  const onConfirmBuy = async () => {
    try {
      const data = await fetchMileageService(miles);
      if (!data) {
        throw new Error("Erro ao comprar milhas.");
      }
      updateMilesBalance(data.saldo_milhas);
      setSuccessToast(true);
      window.location.href = "/client/invoice";
      reset();
    } catch (error) {
      console.error("Erro ao realizar a compra:", error);
      setErrorToast(true);
    } finally {
      setIsModalOpen(false);
    }
  };

  const onCancelBuy = () => {
    setIsModalOpen(false);
    reset();
  };

  const fetchMileageService = async (miles: number) => {
    try {
      const codigo = userData?.usuario.codigo;

      if (codigo) {
        const response = await milesServices.buyMiles(codigo, {
          quantidade: miles,
        });
        return response;
      }
    } catch (error) {
      console.error("Erro ao comprar milhas:", error);
    }
  };

  const modalControls: ButtonProps[] = [
    { text: "Cancelar", type: "DANGER", size: "SMALL", onClick: onCancelBuy },
    {
      text: "Confirmar",
      type: "SUCCESS",
      size: "SMALL",
      onClick: () => {
        onConfirmBuy();
      },
    },
  ];

  return {
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
    setSuccessToast,
    errorToast,
    setErrorToast,
    miles,
  };
};

export default useMileagePurchase;
