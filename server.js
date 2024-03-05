const express = require("express")
const errorHandler = require("./middleware/errorHandler.js")
const connectDb = require("./config/dbConnection.js")
const dotenv = require("dotenv").config()

connectDb()
const app = express()

const port = process.env.PORT || 5000

app.use(express.json()) // middleware to parse the input from the client to server
app.use("/api/contacts", require("./routes/contactRoutes.js")) // middleware
app.use("/api/users", require("./routes/userRoutes.js")) // middleware
app.use(errorHandler)

app.listen(port, ()=>{
    console.log(`Server listening on the port ${port}`)
})
