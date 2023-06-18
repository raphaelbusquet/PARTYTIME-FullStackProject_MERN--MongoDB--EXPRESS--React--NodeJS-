const router = require('express').Router();
const bcrypt = require('bcrypt')

const User = require('../models/user')

// middlewares
const verifyToken = require('../helpers/check-token')
const getUserByToken = require('../helpers/get-user-by-token')

// Get an user
router.get('/:id', verifyToken, async (req, res) => {

    const id = req.params.id

    // verify user
    try {
        const user = await User.findOne({ _id: id }, { password: 0 }); // Do not receive password
        res.json({ error:null, user })
    } catch (err) {
        return res.status(400).json({ error: "Usuário não existe." })
    }
})

// Update an user
router.put('/', verifyToken, async (req, res) => {
    const token = req.header('auth-token');
    const user = await getUserByToken(token);
    const userReqId = req.body.id
    const password = req.body.password
    const confirmpassword = req.body.confirmpassword

    const userId = user._id.toString()

    // Check if user id is equal to token user id
    if(userId != userReqId) {
        res.status(401).json({ error: 'Acesso negado!' })
    }

    // Create an user object
    const updateData = {
        name: req.body.name,
        email: req.body.email
    }

    // Check if passwords match
    if(password != confirmpassword) {
        res.status(401).json({ error: 'As senhas não conferem!' })
        // Change password
    } else if (password == confirmpassword && password != null){
        // Creating password
        const salt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(password, salt)

        //Add password to data
        updateData.password = passwordHash
    }

    try {
        // return updated data
        const updatedUser = await User.findOneAndUpdate({ _id: userId}, { $set: updateData }, {  new: true }) // Update only necessary
        res.json({ error: null, msg: "Usuário atualizado com sucesso!", data: updatedUser })

    } catch (error) {
        res.status(400).json({ err })
    }

})

module.exports = router;