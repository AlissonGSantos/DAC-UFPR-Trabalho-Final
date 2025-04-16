import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CheckReservationSchema } from "../../schema/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

type CheckReservationFormData = z.infer<typeof CheckReservationSchema>;

const useCheckReservationForm = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CheckReservationFormData>({
    resolver: zodResolver(CheckReservationSchema),
    defaultValues: {
      CodeReservation: "",
    },
  });

  const onSubmit = (data: CheckReservationFormData) => {
    console.log("Form", data);
    setValue("CodeReservation", "");
    setShowSuccess(true); 
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    showSuccess,
  };
};

export default useCheckReservationForm;
