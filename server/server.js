const express = require('express')
const mongoose = require("mongoose")
const morgan = require("morgan")
const bodyParser = require("body-parser")
const cors = require("cors")
require("dotenv").config()
const {readdirSync} = require("fs")
const authRoutes = require('./routes/auth')

const app = express()
mongoose.connect(process.env.DATABASE)
.then(() => {
    console.log("DB connected");
})
.catch((error) => {
    console.log(error);
})

app.use(morgan("dev"))
app.use(bodyParser.json({limit: "2mb"}))
app.use(cors())

// app.use('/api', authRoutes)
readdirSync("./routes").map((r) => app.use("/api", require("./routes/" + r)))

const port = process.env.PORT || 8000
app.listen(port, () => console.log(`Server is running on port ${port}`))
