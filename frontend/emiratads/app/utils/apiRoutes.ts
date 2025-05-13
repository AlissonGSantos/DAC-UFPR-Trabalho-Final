const apiRoutes = {
  authentication: {
    login: "/login",
    register: "/clientes",
    logout: "/logout",
  },
  miles: {
    miles: (clientId: string) => `/clientes/${clientId}/milhas`,
  },
  clients: {
    clients: `/clientes`,
    client: (clientId: string) => `/clientes/${clientId}`,
    client_miles: (clientId: string) => `/clientes/${clientId}/milhas`,
    client_bookings: (clientId: string) => `/clientes/${clientId}/reservas`,
  },
  flight: {
    flights: `/voos`,
    flight: (flightId: string) => `/voos/${flightId}`,
    airports: `/aeroportos`,
    flight_status: (flightId: string) => `/voos/${flightId}/estado`,
  },
  booking: {
    booking_client: (cliente: string) => `/reservas/cliente/${cliente}`,
    booking: (bookingId: string) => `/reservas/${bookingId}`,
    bookings: `/reservas`,
    bookings_seats: (bookingId: string) => `/reservas/poltronas/${bookingId}`,
    booking_status: (bookingId: string) => `/reservas/${bookingId}/estado`,
  },
  employees: {
    employee: (employeeId: string) => `/funcionarios/${employeeId}`,
    employees: "/funcionarios",
  },
};

export default apiRoutes;
