require('dotenv').config()
const cors = require('cors')
const express = require('express')
const getCorsOptions = require('./src/config/corsConfig.js')
const routes = require('./src/routes/routes.js')
const BASE_URL = '/api/v1'

const app = express()
app.use(express.json())

app.use(BASE_URL, (req, res, next) => {
    try {
        const corsOptions = getCorsOptions(req.path)
        cors(corsOptions)(req, res, next)
    } catch (error) {
        res.status(500).json({ message: 'Erro ao configurar CORS' + error.message })
    }
});

app.use(BASE_URL, routes)

app.listen(3030, () => {
    console.log('API Gateway rodando na porta 3030')
})