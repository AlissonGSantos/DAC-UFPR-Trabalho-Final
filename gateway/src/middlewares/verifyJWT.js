const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.SECRET_KEY

function verifyJWT (requiredProfiles = []) {
    return (req, res, next) => {
        const token = req.headers['authorization']?.split(' ')[1]

        if (!token) {
            return res.status(401).json({ message: 'Token não fornecido' })
        }

        jwt.verify(token, SECRET_KEY, (err, decoded) => {
            if (err) {
                if (err.name === 'TokenExpiredError') {
                  return res.status(401).json({ message: 'Sessão expirada. Faça login novamente.' });
                }
                return res.status(403).json({ message: 'Token inválido.' });
            }

            req.user = decoded

            if (requiredProfiles.length && !requiredProfiles.includes(decoded.profile)) {
                return res.status(403).json({ message: 'Acesso negado' })
            }

            next()
        })
    }
}

module.exports = verifyJWT
