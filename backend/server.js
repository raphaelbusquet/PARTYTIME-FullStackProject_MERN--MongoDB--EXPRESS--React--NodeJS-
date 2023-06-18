// Modules
const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const cors = require("cors")

// Routes
const authRoute = require('./routes/authRoutes.js')
const userRoute = require('./routes/userRoutes.js')
const partyRoute = require('./routes/partyRoutes.js')

// Middewares

// Config
const dbName = "partytime";
const port = 3000;

const app = express()

app.use(cors()); // Caso esteja consumindo a API através de uma aplicação rodando em seu navegador, você poderá ter problemas com CORS. Para resolver isto localmente utilizamos este comando. 
app.use(express.json());
app.use(express.static('public'));

app.use('/api/auth', authRoute)
app.use('/api/user', userRoute)
app.use('/api/party', partyRoute)

mongoose.connect(`mongodb://127.0.0.1:27017/${dbName}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection

db.on('error', err => console.error(err))
db.on('open', () => {
    console.log("We are connected to the DATABASE.")
})

app.get('/', (req, res) => {
    res.json({ message: "Rota Teste!" })
})

app.listen(port, () => {
    console.log("Project running...")
})