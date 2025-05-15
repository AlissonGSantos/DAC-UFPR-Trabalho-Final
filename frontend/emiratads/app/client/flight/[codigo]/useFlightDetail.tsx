import { useState, useEffect, useMemo, useCallback } from "react";
import useFlightContext from "@/app/contexts/flight";
import { Flight } from "@/app/types/FlightTypes";
import { useAuthContext } from "@/app/contexts/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  UsePointsSchema,
  UsePointsData,
  validateMilesInput,
} from "./schema/schema";
import flightServices from "@/app/services/flightServices";
import bookingService from "../../services/bookingService";

const useFlightDetail = (codigo: string) => {
  const { flightList, setFlightList } = useFlightContext();
  const { userData, updateMilesBalance } = useAuthContext();

  const [flight, setFlight] = useState<Flight | null>(null);
  const [sitsQuantity, setSitsQuantity] = useState<number>(0);
  const [availableSits, setAvailableSits] = useState<number>(0);
  const [selectedSits, setSelectedSits] = useState<number[]>([]);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isToastOpen, setIsToastOpen] = useState(false);
  const [milesToUse, setMilesToUse] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [inputError, setInputError] = useState<string | null>(null);
  const [milesTotal, setMilesTotal] = useState<number>(0);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [bookingCode, setBookingCode] = useState<string>("");

  const {
    register,
    formState: { errors },
    setValue,
  } = useForm<UsePointsData>({
    resolver: zodResolver(UsePointsSchema),
    defaultValues: {
      miles: 0,
    },
  });

  const userMilesBalance = userData?.usuario.saldo_milhas ?? 0;

  const fetchFlight = useCallback(async () => {
    try {
      const flightData = await flightServices.getFlight(codigo);
      if (flightData) {
        setFlight(flightData);
      } else {
        throw new Error("Flight not found");
      }
    } catch (error) {
      console.error(error);
    }
  }, [codigo]);

  const totalSeats = flight?.quantidade_poltronas_total ?? 0;
  const half = Math.ceil(totalSeats / 2);
  const firstHalf = Array.from({ length: half }, (_, index) => index);
  const secondHalf = Array.from(
    { length: totalSeats - half },
    (_, index) => index + half
  );

  const reservedSeats = useMemo(() => {
    if (!flight || !Array.isArray(flight.poltronas_ocupadas)) {
      return [];
    }

    return flight.poltronas_ocupadas
      .filter(
        (sit) => sit > 0 && sit <= (flight?.quantidade_poltronas_total || 0)
      )
      .map((sit) => sit - 1);
  }, [flight]);

  const onSelectSit = (index: number) => {
    if (selectedSits.includes(index)) {
      setSelectedSits(selectedSits.filter((sit) => sit !== index));
      setSitsQuantity((prev) => prev - 1);
    } else {
      setSelectedSits([...selectedSits, index]);
      setSitsQuantity((prev) => prev + 1);
    }
  };

  const calculateDiscount = useCallback(
    (miles: number): number => {
      if (!flight) return 0;
      const discountValue = miles * 5;
      const maxDiscount = flight.valor_passagem * sitsQuantity;
      return Math.min(discountValue, maxDiscount);
    },
    [flight, sitsQuantity]
  );
  const updateTotalPrice = useCallback(
    (miles: number) => {
      if (!flight) return;

      const subtotal = flight.valor_passagem * sitsQuantity;
      const discount = calculateDiscount(miles);
      setTotalPrice(subtotal - discount);
    },
    [calculateDiscount, flight, sitsQuantity]
  );

  const handleMilesChange = useCallback(
    (miles: number) => {
      const ticketValue = flight?.valor_passagem ?? 0;
      const validation = validateMilesInput(
        miles,
        userMilesBalance,
        sitsQuantity,
        ticketValue
      );

      if (!validation.isValid) {
        setInputError(validation.message ?? null);
        if (validation.validValue !== undefined) {
          setMilesToUse(validation.validValue);
          setValue("miles", validation.validValue);
        }

        if (validation.message?.includes("assento")) {
          setErrorMessage(validation.message);
          setIsToastOpen(true);
        }

        return;
      }

      setInputError(null);
      const validMiles = validation.validValue ?? 0;
      setMilesToUse(validMiles);
      setValue("miles", validMiles);

      updateTotalPrice(validMiles);
    },
    [
      flight?.valor_passagem,
      setValue,
      sitsQuantity,
      updateTotalPrice,
      userMilesBalance,
    ]
  );

  const onBookFlight = useCallback(async () => {
    try {
      if (!flight) throw new Error("Ocorreu um erro ao executar reserva");
      if (sitsQuantity === 0) throw new Error("Selecione ao menos um assento");

      const updatedFlight = {
        ...flight,
        quantidade_poltronas_ocupadas:
          flight.quantidade_poltronas_ocupadas + sitsQuantity,
      };

      const updatedFlightList = flightList.map((f) =>
        f.codigo === codigo ? updatedFlight : f
      );

      const newMilesBalance = userMilesBalance - milesToUse;

      const createBookingResponse = await bookingService.createBooking({
        valor: totalPrice,
        milhas_utilizadas: milesToUse,
        quantidade_poltronas: sitsQuantity,
        poltronas_reservadas: selectedSits.map((sit) => sit + 1),
        codigo_voo: flight.codigo,
        codigo_cliente: Number(userData?.usuario.codigo),
      });

      if (!createBookingResponse) {
        throw new Error("Erro ao criar reserva");
      }

      updateMilesBalance(newMilesBalance);

      setFlight(createBookingResponse.voo);
      setFlightList(updatedFlightList);

      setSitsQuantity(0);
      setSelectedSits([]);
      setMilesToUse(0);

      setIsConfirmModalOpen(false);

      if (createBookingResponse) {
        setBookingCode(createBookingResponse.codigo);
        setShowSuccessModal(true);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage(
        error instanceof Error ? error.message : "Erro ao realizar reserva"
      );
      setIsToastOpen(true);
    }
  }, [
    codigo,
    flight,
    flightList,
    milesToUse,
    milesTotal,
    selectedSits,
    setFlightList,
    sitsQuantity,
    totalPrice,
    updateMilesBalance,
    userData?.usuario.codigo,
    userMilesBalance,
  ]);

  useEffect(() => {
    if (codigo) {
      fetchFlight();
    }
  }, [codigo, fetchFlight]);

  useEffect(() => {
    setMilesTotal(((flight?.valor_passagem ?? 0) * sitsQuantity) / 5);
  }, [sitsQuantity, flight]);

  useEffect(() => {
    if (flight) {
      const poltronasOcupadas = Array.isArray(flight.poltronas_ocupadas)
        ? flight.poltronas_ocupadas
        : [];

      const available =
        flight.quantidade_poltronas_total - poltronasOcupadas.length;
      setAvailableSits(available);

      setTotalPrice(flight.valor_passagem * sitsQuantity);
      if (sitsQuantity === 0) {
        setMilesToUse(0);
        setValue("miles", 0);
        setInputError(null);
      } else if (milesToUse > 0) {
        handleMilesChange(milesToUse);
      }
    }
  }, [flight, sitsQuantity, setValue, handleMilesChange, milesToUse]);

  useEffect(() => {
    if (flight) {
      updateTotalPrice(milesToUse);
    }
  }, [sitsQuantity, flight, milesToUse, updateTotalPrice]);

  const openModal = () => {
    try {
      if (!flight) throw new Error("Ocorreu um erro ao executar reserva");
      if (sitsQuantity === 0) throw new Error("Selecione ao menos um assento");

      setIsConfirmModalOpen(true);
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage(
          "Ocorreu um erro ao executar reserva, tente novamente mais tarde!"
        );
      }
      setIsToastOpen(true);
    }
  };

  const closeModal = () => {
    setIsConfirmModalOpen(false);
  };

  const onCloseBookingSuccessModal = () => {
    setShowSuccessModal(false);
    setBookingCode("");
    window.location.href = "/client/home";
  };

  const onCancel = () => {
    setIsConfirmModalOpen(false);
    setSitsQuantity(0);
    setSelectedSits([]);
  };

  return {
    flight,
    sitsQuantity,
    setSitsQuantity,
    onBookFlight,
    availableSits,
    onSelectSit,
    selectedSits,
    firstHalf,
    secondHalf,
    reservedSeats,
    isConfirmModalOpen,
    openModal,
    closeModal,
    onCancel,
    errorMessage,
    setErrorMessage,
    isToastOpen,
    setIsToastOpen,
    userMilesBalance,
    milesToUse,
    handleMilesChange,
    totalPrice,
    register,
    errors,
    inputError,
    milesTotal,
    setMilesTotal,
    setMilesToUse,
    showSuccessModal,
    setShowSuccessModal,
    bookingCode,
    setBookingCode,
    onCloseBookingSuccessModal,
  };
};

export default useFlightDetail;
