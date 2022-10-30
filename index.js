const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')

const app = express()
dotenv.config()

//Constants
const PORT = process.env.PORT
const DB_NAME = process.env.DB_NAME

// Middlewares
app.use(cors())
app.use(express.json())

// Routes
app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/categories', require('./routes/categories.routes'))
app.use('/api/sub', require('./routes/sub.routes'))
// app.use('/api/items', require('./routes/items'))

async function start() {
    try {
        await mongoose.connect(`mongodb://localhost:27017/${DB_NAME}`)
        app.listen(PORT, () => console.log(`Server has been started on ${PORT} port...`))
    } catch (error) {
        console.log(error)
    }
}

start()
