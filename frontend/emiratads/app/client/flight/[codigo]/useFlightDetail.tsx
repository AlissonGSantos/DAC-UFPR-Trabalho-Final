import { useState, useEffect, useMemo } from "react";
import useFlightContext from "@/app/contexts/flight";
import { Flight } from "@/app/types/FlightTypes";
import { useAuthContext } from "@/app/contexts/auth";

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

  const fetchFlight = async () => {
    try {
      const flightData = flightList.find((flight) => flight.codigo === codigo);
      if (flightData) {
        setFlight(flightData);
      } else {
        throw new Error("Flight not found");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const totalSeats = flight?.quantidade_poltronas_total ?? 0;
  const half = Math.ceil(totalSeats / 2);
  const firstHalf = Array.from({ length: half }, (_, index) => index);
  const secondHalf = Array.from(
    { length: totalSeats - half },
    (_, index) => index + half
  );

  const reservedSeats = useMemo(() => {
    const reserved = new Set<number>();
    while (reserved.size < (flight?.quantidade_poltronas_ocupadas ?? 0)) {
      const randomIndex = Math.floor(Math.random() * totalSeats);
      reserved.add(randomIndex);
    }
    return Array.from(reserved);
  }, [flight?.quantidade_poltronas_ocupadas, totalSeats]);

  const onSelectSit = (index: number) => {
    if (selectedSits.includes(index)) {
      setSelectedSits(selectedSits.filter((sit) => sit !== index));
      setSitsQuantity((prev) => prev - 1);
    } else {
      setSelectedSits([...selectedSits, index]);
      setSitsQuantity((prev) => prev + 1);
    }
  };

  // Obter o saldo de milhas do usuário
  const userMilesBalance = userData?.usuario.saldo_milhas ?? 0;

  // Calcular desconto baseado nas milhas usadas (1 milha = 5 reais)
  const calculateDiscount = (miles: number): number => {
    if (!flight) return 0;
    // Cada milha vale 5 reais
    const discountValue = miles * 5;
    const maxDiscount = (flight.valor_passagem * sitsQuantity);
    // Limitar o desconto ao valor total da passagem
    return Math.min(discountValue, maxDiscount);
  };

  // Manipular alteração na quantidade de milhas a serem usadas
  const handleMilesChange = (miles: number) => {
    const milesNumber = Number(miles);
    if (isNaN(milesNumber) || milesNumber < 0) {
      setMilesToUse(0);
      return;
    }
    
    // Não permitir usar mais milhas do que o usuário possui
    const validMiles = Math.min(milesNumber, userMilesBalance);
    setMilesToUse(validMiles);
    
    // Atualizar preço total
    updateTotalPrice(validMiles);
  };

  // Atualizar preço total com desconto de milhas
  const updateTotalPrice = (miles: number) => {
    if (!flight) return;
    
    const subtotal = flight.valor_passagem * sitsQuantity;
    const discount = calculateDiscount(miles);
    setTotalPrice(subtotal - discount);
  };

  const onBookFlight = async () => {
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

      // Atualizar saldo de milhas do usuário se estiver usando milhas
      if (milesToUse > 0 && userData) {
        const newMilesBalance = userMilesBalance - milesToUse;
        updateMilesBalance(newMilesBalance);
      }

      setFlight(updatedFlight);
      setFlightList(updatedFlightList);

      setSitsQuantity(0);
      setSelectedSits([]);
      setMilesToUse(0);

      setIsConfirmModalOpen(false);

      window.location.href = "/client/home"
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (codigo) {
      fetchFlight();
    }
  }, [codigo]);

  useEffect(() => {
    if (flight) {
      const available =
        flight.quantidade_poltronas_total -
        flight.quantidade_poltronas_ocupadas;
      setAvailableSits(available);
      
      // Inicializar preço total sem desconto de milhas
      setTotalPrice(flight.valor_passagem * sitsQuantity);
    }
  }, [flight]);

  // Atualizar preço total quando a quantidade de assentos mudar
  useEffect(() => {
    if (flight) {
      updateTotalPrice(milesToUse);
    }
  }, [sitsQuantity, flight]);

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
  };
};

export default useFlightDetail;
