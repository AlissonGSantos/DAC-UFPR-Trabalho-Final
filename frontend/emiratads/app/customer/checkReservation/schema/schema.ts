import { z } from 'zod';

export const CheckReservationSchema = z.object({
    CodeReservation: z
      .string()
      .nonempty({ message: 'Informe o código da reserva.' })
  ,
  });

export const ReadReservationSchema = z.object({
    CodeReservation: z
      .string()
  ,
    dateTimeFlight: z  
      .string()
  ,
    OriginAirport: z
      .string()
  ,
    DestinationAirport: z
      .string()
  ,
    ticketValue: z
      .string()
  ,
    miles: z
      .string()
  ,
    flightStatus: z
      .string()
});