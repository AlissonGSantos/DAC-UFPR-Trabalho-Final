const cors = require('cors');

const ALLOWED_ORIGINS = ['http://localhost:3000']
const corsMappings = {
    '/funcionarios': { methods: ['GET', 'POST', 'PUT', 'DELETE'] },

    // Adicionar aqui outras URLs e seus respectivos serviços e métodos aceitos
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