const cors = require('cors');

const ALLOWED_ORIGINS = ['http://localhost:3000']
const corsMappings = {
    '/v1/login': { methods: ['POST'] },
    '/v1/logout': { methods: ['POST'] },

    '/v1/funcionarios': { methods: ['GET', 'POST'] },
    '/v1/funcionarios/:codigo': { methods: ['GET', 'PUT', 'DELETE'] },

    '/v1/clientes': { methods: ['GET', 'POST'] },
    '/v1/clientes/:codigo': { methods: ['GET'] },
    '/v1/clientes/:codigo/reservas': { methods: ['GET'] },
    '/v1/clientes/:codigo/milhas': { methods: ['GET', 'PUT'] },

    '/v1/voos': { methods: ['GET', 'POST'] },
    '/v1/voos/:codigo': { methods: ['GET', 'DELETE'] },
    '/v1/voos/:codigo/estado': { methods: ['PATCH'] },

    '/v1/reservas': { methods: ['POST'] },
    '/v1/reservas/:codigo': { methods: ['GET', 'DELETE'] },
    '/v1/reservas/:codigo/estado': { methods: ['PATCH'] },

    '/v1/aeroportos': { methods: ['GET'] }
}

function getCorsOptions(path) {
    const config = corsMappings[path]

    if (!config) {
        throw new Error(`CORS não configurado para o caminho: ${path}`)
    }

    return {
        origin: ALLOWED_ORIGINS,
        methods: config.methods,
        allowedHeaders: ['Content-Type', 'Authorization']
    }
}

module.exports = getCorsOptions