const apiRoutes = {
    authentication: {
        login: '/login',
        register: '/clientes',
        logout: '/logout',
    },
    miles: {
        miles: (clientId: string) => `/clientes/${clientId}/milhas`,
    }
}

export default apiRoutes;