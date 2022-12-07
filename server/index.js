const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
const path = require('path')

const app = express()
dotenv.config()

//Constants
const PORT = process.env.PORT
const DB_URL = process.env.DB_URL
const DB_NAME = process.env.DB_NAME
const DB_CLOUD = process.env.DB_CLOUD

// Middlewares
app.use(cors())
app.use(express.json())

// Routes
app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/categories', require('./routes/categories.routes'))
app.use('/api/sub', require('./routes/sub.routes'))
app.use('/api/items', require('./routes/items.routes'))

if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'client')))
    const indexPath = path.join(__dirname, 'client', 'index.html')
    app.get('*', (req, res) => {
        res.sendFile(indexPath)
    })
}

async function start() {
    try {
        await mongoose.connect(`${DB_CLOUD}`)
        app.listen(PORT, () => console.log(`Server has been started on ${PORT} port...`))
    } catch (error) {
        console.log(error)
    }
}

start()
