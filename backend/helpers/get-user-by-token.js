const jwt = require('jsonwebtoken')

const User = require('../models/user')

// Get user by jwt token
const getUserByToken = async (token) => {
    if(!token) {
        return res.status(401).json({ error: "Acesso negado!" })
    }

    // Find user
    const decoded = jwt.verify(token, "secret")

    const userId = decoded.id

    const user = await User.findOne({ _id: userId })

    return user;
}

module.exports = getUserByToken