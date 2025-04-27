require('dotenv').config()
const express = require('express')
const app = express()
const verifyJWT = require('./middlewares/verifyJWT.js')
const funcionarioRoutes = require('./routes/funcionarioRoutes.js')
const cors = require('cors')
const getCorsOptions = require('./config/corsConfig.js')

app.use(express.json())

app.use('/api', (req, res, next) => {
    try {
        const corsOptions = getCorsOptions(req.path)
        cors(corsOptions)(req, res, next)
    } catch (error) {
        res.status(500).json({ message: 'Erro ao configurar CORS' + error.message })
    }
});

app.use('/api', funcionarioRoutes)

app.listen(3001, () => {
    console.log('API Gateway rodando na porta 3001')
})