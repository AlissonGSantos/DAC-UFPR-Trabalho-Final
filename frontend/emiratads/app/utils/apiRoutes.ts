const apiRoutes = {
    authentication: {
        login: '/auth/login',
        register: '/auth/clientes',
        logout: '/auth/logout',
    },
    employees: {
        employee: (employeeId: string) => `/funcionarios/${employeeId}`,
        employees: '/funcionarios',
    }
}

export default apiRoutes;