const express = require("express")
const db = require('./db/db')
const api = require('./routes/userRoute')
const app = express()
require('dotenv').config()

//connecting to database
db()
const PORT = process.env.PORT

// it will convert  string to json 
app.use(express.urlencoded({extended : false}))

// using the api or route
app.use('/api/v1',api)


//server is creating
app.listen(PORT , ()=>{
    console.log(`server is created successfully on this port ${PORT} in the ${process.env.NODE_ENV} mode`)
})
