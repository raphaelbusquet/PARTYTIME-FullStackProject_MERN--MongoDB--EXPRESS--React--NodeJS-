const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

// Register an user
router.post('/register', async (req, res) => {

    const name = req.body.name
    const email = req.body.email
    const password = req.body.password
    const confirmpassword = req.body.confirmpassword

    // Check for required fields
    if(name == null || email == null || password == null || confirmpassword == null) {
        return res.status(400).json({ error: "Por favor, preencha todos os campos." });
    }

    // Check if passwords are equal
    if(password != confirmpassword) {
        return res.status(400).json({ error: "As senhas precisam ser iguais." });
    }

    // Check if useer exists
    const emailExists = await User.findOne({ email: email });

    if (emailExists) {
        return res.status(400).json({ error: "Já existe este usuário, por favor faça login para prosseguir." })
    }

    // Create password
    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)

    const user = new User({
        name: name,
        email: email,
        password: passwordHash
    })

    try {

        const newUser = await user.save(); // Saving the user in DATABASE

        // Create token
        const token = jwt.sign(
            // payload
            {
                name: newUser.name,
                id: newUser._id,
            },
            "secret"
        )

        res.json({ error: null, msg: "Você realizou o cadastro com sucesso", token: token, userId: newUser._id })

    } catch (error) {
        res.status(400).json({ error: error })
    }
})

// Loging the user
router.post('/login', async (req, res) => {

    const email = req.body.email
    const password = req.body.password

    // Check if user exists
    const user = await User.findOne({ email: email })

    if(!user) {
        return res.status(400).json({  error: 'Usuário não existe. Faça registro para continuar.' })
    }

    // Check if password is correct
    const checkPassword = await bcrypt.compare(password, user.password)

    if(!checkPassword) {
        return res.status(400).json({ error: "Senha inválida." })
    }

    // Create token
    const token = jwt.sign(
        // payload
        {
            name: user.name,
            id: user._id,
        },
        "secret"
    )

    res.json({ error: null, msg: "Você realizou login.", token: token, userId: user._id })

})


module.exports = router;