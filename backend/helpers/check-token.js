const jwt = require('jsonwebtoken')

// Middleware to validate token
const checkToken = (req, res, next) => {
    const token = req.header('auth-token')

    if(!token){
        return res.status(401).json({ error: "Acesso negado. Faça login para acessar página." })
    }

    try {
        const verified = jwt.verify(token, "secret")
        req.user = verified
        next() // continue
    } catch (err) {
        res.status(400).json({ error: "O token é inválido" })
    }
}

module.exports = checkToken