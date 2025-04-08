"use client";

import { useForm } from "react-hook-form";
import { RegisterFlightSchema } from "../../schema/schema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import registerFlightServices from "@/app/employee/services/registerFlightServices";

type RegisterFlightFormData = z.infer<typeof RegisterFlightSchema>;

const useRegisterFlightForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<RegisterFlightFormData>({
    resolver: zodResolver(RegisterFlightSchema),
    defaultValues: {
      OriginAirport: "",
      DestinationAirport: "",
      dateTimeFlight: "",
      seatsQuantity: "",
      ticketValue: ""
      },
    }
  );

  const onSubmit = (data: RegisterFlightFormData) => {
    console.log("Form", data);
  };


  return {
    register,
    handleSubmit,
    errors,
    onSubmit
  };
};

export default useRegisterFlightForm;
