const cors = require('cors');
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

const ALLOWED_ORIGINS = [FRONTEND_URL];
const corsMappings = {
  "/login": { methods: ["POST", "OPTIONS"] },
  "/logout": { methods: ["POST", "OPTIONS"] },

  "/funcionarios": { methods: ["GET", "POST", "OPTIONS"] },
  "/funcionarios/:codigo": { methods: ["GET", "PUT", "DELETE", "OPTIONS"] },

  "/clientes": { methods: ["GET", "POST", "OPTIONS"] },
  "/clientes/:codigo": { methods: ["GET", "PUT", "OPTIONS"] },
  "/clientes/:codigo/reservas": { methods: ["GET", "OPTIONS"] },
  "/clientes/:codigo/milhas": { methods: ["GET", "PUT", "OPTIONS"] },

  "/voos": { methods: ["GET", "POST", "OPTIONS"] },
  "/voos/:codigo": { methods: ["GET", "DELETE", "OPTIONS"] },
  "/voos/:codigo/estado": { methods: ["PATCH", "OPTIONS"] },

  "/reservas": { methods: ["POST", "OPTIONS"] },
  "/reservas/:codigo": { methods: ["GET", "DELETE", "OPTIONS"] },
  "/reservas/:codigo/estado": { methods: ["PATCH", "OPTIONS"] },

  "/aeroportos": { methods: ["GET", "OPTIONS"] },
};

function getCorsOptions(path) {
  let config = corsMappings[path];

  if (!config) {
    // Tenta encontrar um caminho dinâmico correspondente
    const dynamicPath = Object.keys(corsMappings).find((key) => {
      const regex = new RegExp(`^${key.replace(/:\w+/g, "\\w+")}$`);
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
    /* allowedHeaders: ["Content-Type", "Authorization"], */
    credentials: true,
  };
}

module.exports = getCorsOptions;
