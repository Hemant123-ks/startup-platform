const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const auth = require("./routes/authroutes.js")

dotenv.config()

const app = express()
app.use(express.json())
app.use("/api/auth/register", auth);



const PORT = process.env.PORT || 3000

app.get('/', (req, res) => {
    res.send('Startup Platform API is running')
})

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB connected')
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`)
        })
    })
    .catch((err) => {
        console.log('MongoDB connection error:', err)
    })