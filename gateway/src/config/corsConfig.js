const cors = require('cors');

const ALLOWED_ORIGINS = ['*'];
const corsMappings = {
    '/login': { methods: ['POST'] },
    '/logout': { methods: ['POST'] },

    '/funcionarios': { methods: ['GET', 'POST'] },
    '/funcionarios/:codigo': { methods: ['GET', 'PUT', 'DELETE'] },

    '/clientes': { methods: ['GET', 'POST'] },
    '/clientes/:codigo': { methods: ['GET', 'PUT'] },
    '/clientes/:codigo/reservas': { methods: ['GET'] },
    '/clientes/:codigo/milhas': { methods: ['GET', 'PUT'] },

    '/voos': { methods: ['GET', 'POST'] },
    '/voos/:codigo': { methods: ['GET', 'DELETE'] },
    '/voos/:codigo/estado': { methods: ['PATCH'] },

    '/reservas': { methods: ['POST'] },
    '/reservas/:codigo': { methods: ['GET', 'DELETE'] },
    '/reservas/:codigo/estado': { methods: ['PATCH'] },

    '/aeroportos': { methods: ['GET'] }
};

function getCorsOptions(path) {
    let config = corsMappings[path];

    if (!config) {
        // Tenta encontrar um caminho dinâmico correspondente
        const dynamicPath = Object.keys(corsMappings).find((key) => {
            const regex = new RegExp(`^${key.replace(/:\w+/g, '\\w+')}$`);
            return regex.test(path);
        });

        if (dynamicPath) {
            config = corsMappings[dynamicPath];
        }
    }

    if (!config) {
        throw new Error(`CORS não configurado para o caminho: ${path}`);
    }

    return {
        origin: ALLOWED_ORIGINS,
        methods: config.methods,
        allowedHeaders: ['Content-Type', 'Authorization'],
    };
}

module.exports = getCorsOptions